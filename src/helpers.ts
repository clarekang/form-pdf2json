import chalk from "chalk";

const isDebug = process.env.NODE_ENV === "debug";

export const comment = (text: string) =>
  isDebug ? console.log(text) : undefined;

export const error = (text: unknown) =>
  isDebug ? console.log(chalk.red(text as string)) : undefined;
