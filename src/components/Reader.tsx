import React, { useState } from "react";

const Reader: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const log = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  const startScan = async () => {
    if (!("NDEFReader" in window)) {
      log("Web NFC is not supported in this browser.");
      return;
    }

    try {
      const ndef = new NDEFReader();
      log("Tap an NFC tag to read.");

      setIsScanning(true);
      await ndef.scan();

      ndef.onreading = (event: any) => {
        const { serialNumber, message } = event;
        log(`UID: ${serialNumber}`);
        const decoder = new TextDecoder();
        for (const record of message.records) {
          log(`Record type: ${record.recordType}`);
          if (record.data) {
            const data = decoder.decode(record.data);
            log(`Data: ${data}`);
          }
        }
      };

      ndef.onreadingerror = () => {
        log("Error reading data from NFC tag. Try a different one?");
      };
    } catch (error: any) {
      log(`Error: ${error.message}`);
    }
  };

  const stopScan = () => {
    log("Scanning stopped.");
    setIsScanning(false);
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">NFC Reader</h2>
      <div className="space-y-2">
        <button
          onClick={startScan}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          disabled={isScanning}
        >
          Start Scan
        </button>
        <button
          onClick={stopScan}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          disabled={!isScanning}
        >
          Stop Scan
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-bold">Logs:</h3>
        <div className="bg-gray-100 p-2 rounded border h-40 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index}>{`> ${log}`}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reader;
