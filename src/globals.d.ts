declare global {
  declare class NDEFReader extends EventTarget {
    scan: any;
    write: any;
  }
}
export {};
