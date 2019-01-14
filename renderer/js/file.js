var fs = require('fs');
var util = require('./util');
const { dialog, ipcMain } = require('electron');
const file = {
	new: (mainWindow) => {
		// 未保存
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
					mainWindow.webContents.send('new', "");
					ipcMain.on('new-back', (event, msg) => {
						ipcMain.removeAllListeners('new-back');
						global.config.fileName = null;
						util.saveConfig('default', global.config);
						mainWindow.setTitle('Markdown Editor - New File');
					});
				}
			});
		} else {
			mainWindow.webContents.send('new', "");
			ipcMain.on('new-back', (event, msg) => {
				ipcMain.removeAllListeners('new-back');
				global.config.fileName = null;
				util.saveConfig('default', global.config);
				mainWindow.setTitle('Markdown Editor - New File');
			});
		}
	},
	open: (mainWindow) => {
		// 未保存
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
					dialog.showOpenDialog({
						title: "Open File",
						properties: ['openFile'],
						filters: [{
							name: 'Markdown',
							extensions: ['md']
						}]
					}, (fileName) => {
						if (fileName) {
							let savePath = fileName[0];
							mainWindow.webContents.send('open', util.readFile(savePath));
							ipcMain.on('open-back', (event, msg) => {
								ipcMain.removeAllListeners('open-back');
								global.config.fileName = savePath;
								util.saveConfig('default', global.config);
								mainWindow.setTitle('Markdown Editor - ' + savePath);
							});
						}
					});
				}
			});
		} else {
			dialog.showOpenDialog({
				title: "Open File",
				properties: ['openFile'],
				filters: [{
					name: 'Markdown',
					extensions: ['md']
				}]
			}, (fileName) => {
				if (fileName) {
					let savePath = fileName[0];
					mainWindow.webContents.send('open', util.readFile(savePath));
					ipcMain.on('open-back', (event, msg) => {
						ipcMain.removeAllListeners('open-back');
						global.config.fileName = savePath;
						util.saveConfig('default', global.config);
						mainWindow.setTitle('Markdown Editor - ' + savePath);
					});
				}
			});
		}
	},
	save: (mainWindow) => {
		if (global.config.fileName) {
			mainWindow.webContents.send('save', "");
			ipcMain.on('save-back', (event, msg) => {
				ipcMain.removeAllListeners('save-back');
				if (!msg) {
					return;
				}
				fs.writeFile(global.config.fileName, msg, function (err) {
					if (err) {
						console.error(err);
					}
					global.notSave = false;
					mainWindow.setTitle('Markdown Editor - ' + global.config.fileName);
				})
			})
		} else {
			file.saveAs(mainWindow);
		}
	},
	saveAs: (mainWindow) => {
		mainWindow.webContents.send('save-as', "");
		ipcMain.on('save-as-back', (event, msg) => {
			ipcMain.removeAllListeners('save-as-back');
			if (!msg) {
				return;
			}
			dialog.showSaveDialog({
				filters: [{
					name: 'Markdown',
					extensions: ['md']
				}]
			}, (savedPath) => {
				if(savedPath){
					fs.writeFile(savedPath, msg, function (err) {
						if (err) {
							console.error(err);
						}
						global.config.fileName = savedPath;
						util.saveConfig('default', global.config);
						global.notSave = false;
						mainWindow.setTitle('Markdown Editor - ' + savedPath);
					})
				}
			});
		})
	},
	importMSWord: (mainWindow) => {
		// 未保存
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
					dialog.showOpenDialog({
						title: 'Import MS Word',
						properties: ['openFile'],
						filters: [{
							name: 'Word',
							extensions: ['docx']
						}]
					}, (fileName) => {
						if (fileName) {
							let savePath = fileName[0];
							var mammoth = require("mammoth");
							mammoth.convertToMarkdown({ path: savePath })
								.then(function (result) {
									var md = result.value; // The generated HTML
									var messages = result.messages; // Any messages, such as warnings during conversion
									mainWindow.webContents.send('importMSWord', md);
									ipcMain.on('importMSWord-back', (event, msg) => {
										ipcMain.removeAllListeners('importMSWord-back');
										global.config.fileName = null;
										util.saveConfig('default', global.config);
										mainWindow.setTitle('Markdown Editor - *New File');
									});
								}).done();
						}
					});
				}
			});
		} else {
			dialog.showOpenDialog({
				title: 'Import MS Word',
				properties: ['openFile'],
				filters: [{
					name: 'Word',
					extensions: ['docx']
				}]
			}, (fileName) => {
				if (fileName) {
					let savePath = fileName[0];
					var mammoth = require("mammoth");
					mammoth.convertToMarkdown({ path: savePath })
						.then(function (result) {
							var md = result.value; // The generated HTML
							var messages = result.messages; // Any messages, such as warnings during conversion
							mainWindow.webContents.send('importMSWord', md);
							ipcMain.on('importMSWord-back', (event, msg) => {
								ipcMain.removeAllListeners('importMSWord-back');
								global.config.fileName = null;
								util.saveConfig('default', global.config);
								mainWindow.setTitle('Markdown Editor - *New File');
							});
						}).done();
				}
			});
		}
	},
	exportPdf: (mainWindow) => {
		mainWindow.webContents.send('export-pdf', "");
		ipcMain.on('export-pdf-back', (event, msg) => {
			ipcMain.removeAllListeners('export-pdf-back');
			if (!msg) {
				return;
			}
			dialog.showSaveDialog({
				title: 'Export PDF',
				filters: [{
					name: 'PDF',
					extensions: ['pdf']
				}]
			},(savedPath)=>{
				if (savedPath) {
					let localHtml= process.env['APPDATA'] + '/Editor.md/temp/local.html';
					fs.writeFile(localHtml, util.genHtml(msg), function (err) {
						if (err) {
							console.error(err);
							return;
						}
						let wkhtmltox = require("./wkhtmltox");
						wkhtmltox.wkhtmltopdf = global.wkhtmltopdf;
						wkhtmltox.pdf(localHtml,savedPath,{
							"page-size":"A4"
						}).on('end',() => {
							dialog.showMessageBox({
								type: 'info',
								title: 'Export Successfully!',
								message: 'Exported to ' + savedPath
							})
						});
					})
				}
			});
			
		})
	}
}
module.exports = file;