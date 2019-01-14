// Modules to control application life and create native browser window
//main.js
const fs = require("fs")
const tool = require('./renderer/js/tool');
global.notSave = true;
global.wkhtmltopdf = __dirname + '/renderer/lib/bin/wkhtmltopdf';
const util = require('./renderer/js/util');
global.basePath = util.mkDefaultDir();
global.config = util.readConfig('default');
const port = 42495; // util.randNum(32000, 55000);
global.baseUrl = 'http://127.0.0.1:' + port;

const server = require('node-http-server');
server.deploy({
	port: port,
	root: __dirname + "/renderer",
	contentType: {
		html: 'text/html',
		css: 'text/css',
		js: 'text/javascript',
		json: 'application/json',
		txt: 'text/plain',
		jpeg: 'image/jpeg',
		jpg: 'image/jpeg',
		png: 'image/png',
		gif: 'image/gif',
		ico: 'image/x-icon',
		appcache: 'text/cache-manifest',
		woff2: "text/plain",
		md: "text/plain",
		woff: "text/plain",
		ttf: "text/plain"
	},
}, serverReady);

function serverReady(server) {
	// console.log( `Server on port ${server.config.port} is now up`);

	const {
		app,
		BrowserWindow,
		Menu,
		ipcMain,
		dialog
	} = require('electron')

	// Keep a global reference of the window object, if you don't, the window will
	// be closed automatically when the JavaScript object is garbage collected.
	let mainWindow

	ipcMain.on('editor-init', (event, arg) => {
		const content = util.readFile(global.config.fileName);
		const local = util.readLocal();
		if (global.config.fileName) {
			if (local === content) {
				event.returnValue = local;
			} else {
				dialog.showMessageBox({
					type: 'question',
					title: 'Reload Info',
					buttons: ["Yes", "No"],
					message: 'This File Is Modified By Another Program\nSure To Reload? '
				}, (response) => {
					// YES
					if (response === 0) {
						event.returnValue = content;
					} else {
						event.returnValue = local;
					}
				});
			}
		} else {
			event.returnValue = local;
		}
	});

	ipcMain.on('save-local-md', (event, arg) => {
		util.saveLocal(arg);
		if (global.config.fileName) {
			let content = util.readFile(global.config.fileName);
			if (arg === content) {
				global.notSave = false;
				mainWindow.setTitle('Markdown Editor - ' + global.config.fileName);
			} else {
				global.notSave = true;
				mainWindow.setTitle('Markdown Editor - *' + global.config.fileName);
			}
		} else {
			global.notSave = true;
			mainWindow.setTitle('Markdown Editor - *New File');
		}
	});

	ipcMain.on('drag-open', (event, arg) => {
		tool.drapOpen(mainWindow,arg);
	});

	function createWindow() {
		// Create the browser window.
		mainWindow = new BrowserWindow({
			title: 'Markdown Editor',
			width: 1366,
			height: 768,
			webPreferences: {
				nodeIntegration: true
			}
		})

		const menuInfo = require('./renderer/js/menu');
		menuInfo.init(mainWindow);
		const menu = Menu.buildFromTemplate(menuInfo.template)
		Menu.setApplicationMenu(menu)

		// and load the index.html of the app.
		// mainWindow.loadFile('index.html')
		mainWindow.loadURL(global.baseUrl)
		mainWindow.webContents.on('did-finish-load', () => {
			mainWindow.webContents.send('change-theme', global.config)
		})
		// Open the DevTools.
		// mainWindow.webContents.openDevTools()

		// Emitted when the window is closed.
		mainWindow.on('closed', function () {
			// Dereference the window object, usually you would store windows
			// in an array if your app supports multi windows, this is the time
			// when you should delete the corresponding element.
			mainWindow = null
		})
	}

	// This method will be called when Electron has finished
	// initialization and is ready to create browser windows.
	// Some APIs can only be used after this event occurs.
	app.on('ready', createWindow)

	// Quit when all windows are closed.
	app.on('window-all-closed', function () {
		// On macOS it is common for applications and their menu bar
		// to stay active until the user quits explicitly with Cmd + Q
		if (process.platform !== 'darwin') {
			app.quit()
		}
	})

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (mainWindow === null) {
			createWindow()
		}
	})

	// In this file you can include the rest of your app's specific main process
	// code. You can also put them in separate files and require them here.
}
