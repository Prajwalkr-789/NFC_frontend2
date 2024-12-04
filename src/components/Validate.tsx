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
        const { serialNumber, message } = event; // Removed serialNumber usage
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
            body: JSON.stringify({
              tid: serialNumber,
              encryptedData: tagData,
            }),
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
    <div className="bg-gradient-to-l from-gray-700 via-gray-800 to-gray-900 h-screen p-10">
    <div className="p-6 rounded-lg shadow-lg max-w-full sm:max-w-lg lg:max-w-xl  mx-auto bg-white text-gray-900 mt-10">
    <h2 className="text-xl font-bold mb-4 text-center text-gray-800">NFC Reader</h2>
    
    <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
      <button
        onClick={startScan}
        className={`w-full sm:w-auto px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg shadow hover:bg-green-500 transition ${
          isScanning ? "bg-green-300 cursor-not-allowed" : ""
        }`}
        disabled={isScanning}
      >
        Start Scan
      </button>
      <button
        onClick={stopScan}
        className={`w-full sm:w-auto px-6 py-3 text-lg font-medium text-white bg-red-600 rounded-lg shadow hover:bg-red-500 transition ${
          !isScanning ? "bg-red-300 cursor-not-allowed" : ""
        }`}
        disabled={!isScanning}
      >
        Stop Scan
      </button>
    </div>
    
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Logs:</h3>
      <div className="bg-gray-100 text-gray-700 p-4 rounded-lg border border-gray-300 h-40 overflow-y-auto">
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <div key={index} className="text-sm font-medium mb-1">{`> ${log}`}</div>
          ))
        ) : (
          <div className="text-sm italic text-gray-500">No logs available.</div>
        )}
      </div>
    </div>
  
    {response && (
      <div className="mt-6 p-6 bg-green-50 border border-green-300 rounded-lg">
        <h3 className="text-lg font-semibold text-green-700 mb-2">Validation Result:</h3>
        <p className="text-gray-800">
          <strong>Name:</strong> {response.name}
        </p>
        <p className="text-gray-800">
          <strong>Message:</strong> {response.message}
        </p>
      </div>
    )}
  </div>
  </div>
  );
};

export default Validate;
