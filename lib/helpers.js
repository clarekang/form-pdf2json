"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.comment = void 0;
var chalk_1 = __importDefault(require("chalk"));
var isDebug = process.env.NODE_ENV === "debug";
/* tslint:disable:no-console */
exports.comment = function (text) {
    return isDebug ? console.log(text) : undefined;
};
exports.error = function (text) {
    return isDebug ? console.log(chalk_1.default.red(text)) : undefined;
};
/* tslint:enable:no-console */
