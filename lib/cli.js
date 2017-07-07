const path = require('path');

const meow = require('meow');
const getStdin = require('get-stdin');
const fs = require('pify')(require('fs'));
const xmlappend = require('.');

const cli = meow(`
  Reads xml from stdin and appends it to target file if root node is the same.
  Will fail otherwise.
	
	Usage
	  $ xmlappend <target-file>

	Examples
	  $ eslint --format jslint-xml | xmlappend final-report.xml
	  $ stylelint --custom-formatter './jslint-xml.js' '**/*.css' | xmlappend final-report.xml
`);

const targetFilePath = path.resolve(cli.input[0]);
Promise.all([fs.readFile(targetFilePath, 'utf-8'), getStdin()])
  .then(contents => xmlappend(...contents))
  .then(result => fs.writeFile(targetFilePath, result))
  .catch(err => {
    console.error(err.message || err);
    process.exit(1);
  });
