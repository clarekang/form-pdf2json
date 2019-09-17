# Form PDF2JSON

![NPM](https://img.shields.io/npm/l/form-pdf2json?style=flat)
![GitHub package.json version](https://img.shields.io/github/package-json/v/ClareKang/form-pdf2json?style=flat&logo=github)

NodeJS library to convert JSON to PDF or vice versa (JSON to PDF or PDF to JSON)

Inspired from [pdffiller](https://github.com/pdffillerjs/pdffiller).

- [Requirements](#requirements)
  - [Installation](#installation)
- [Definition](#definition)
- [Usage](#usage)
- [Commands](#commands)
  - [Convert file to data](#convert-to-data)
    - [PDF to JSON](#pdf-to-json)
    - [JSON to FDF](#json-to-fdf)
  - [Export to file](#export-to-file)
    - [PDF to JSON](#pdf-to-json-1)
    - [PDF to FDF](#pdf-to-fdf)
    - [JSON to PDF](#json-to-fdf)

## Requirements

This is dependent on the PDF Toolkit library [PDF ToolKit](http://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/)
So you should install PDF Toolkit first.

### Installation

```bash
// with npm
npm install --save-dev form-pdf2json

// with yarn
yarn add form-pdf2json
```

## Definition

| Name             | Desc                                                                | Misc                              |
| ---------------- | ------------------------------------------------------------------- | --------------------------------- |
| FieldType        | Form Field Type                                                     | One of `Text`, `Choice`, `Button` |
| FieldName        | Form Field Name                                                     | Unique                            |
| FieldStateOption | If `FieldType`is Button, actual value is `FieldStateOption's` value | -                                 |
| FieldValue       | -                                                                   | -                                 |

## Usage

```javascript
var pdf2json = require("form-pdf2json");

// or

import pdf2json from "form-pdf2json";

// => { convertPdf2Json: [Function], convertJson2Fdf: [Function], ... }
```

## Commands

### Convert to data

#### PDF to JSON

`convertPdf2Json`

```javascript
pdf2json.convertPdf2Json("path/to/file");
// returns json data
```

#### JSON to FDF

`convertJson2Fdf`

```javascript
pdf2json.convertJson2Fdf("path/to/file");
// returns fdf data
```

### Export to file

#### PDF to JSON

`exportPdf2Json`

```javascript
pdf2json.exportPdf2Json("path/to/file");
// export json file
```

#### JSON to PDF

`exportJson2Pdf`

```javascript
pdf2json.exportJson2Pdf("path/to/file");
// export json file
```

#### PDF to FDF

`exportPdf2Fdf`

```javascript
pdf2json.exportPdf2Fdf("path/to/file");
// export json file
```

## Contributions

Feel free to contribute by posting issues or pull requests on [form-pdf2json](https://github.com/ClareKang/form-pdf2json)
