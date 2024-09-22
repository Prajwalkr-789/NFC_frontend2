import "./style.css";
import { URLTool } from "./tools/url.ts";
import { WifiTool } from "./tools/wifi";
import "./ui.ts";

document.querySelector("#wifi-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(e.target as HTMLFormElement));
  log("Tap NFC tag to write");
  const ndef = new NDEFReader();
  const wifi = new WifiTool(payload as unknown as WifiRecordPayload);
  ndef
    .write({ records: [wifi.getRecord()] })
    .then(() => log("Wifi credentials written"))
    .catch((e: Error) => log("Something went wrong: " + e.message));
});

document.querySelector("#url-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(e.target as HTMLFormElement));
  log("Tap NFC tag to write");
  const ndef = new NDEFReader();
  const url = new URLTool(payload.url as string);
  ndef
    .write({ records: [url.getRecord()] })
    .then(() => log("URL written"))
    .catch((e: Error) => log("Something went wrong: " + e.message));
});
const nfcPermission = await navigator.permissions.query({
  name: "nfc" as PermissionName,
});
if (nfcPermission.state !== "granted") {
  const grantBtn = document.getElementById("grant-btn")!!;
  document.getElementById("app")?.classList.add("disabled");
  grantBtn.style.display = "block";
  grantBtn.onclick = async () => {
    const tempCtrl = new AbortController();
    const ndef = new NDEFReader();
    await ndef.scan({ signal: tempCtrl.signal });
    setTimeout(tempCtrl.abort, 1000);
    document.getElementById("app")?.classList.remove("disabled");
    grantBtn.style.display = "none";
  };
}

const logDiv = document.getElementById("log")!!;
const logs: string[] = [];

function log(text: string) {
  logs.push(text);
  logDiv.innerHTML = logs.map((l) => `<br>> ${l}`).join();
}

document.getElementById("stop-scan-btn")?.addEventListener("click", () => {
  log("Scanning stopped");
  window.abortController.abort();
});

document
  .getElementById("start-scan-btn")
  ?.addEventListener("click", async () => {
    log("Tap NFC tag to read");

    window.abortController = new AbortController();
    const ndef = new NDEFReader();
    ndef
      .scan({ signal: window.abortController.signal })
      .then(() => {
        ndef.onreadingerror = () => {
          log("Error! Cannot read data from the NFC tag. Try a different one?");
        };
        ndef.onreading = (e: any) => {
          const { serialNumber, message } = e;
          log(`UID: ${serialNumber}`);
          const decoder = new TextDecoder();
          for (const record of message.records) {
            console.log(record);
            log(`Record type: ${record?.recordType}`);
            log(`MIME type: ${record?.mediaType}`);
            log(`Record id: ${record?.id}`);
            if (record.data) {
              const data = decoder.decode(record.data);
              log(`Data: ${data}`);
            }
          }
        };
      })
      .catch((e: Error) => {
        log(`Error! Scan failed to start: ${e.message}`);
      });
  });
