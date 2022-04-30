export {};

declare global {
  var __DEV__: boolean;
  
  interface Window {
    customerly: any;
  }
}
