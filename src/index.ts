import { readdirSync, writeFile, unlink } from "fs";
import { map, zipObject } from "lodash";
import { camelCase } from "change-case";
import { comment, error } from "./helpers";

const execFileSync = require("child_process").execFileSync;
const fdf = require("utf8-fdf-generator");

interface Field {
  [key: string]: string;
}

export default class Pdf2Json {
  private sourcePath: string;
  private outputPath: string;

  constructor() {
    this.sourcePath = process.env.SOURCE_PATH || "files/";
    this.outputPath = process.env.OUTPUT_PATH || "output/";

    const files = this.getFiles();
    files.forEach(async fileName => {
      this.exportPdf2Json(fileName);
      this.exportJson2Pdf(fileName);
    });
  }

  public async exportPdf2Json(fileName: string) {
    const [formName] = fileName.split(".");
    const outputFilePath = `${this.outputPath}${formName}.json`;
    const data = await this.convertPdf2Json(fileName);
    this.exportFile(outputFilePath, data);
  }

  public async convertPdf2Json(fileName: string): Promise<Field[]> {
    const sourceFile = `${this.sourcePath}${fileName}`;
    const regStateOption = /FieldStateOption: ((?!Off)[A-Za-z\t .]+)/;
    const fieldArray: Field[] = [];
    const defaultFields = ["fieldName", "fieldType", "fieldFlags"];

    try {
      const stdout = execFileSync("pdftk", [
        sourceFile,
        "dump_data_fields_utf8",
      ]);

      const fields = stdout
        .toString()
        .split("---")
        .slice(1);

      fields.forEach((field: string) => {
        const currentField: Field = {};
        field.split("\n").forEach(fieldOption => {
          if (!fieldOption) return;
          const [name, value] = fieldOption.split(": ");
          if (defaultFields.indexOf(camelCase(name)) === -1 || !value) return;
          currentField[camelCase(name)] = value;
        });

        if (!!currentField.fieldType && currentField.fieldType === "Button") {
          currentField.fieldStateOption = !!field.match(regStateOption)
            ? field.match(regStateOption)![1]
            : "";
        }

        currentField.fieldValue = "";

        fieldArray.push(currentField);
      });
      return fieldArray;
    } catch (e) {
      throw error(e);
    }
  }

  public async exportPdf2Fdf(fileName: string) {
    // todo
  }

  public async convertJson2Fdf(fileName: string) {
    const data = await this.convertPdf2Json(fileName);
    const keys = map(data, "fieldName");
    const values = map(data, "fieldValue");

    const parsed = values.map((val: any) => {
      if (val === true) {
        return "Yes";
      } else if (val === false) {
        return "Off";
      }
      return val;
    });
    return zipObject(keys, parsed);
  }

  public async exportJson2Pdf(fileName: string) {
    try {
      const sourceFile = `${this.sourcePath}${fileName}`;
      const outputFilePath = `${this.outputPath}${fileName}`;
      const fdfData = await this.convertJson2Fdf(fileName);

      const randomSequence = Math.random()
        .toString(36)
        .substring(7);
      const currentTime = new Date().getTime();
      const tempFDFFile = `temp_data${currentTime}${randomSequence}.fdf`;

      fdf.generator(fdfData, tempFDFFile);

      await execFileSync("pdftk", [
        sourceFile,
        "fill_form",
        tempFDFFile,
        "output",
        outputFilePath,
      ]);

      //Delete the temporary fdf file.
      unlink(tempFDFFile, (err: Error | null) => {
        if (err) {
          return error(err.message);
        }
      });
    } catch (e) {
      throw error(e);
    }
  }

  private exportFile(path: string, data: any): void {
    const jsonData = typeof data === "string" ? JSON.parse(data) : data;
    const result = JSON.stringify(jsonData, null, "\t");
    writeFile(path, result, "utf8", (err: Error | null) => {
      if (err) {
        return error("An error occured while writing JSON Object to File.");
      }
      comment(`File export: ${path}`);
    });
  }

  private getFiles(): string[] {
    comment("Get list of decrypt Pdf form files");
    return readdirSync(this.sourcePath);
  }
}

const a = new Pdf2Json();
