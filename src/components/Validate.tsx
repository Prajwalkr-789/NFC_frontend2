import React, { useState } from "react";

const Validate: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [response, setResponse] = useState<null | { success: boolean; name: string; message: string }>(null);

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

      ndef.onreading = async (event: any) => {
        const { message } = event; // Removed serialNumber usage
        log("NFC tag read successfully. Stopping scan...");

        const decoder = new TextDecoder();
        let tagData = "";

        for (const record of message.records) {
          log(`Record type: ${record.recordType}`);
          if (record.data) {
            tagData += decoder.decode(record.data); // Collect tag data
          }
        }

        // Stop scanning
        setIsScanning(false);

        // Send the tag data to the backend
         
        try {
          const response = await fetch("https://nfc-backend-4ue4.onrender.com/api/validateTag", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: "f346aff9f9517745fb7a695215157461b6eadcc337a7176127615af51f16356dcc9351e7be847974deaa03bd55ee6db9",
          });

          if (response.ok) {
            const data = await response.json();
            log("Tag validation successful.");
            setResponse(data); // Save backend response for display
          } else {
            log("Tag validation failed.");
          }
        } catch (error: any) {
          log(`Error sending data to the backend: ${error.message}`);
        }
      };

      ndef.onreadingerror = () => {
        log("Error reading data from NFC tag. Try a different one?");
        setIsScanning(false);
      };
    } catch (error: any) {
      log(`Error: ${error.message}`);
      setIsScanning(false);
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

      {response && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
          <h3 className="text-sm font-bold">Validation Result:</h3>
          <p><strong>Name:</strong> {response.name}</p>
          <p><strong>Message:</strong> {response.message}</p>
        </div>
      )}
    </div>
  );
};

export default Validate;
