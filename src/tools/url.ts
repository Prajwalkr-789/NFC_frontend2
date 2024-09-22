export class URLTool {
  url: string;
  constructor(url: string) {
    this.url = url;
  }
  getRecord(): NDEFRecord {
    return {
      recordType: "url",
      data: this.url,
    };
  }
}
