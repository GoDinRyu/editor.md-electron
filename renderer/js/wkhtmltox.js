'use strict'

let os = require('os');
let childprocess = require('child_process');
const wkhtmltox = {
	wkhtmltopdf: 'wkhtmltopdf',
	wkhtml:(from,to,args) => {
		if(!from){
			console.error("the html url/from is null");
			return;
		}

		if(typeof(to) == "object"){
			args = to;
			to = os.tmpdir()+"/"+Date.now()+".pdf";
		}

		let options = [];
		for(var i in args){
			options.push("--"+i);
			options.push(args[i]);
		}
		options.push(from);
		options.push(to);

		let process = childprocess.spawn(wkhtmltox.wkhtmltopdf,options);

        return process.stdout;
	},
	pdf:(from,to,options) => {
		return wkhtmltox.wkhtml(from,to,options);
	}
};

module.exports = wkhtmltox;