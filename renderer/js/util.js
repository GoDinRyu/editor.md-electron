var fs = require("fs");
const util = {
	randNum:(n,m) => {
		return Math.floor(Math.random()*(m-n+1)+n);
	},
	mkDefaultDir:() => {
		var fs = require('fs');
		// var basePath = process.env['APPDATA'] + '\\Exam Client\\Records\\' + userId +'\\' + examId + '\\'
		var basePath = process.env['APPDATA'] + '/Editor.md/';
		if(!fs.existsSync(basePath)){
			fs.mkdirSync(basePath)
		}
		if(!fs.existsSync(basePath+'/config')){
			fs.mkdirSync(basePath+'/config')
		}
		if(!fs.existsSync(basePath+'/temp')){
			fs.mkdirSync(basePath+'/temp')
		}
		return basePath
	},
	readConfig:(name) => {
		const configPath = global.basePath + "/config/" + name + ".cnf";
		let config = {
			fileName: '',
			theme:'default',
			previewTheme: 'default',
			editorTheme: "default"
		};
		if(!fs.existsSync(configPath)){
			util.saveConfig(name,config);
		}else{
			config = JSON.parse(fs.readFileSync(configPath));
		}
		return config;
	},
	saveConfig:(name,config) => {
		const configPath = global.basePath+"/config/" + name + ".cnf";
		fs.writeFileSync(configPath, JSON.stringify(config));
	},
	readLocal:() => {
		const localPath = global.basePath+"/temp/local.md";
		let content = '';
		if(fs.existsSync(localPath)){
			content = fs.readFileSync(localPath,"utf8");
		}
		return content;
	},
	saveLocal:(content) => {
		fs.writeFileSync(global.basePath+"/temp/local.md", content);
	},
	readFile:(fileName) => {
		let content = '';
		if(fs.existsSync(fileName)){
			content = fs.readFileSync(fileName,"utf8");
		}
		return content;
	},
	genHtml:(content) => {
		let html = '<head>';
		html += '<meta charset="utf-8" />';
		html += '<link rel="stylesheet" href="'+global.baseUrl+'/css/editormd.css" />';
		html += '<link rel="stylesheet" href="'+global.baseUrl+'/css/katex.min.css" />';
		html += '<link rel="shortcut icon" href="" type="image/x-icon" />';
		html += '</head>';
		html += '<div class="markdown-body editormd-preview-container" previewcontainer="true" style="padding: 20px;">';
		html += content;
		html += '</div>';
		return html;
	},

}
module.exports = util;