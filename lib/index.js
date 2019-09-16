"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var lodash_1 = require("lodash");
var change_case_1 = require("change-case");
var helpers_1 = require("./helpers");
var execFileSync = require("child_process").execFileSync;
var fdf = require("utf8-fdf-generator");
var Pdf2Json = /** @class */ (function () {
    function Pdf2Json() {
        var _this = this;
        this.sourcePath = process.env.SOURCE_PATH || "files/";
        this.outputPath = process.env.OUTPUT_PATH || "output/";
        var files = this.getFiles();
        files.forEach(function (fileName) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.exportPdf2Json(fileName);
                this.exportJson2Pdf(fileName);
                return [2 /*return*/];
            });
        }); });
    }
    Pdf2Json.prototype.exportPdf2Json = function (fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var formName, outputFilePath, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formName = fileName.split(".")[0];
                        outputFilePath = "" + this.outputPath + formName + ".json";
                        return [4 /*yield*/, this.convertPdf2Json(fileName)];
                    case 1:
                        data = _a.sent();
                        this.exportFile(outputFilePath, data);
                        return [2 /*return*/];
                }
            });
        });
    };
    Pdf2Json.prototype.convertPdf2Json = function (fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var sourceFile, regStateOption, fieldArray, defaultFields, stdout, fields;
            return __generator(this, function (_a) {
                sourceFile = "" + this.sourcePath + fileName;
                regStateOption = /FieldStateOption: ((?!Off)[A-Za-z\t .]+)/;
                fieldArray = [];
                defaultFields = ["fieldName", "fieldType", "fieldFlags"];
                try {
                    stdout = execFileSync("pdftk", [
                        sourceFile,
                        "dump_data_fields_utf8",
                    ]);
                    fields = stdout
                        .toString()
                        .split("---")
                        .slice(1);
                    fields.forEach(function (field) {
                        var currentField = {};
                        field.split("\n").forEach(function (fieldOption) {
                            if (!fieldOption)
                                return;
                            var _a = fieldOption.split(": "), name = _a[0], value = _a[1];
                            if (defaultFields.indexOf(change_case_1.camelCase(name)) === -1 || !value)
                                return;
                            currentField[change_case_1.camelCase(name)] = value;
                        });
                        if (!!currentField.fieldType && currentField.fieldType === "Button") {
                            currentField.fieldStateOption = !!field.match(regStateOption)
                                ? field.match(regStateOption)[1]
                                : "";
                        }
                        currentField.fieldValue = "";
                        fieldArray.push(currentField);
                    });
                    return [2 /*return*/, fieldArray];
                }
                catch (e) {
                    throw helpers_1.error(e);
                }
                return [2 /*return*/];
            });
        });
    };
    Pdf2Json.prototype.exportPdf2Fdf = function (fileName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Pdf2Json.prototype.convertJson2Fdf = function (fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var data, keys, values, parsed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.convertPdf2Json(fileName)];
                    case 1:
                        data = _a.sent();
                        keys = lodash_1.map(data, "fieldName");
                        values = lodash_1.map(data, "fieldValue");
                        parsed = values.map(function (val) {
                            if (val === true) {
                                return "Yes";
                            }
                            else if (val === false) {
                                return "Off";
                            }
                            return val;
                        });
                        return [2 /*return*/, lodash_1.zipObject(keys, parsed)];
                }
            });
        });
    };
    Pdf2Json.prototype.exportJson2Pdf = function (fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var sourceFile, outputFilePath, fdfData, randomSequence, currentTime, tempFDFFile, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sourceFile = "" + this.sourcePath + fileName;
                        outputFilePath = "" + this.outputPath + fileName;
                        return [4 /*yield*/, this.convertJson2Fdf(fileName)];
                    case 1:
                        fdfData = _a.sent();
                        randomSequence = Math.random()
                            .toString(36)
                            .substring(7);
                        currentTime = new Date().getTime();
                        tempFDFFile = "temp_data" + currentTime + randomSequence + ".fdf";
                        fdf.generator(fdfData, tempFDFFile);
                        return [4 /*yield*/, execFileSync("pdftk", [
                                sourceFile,
                                "fill_form",
                                tempFDFFile,
                                "output",
                                outputFilePath,
                            ])];
                    case 2:
                        _a.sent();
                        //Delete the temporary fdf file.
                        fs_1.unlink(tempFDFFile, function (err) {
                            if (err) {
                                return helpers_1.error(err.message);
                            }
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        throw helpers_1.error(e_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Pdf2Json.prototype.exportFile = function (path, data) {
        var jsonData = typeof data === "string" ? JSON.parse(data) : data;
        var result = JSON.stringify(jsonData, null, "\t");
        fs_1.writeFile(path, result, "utf8", function (err) {
            if (err) {
                return helpers_1.error("An error occured while writing JSON Object to File.");
            }
            helpers_1.comment("File export: " + path);
        });
    };
    Pdf2Json.prototype.getFiles = function () {
        helpers_1.comment("Get list of decrypt Pdf form files");
        return fs_1.readdirSync(this.sourcePath);
    };
    return Pdf2Json;
}());
exports.default = Pdf2Json;
var a = new Pdf2Json();
