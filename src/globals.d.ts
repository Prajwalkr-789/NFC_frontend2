declare global {
  declare class NDEFReader extends EventTarget {
    scan: any;
    write: any;
    onreading: any;
    onreadingerror: any;
  }

  interface Window {
    openTab: any;
    abortController: any;
  }
}
export {};
