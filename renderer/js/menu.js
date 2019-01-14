let mainWindow;
const file = require('./file');
const tool = require('./tool');
const util = require('./util');
const menu = {
	init: (win) => {
		mainWindow = win;
	},
	template: [
		{
			label: 'File',
			submenu: [{
				label: 'New',
				accelerator: 'CmdOrCtrl+N',
				click: () => {
					file.new(mainWindow);
				}
			},
			{
				label: 'Open',
				accelerator: 'CmdOrCtrl+O',
				click: () => {
					file.open(mainWindow);
				}
			},
			{
				label: 'Import MSWord...',
				accelerator: 'CmdOrCtrl+Alt+I',
				click: () => {
					file.importMSWord(mainWindow);
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Save',
				accelerator: 'CmdOrCtrl+S',
				click: () => {
					file.save(mainWindow);
				}
			},
			{
				label: 'Save As...',
				accelerator: 'CmdOrCtrl+Alt+S',
				click: () => {
					file.saveAs(mainWindow);
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Export PDF...',
				accelerator: 'CmdOrCtrl+Alt+P',
				click: () => {
					file.exportPdf(mainWindow);
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Exit',
				click: () => {
					mainWindow.close();
				}
			}
			]
		},
		{
			label: 'Edit',
			submenu: [
				// {
				// 	role: 'undo'
				// },
				// {
				// 	role: 'redo'
				// },
				// {
				// 	type: 'separator'
				// },
				{
					role: 'cut'
				},
				{
					role: 'copy'
				},
				{
					role: 'paste'
				},
				// {
				// 	role: 'pasteandmatchstyle'
				// },
				{
					role: 'delete'
				},
				// {
				// 	role: 'selectall'
				// }
			]
		},
		{
			label: 'View',
			submenu: [
			{
				role: 'reload'
			},
			{
				type: 'separator'
			},
			{
				label: 'Theme',
				submenu: [{
					label: 'Tool Bar',
					submenu: [{
						label: 'Light',
						type: 'radio',
						checked: global.config.theme === "default",
						click() {
							global.config.theme = "default";
							util.saveConfig('default', global.config);
							let theme = {
								theme: 'default'
							};
							mainWindow.webContents.send('change-theme', theme)
						}
					},
					{
						label: 'Dark',
						type: 'radio',
						checked: global.config.theme === "dark",
						click() {
							global.config.theme = "dark";
							util.saveConfig('default', global.config);
							let theme = {
								theme: 'dark'
							};
							mainWindow.webContents.send('change-theme', theme)
						}
					}
					]
				},
				{
					label: 'Editor',
					submenu: [{
						label: 'Light',
						submenu: [{
							label: 'Default',
							type: 'radio',
							checked: global.config.editorTheme === "default",
							click() {
								global.config.editorTheme = "default";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'default'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: '3024-day',
							type: 'radio',
							checked: global.config.editorTheme === "3024-day",
							click() {
								global.config.editorTheme = "3024-day";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: '3024-day'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Ambiance',
							type: 'radio',
							checked: global.config.editorTheme === "ambiance-mobile",
							click() {
								global.config.editorTheme = "ambiance-mobile";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'ambiance-mobile'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Base16',
							type: 'radio',
							checked: global.config.editorTheme === "base16-light",
							click() {
								global.config.editorTheme = "base16-light";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'base16-light'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Eclipse',
							type: 'radio',
							checked: global.config.editorTheme === "eclipse",
							click() {
								global.config.editorTheme = "eclipse";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'eclipse'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Elegant',
							type: 'radio',
							checked: global.config.editorTheme === "elegant",
							click() {
								global.config.editorTheme = "elegant";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'elegant'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'MDN',
							type: 'radio',
							checked: global.config.editorTheme === "mdn-like",
							click() {
								global.config.editorTheme = "mdn-like";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'mdn-like'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Neat',
							type: 'radio',
							checked: global.config.editorTheme === "neat",
							click() {
								global.config.editorTheme = "neat";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'neat'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Neo',
							type: 'radio',
							checked: global.config.editorTheme === "neo",
							click() {
								global.config.editorTheme = "neo";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'neo'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Paraiso',
							type: 'radio',
							checked: global.config.editorTheme === "paraiso-light",
							click() {
								global.config.editorTheme = "paraiso-light";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'paraiso-light'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Solarized',
							type: 'radio',
							checked: global.config.editorTheme === "solarized",
							click() {
								global.config.editorTheme = "solarized";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'solarized'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'XQ',
							type: 'radio',
							checked: global.config.editorTheme === "xq-light",
							click() {
								global.config.editorTheme = "xq-light";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'xq-light'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						}
						]
					},
					{
						label: 'Dark',
						submenu: [{
							label: '3024-night',
							type: 'radio',
							checked: global.config.editorTheme === "3024-night",
							click() {
								global.config.editorTheme = "3024-night";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: '3024-night'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Ambiance',
							type: 'radio',
							checked: global.config.editorTheme === "ambiance",
							click() {
								global.config.editorTheme = "ambiance";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'ambiance'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Base16',
							type: 'radio',
							checked: global.config.editorTheme === "base16-dark",
							click() {
								global.config.editorTheme = "base16-dark";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'base16-dark'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Blackboard',
							type: 'radio',
							checked: global.config.editorTheme === "blackboard",
							click() {
								global.config.editorTheme = "blackboard";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'blackboard'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Cobalt',
							type: 'radio',
							checked: global.config.editorTheme === "cobalt",
							click() {
								global.config.editorTheme = "cobalt";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'cobalt'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Erlang',
							type: 'radio',
							checked: global.config.editorTheme === "erlang-dark",
							click() {
								global.config.editorTheme = "erlang-dark";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'erlang-dark'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Lesser',
							type: 'radio',
							checked: global.config.editorTheme === "lesser-dark",
							click() {
								global.config.editorTheme = "lesser-dark";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'lesser-dark'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'MBO',
							type: 'radio',
							checked: global.config.editorTheme === "mbo",
							click() {
								global.config.editorTheme = "mbo";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'mbo'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Midnight',
							type: 'radio',
							checked: global.config.editorTheme === "midnight",
							click() {
								global.config.editorTheme = "midnight";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'midnight'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Monokai',
							type: 'radio',
							checked: global.config.editorTheme === "monokai",
							click() {
								global.config.editorTheme = "monokai";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'monokai'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Night',
							type: 'radio',
							checked: global.config.editorTheme === "night",
							click() {
								global.config.editorTheme = "night";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'night'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Paraiso',
							type: 'radio',
							checked: global.config.editorTheme === "paraiso-dark",
							click() {
								global.config.editorTheme = "paraiso-dark";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'paraiso-dark'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Pastel',
							type: 'radio',
							checked: global.config.editorTheme === "pastel-on-dark",
							click() {
								global.config.editorTheme = "pastel-on-dark";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'pastel-on-dark'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Rubyblue',
							type: 'radio',
							checked: global.config.editorTheme === "rubyblue",
							click() {
								global.config.editorTheme = "rubyblue";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'rubyblue'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Matrix',
							type: 'radio',
							checked: global.config.editorTheme === "the-matrix",
							click() {
								global.config.editorTheme = "the-matrix";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'the-matrix'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Eighties',
							type: 'radio',
							checked: global.config.editorTheme === "tomorrow-night-eighties",
							click() {
								global.config.editorTheme = "tomorrow-night-eighties";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'tomorrow-night-eighties'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Twilight',
							type: 'radio',
							checked: global.config.editorTheme === "twilight",
							click() {
								global.config.editorTheme = "twilight";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'twilight'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'Vibrant Ink',
							type: 'radio',
							checked: global.config.editorTheme === "vibrant-ink",
							click() {
								global.config.editorTheme = "vibrant-ink";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'vibrant-ink'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						},
						{
							label: 'XQ',
							type: 'radio',
							checked: global.config.editorTheme === "xq-dark",
							click() {
								global.config.editorTheme = "xq-dark";
								util.saveConfig('default', global.config);
								let theme = {
									editorTheme: 'xq-dark'
								};
								mainWindow.webContents.send('change-theme', theme)
							}
						}
						]
					}

					]
				},
				{
					label: 'Preview',
					submenu: [{
						label: 'Light',
						type: 'radio',
						checked: global.config.previewTheme === "default",
						click() {
							global.config.previewTheme = "default";
							util.saveConfig('default', global.config);
							let theme = {
								previewTheme: 'default'
							};
							mainWindow.webContents.send('change-theme', theme)
						}
					},
					{
						label: 'Dark',
						type: 'radio',
						checked: global.config.previewTheme === "dark",
						click() {
							global.config.previewTheme = "dark";
							util.saveConfig('default', global.config);
							let theme = {
								previewTheme: 'dark'
							};
							mainWindow.webContents.send('change-theme', theme)
						}
					}
					]
				},
				]
			},
			{
				label: 'Toggle Tool Bar',
				click() {
					mainWindow.webContents.send('toggle-tool-bar', '')
				}
			},
			// {
			// 	role: 'forcereload'
			// },
			// {
			// 	role: 'toggledevtools'
			// },
			{
				type: 'separator'
			},
			// {
			// 	role: 'resetzoom'
			// },
			// {
			// 	role: 'zoomin'
			// },
			// {
			// 	role: 'zoomout'
			// },
			// {
			// 	type: 'separator'
			// },
			{
				role: 'togglefullscreen'
			}
			]
		},
		{
			role: 'window',
			submenu: [
				{
					role: 'minimize'
				},
				{
					role: 'close'
				}
			]
		},
		{
			label: 'Tool',
			submenu: [
				{
					label: 'MSWord To Markdown',
					click: () => {
						tool.msWordToMarkdown(mainWindow);
					}
				}
				// {
				// 	label: 'Markdown To PDF',
				// 	click: () => {
				// 		tool.markdownToPDF(mainWindow);
				// 	}
				// }
			]
		},
		{
			role: 'help',
			submenu: [{
				label: 'About',
				click() {
					const { dialog } = require('electron');
					dialog.showMessageBox({
						type:'info',
						title:'About us',
						message: 'Editor.md-electron v1.0.0 \nCreated By yzliu \nEmail: yzliu@wisedu.com'
					});
				 }
			}]
		}
	]
}

module.exports = menu;
