
var fs = require('fs');
var util = require('./util');
var file = require('./file');
const { dialog, ipcMain } = require('electron');
const tool = {
	msWordToMarkdown: (mainWindow) => {
		dialog.showOpenDialog({
			title: 'MSWord to Markdown',
			properties: ['openFile', 'multiSelections'],
			filters: [{
				name: 'Word',
				extensions: ['docx', 'doc']
			}]
		}, (fileNames) => {
			if (fileNames) {
				for (let fromPath of fileNames) {
					let savePath = fromPath.replace(/\.{1}[a-z]{1,}$/, '.md');
					var mammoth = require("mammoth");
					mammoth.convertToMarkdown({ path: fromPath })
						.then(function (result) {
							var md = result.value; // The generated HTML
							var messages = result.messages; // Any messages, such as warnings during conversion
							console.log(messages);
							fs.writeFileSync(savePath, md);
						}).done();
				}
			}
		});
	},
	// markdownToPDF: (mainWindow) => {
	// 	var markdownpdf = require("markdown-pdf");
	// 	dialog.showOpenDialog({
	// 		title: 'Markdown To PDF',
	// 		properties: ['openFile', 'multiSelections'],
	// 		filters: [{
	// 			name: 'Markdown',
	// 			extensions: ['md']
	// 		}]
	// 	}, (mdFiles) => {
	// 		if (mdFiles) {
	// 			pdfFiles = mdFiles.map(function (d) { return d.replace(/\.{1}[a-z]{1,}$/, ".pdf") });
	// 			markdownpdf().from(mdFiles).to(pdfFiles, function () {
	// 				pdfFiles.forEach(function (d) { console.log("Created", d) })
	// 			})
	// 		}
	// 	});
	// },
	drapOpen: (mainWindow, path) => {
		if (tool.getType(path) !== '.md') {
			dialog.showMessageBox({
				type: 'warning',
				title: 'File Type "' + tool.getType(path) + '" Is Not Supported!',
				message: 'Only *.md Type Is Supportd!'
			})
			return;
		}
		if (global.notSave) {
			dialog.showMessageBox({
				type: 'question',
				title: 'NotSave Info',
				buttons: ["Yes", "No"],
				message: 'This File Is Not Saved \nSure To Save? '
			}, (response) => {
				// YES
				if (response === 0) {
					file.save(mainWindow);
				} else {
					mainWindow.webContents.send('open', util.readFile(path));
					ipcMain.on('open-back', (event, msg) => {
						ipcMain.removeAllListeners('open-back');
						global.config.fileName = path;
						util.saveConfig('default', global.config);
						mainWindow.setTitle('Markdown Editor - ' + path);
					});
				}
			});
		} else {
			mainWindow.webContents.send('open', util.readFile(path));
			ipcMain.on('open-back', (event, msg) => {
				ipcMain.removeAllListeners('open-back');
				global.config.fileName = path;
				util.saveConfig('default', global.config);
				mainWindow.setTitle('Markdown Editor - ' + path);
			});
		}
	},
	getType: (fileName) => {
		return fileName.toLowerCase().substring(fileName.lastIndexOf("."), fileName.length);
	}
}
module.exports = tool;