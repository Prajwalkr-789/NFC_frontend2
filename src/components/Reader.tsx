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
    <div className="h-screen bg-gradient-to-l from-gray-700 via-gray-800 to-gray-900 flex justify-center items-center">
<div className="p-10 rounded-lg shadow-lg w-8/12 mx-auto bg-white text-gray-900">
  <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
    NFC Reader
  </h2>
  <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 items-center">
    <button
      onClick={startScan}
      className="w-full sm:w-auto px-6 py-3 text-lg font-medium bg-green-600 text-white rounded-lg shadow hover:bg-green-500 transition-all disabled:bg-green-300 disabled:cursor-not-allowed"
      disabled={isScanning}
    >
      Start Scan
    </button>
    <button
      onClick={stopScan}
      className="w-full sm:w-auto px-6 py-3 text-lg font-medium bg-red-600 text-white rounded-lg shadow hover:bg-red-500 transition-all disabled:bg-red-300 disabled:cursor-not-allowed"
      disabled={!isScanning}
    >
      Stop Scan
    </button>
  </div>
  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-4 text-gray-800">Logs:</h3>
    <div className="bg-white text-gray-700 p-4 rounded-lg border border-gray-500 h-40 overflow-y-auto">
      {logs.length > 0 ? (
        logs.map((log, index) => (
          <div key={index} className="mb-2 text-sm font-medium">{`> ${log}`}</div>
        ))
      ) : (
        <div className="text-sm italic text-gray-500">No logs available.</div>
      )}
    </div>
  </div>
</div>


</div>

  );
};

export default Reader;
