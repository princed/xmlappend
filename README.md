# xmlappend [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Merge xml files with the root node

## Installation

```sh
$ npm install --save xmlappend
```

## Usage

```
$ xmlappend --help

Merge xml files with the root node

 Reads xml from stdin and appends it to target file if root node is the same.
 Will fail otherwise.

Usage
  $ xmlappend <target-file>

Examples
  $ eslint --format jslint-xml | xmlappend final-report.xml
  $ stylelint --custom-formatter './jslint-xml.js' '**/*.css' | xmlappend final-report.xml
```
## License

Apache-2.0 © [Eugene Datsky](https://twitter.com/prncd)


[npm-image]: https://badge.fury.io/js/xmlappend.svg
[npm-url]: https://npmjs.org/package/xmlappend
[travis-image]: https://travis-ci.org/princed/xmlappend.svg?branch=master
[travis-url]: https://travis-ci.org/princed/xmlappend
[daviddm-image]: https://david-dm.org/princed/xmlappend.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/princed/xmlappend
