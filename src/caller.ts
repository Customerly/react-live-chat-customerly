import * as logger from "./logger";
import { CustomerlyCallerMethod } from "./types";
import { isSSR } from "./helpers";

const Caller = (method: CustomerlyCallerMethod, ...args: Array<any>) => {
  if (!isSSR && window.customerly) {
    return window.customerly[method](...args);
  } else {
    logger.log("error", `${method} Customerly is not initialized yet`);
  }
};

export default Caller;
