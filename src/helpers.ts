const isSSR = typeof window === "undefined";

export const isEmptyObject = (obj: object) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export { isSSR };
