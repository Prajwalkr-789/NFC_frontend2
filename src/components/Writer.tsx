import React, { useState } from "react";

const Writer: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [textToWrite, setTextToWrite] = useState("");

  const log = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  const writeData = async () => {
    if (!("NDEFReader" in window)) {
      log("Web NFC is not supported in this browser.");
      return;
    }

    try {
      const ndef = new NDEFReader();
      log("Hold an NFC tag near your device to write.");

      setIsWriting(true);
      await ndef.write({
        records: [{ recordType: "text", data: textToWrite }],
      });

      log("Data written successfully to the NFC tag.");
    } catch (error: any) {
      log(`Error: ${error.message}`);
    } finally {
      setIsWriting(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow-md mt-64">
      <h2 className="text-lg font-semibold mb-2">NFC Writer</h2>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Enter text to write"
          value={textToWrite}
          onChange={(e) => setTextToWrite(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        />
        <button
          onClick={writeData}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={isWriting || !textToWrite}
        >
          Write to NFC Tag
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

export default Writer;
