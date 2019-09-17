import chalk from "chalk";

const isDebug = process.env.NODE_ENV === "debug";

/* tslint:disable:no-console */
export const comment = (text: string) =>
  isDebug ? console.log(text) : undefined;

export const error = (text: string) =>
  isDebug ? console.log(chalk.red(text)) : undefined;
/* tslint:enable:no-console */
