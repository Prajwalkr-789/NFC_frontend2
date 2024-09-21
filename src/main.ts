import "./style.css";
import { getRecord } from "./tools/wifi";

const readBtn = document.getElementById("read-btn");
const writeBtn = document.getElementById("write-btn");
const logDiv = document.getElementById("log");

function log(text: string) {
  if (logDiv) logDiv.innerHTML += `<br> ${text}`;
}

readBtn?.addEventListener("click", async () => {
  log("User clicked scan button");

  try {
    const ndef = new NDEFReader();
    await ndef.scan();
    log("> Scan started");

    ndef.addEventListener("readingerror", () => {
      log("Argh! Cannot read data from the NFC tag. Try another one?");
    });

    ndef.addEventListener("reading", (e: any) => {
      const { serialNumber, message } = e;
      log(serialNumber);
      const decoder = new TextDecoder();
      for (const record of message.records) {
        console.log(record);
        log("Record type:  " + record?.recordType);
        log("MIME type:    " + record?.mediaType);
        log("Record id:    " + record?.id);
        if (record.data) {
          const msg = decoder.decode(record.data);
          log(msg);
        }
      }
    });
  } catch (error) {
    log("Argh! " + error);
  }
});

writeBtn?.addEventListener("click", async () => {
  log("User clicked write button");

  try {
    const ndef = new NDEFReader();
    ndef.write({
      records: [getRecord("wifiname", "wifipass", "WPA/WP2 PERSONAL", "NONE")],
    });
    log("> Message written");
  } catch (error) {
    log("Argh! " + error);
  }
});
