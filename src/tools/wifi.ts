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
function stringToHex(str: string) {
  const data = new TextEncoder().encode(str);
  return Array.from(
    data,
    (byte) => "0x" + byte.toString(16).toUpperCase().padStart(2, "0"),
  ).join(" ");
}
function wifiToBytes(
  ssid: string,
  slen: string,
  pass: string,
  plen: string,
  auth: string,
  ecyp: string,
) {
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
export function getRecord(
  ssid: string,
  pass: string,
  auth: keyof Authentication,
  ecyp: keyof Encryption,
): NDEFRecord {
  const slen = ssid.length.toString(16).toUpperCase();
  const plen = ssid.length.toString(16).toUpperCase();
  return {
    recordType: "mime",
    mediaType: "application/vnd.wfa.wsc",
    data: wifiToBytes(
      stringToHex(ssid),
      slen,
      stringToHex(pass),
      plen,
      authentication[auth],
      encryption[ecyp],
    ),
  };
}
