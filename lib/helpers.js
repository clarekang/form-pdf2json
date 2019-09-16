"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var isDebug = process.env.NODE_ENV === "debug";
exports.comment = function (text) {
    return isDebug ? console.log(text) : undefined;
};
exports.error = function (text) {
    return isDebug ? console.log(chalk.red(text)) : undefined;
};
