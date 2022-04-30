import { LogLevel } from "./types";
import { NAME } from "./config";

export const log = (level: LogLevel, message: string) => {
  if (__DEV__) {
    switch (level) {
      case "info":
        console.log(`[${NAME}] ${message}`);
        break;
      case "warn":
        console.warn(`[${NAME}] ${message}`);
        break;
      case "error":
        console.error(`[${NAME}] ${message}`);
        break;
      default:
        console.log(`[${NAME}] ${message}`);
    }
  }
};
