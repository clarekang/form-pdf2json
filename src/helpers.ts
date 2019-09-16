const chalk = require("chalk");

const isDebug = process.env.NODE_ENV === "debug";

export const comment = (text: string) =>
  isDebug ? console.log(text) : undefined;

export const error = (text: string) =>
  isDebug ? console.log(chalk.red(text)) : undefined;
