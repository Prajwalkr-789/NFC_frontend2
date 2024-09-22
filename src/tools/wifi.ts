const encryption = {
  WEP: "0x02",
  AES: "0x08",
  TKIP: "0x04",
  NONE: "0x01",
  "AES/TKIP": "0x0C",
};
const authentication = {
  OPEN: "0x01",
  SHARED: "0x04",
  "WPA PERSONAL": "0x02",
  "WPA2 PERSONAL": "0x20",
  "WPA ENTERPRISE": "0x08",
  "WPA2 ENTERPRISE": "0x10",
  "WPA/WP2 PERSONAL": "0x22",
};
export class WifiTool {
  slen: string;
  plen: string;
  ssid: string;
  pass: string;
  auth: string;
  ecyp: string;
  constructor(payload: WifiRecordPayload) {
    const { ssid, pass, auth, ecyp } = payload;
    this.slen = this.len2Bytes(ssid);
    this.plen = this.len2Bytes(pass);
    this.ssid = this.string2Hex(ssid);
    this.pass = this.string2Hex(pass);
    this.auth = authentication[auth];
    this.ecyp = encryption[ecyp];
  }
  getRecord(): NDEFRecord {
    return {
      recordType: "mime",
      mediaType: "application/vnd.wfa.wsc",
      data: this.wifi2Bytes(),
    };
  }
  string2Hex(str: string) {
    const data = new TextEncoder().encode(str);
    return Array.from(
      data,
      (byte) => "0x" + byte.toString(16).toUpperCase().padStart(2, "0"),
    ).join(" ");
  }
  len2Bytes(str: string) {
    return str.length.toString(16).toUpperCase();
  }
  wifi2Bytes() {
    const { ssid, slen, pass, plen, auth, ecyp } = this;
    const bytes = `
0x10 0x0E 0x00 0x2D 0x10 0x26 0x00 0x01 \n
0x01 0x10 0x45 0x00 0x${slen} ${ssid} 0x10 0x03 \n
0x00 0x02 0x00 ${auth} 0x10 0x0F 0x00 0x02 \n
0x00 ${ecyp} 0x10 0x27 0x00 0x${plen} ${pass} 0x10 \n
0x20 0x00 0x06 0xFF 0xFF 0xFF 0xFF 0xFF 0xFF`;
    console.log(bytes.replace(/\n/gm, ""));
    return new DataView(
      new Uint8Array(
        bytes.replace(/\n/gm, "").split(" ") as unknown as ArrayBuffer,
      ).buffer,
    );
  }
}
