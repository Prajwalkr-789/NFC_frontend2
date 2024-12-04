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
    <div className="h-screen flex justify-center items-center bg-gradient-to-l from-gray-700 via-gray-800 to-gray-900">

    
    <div className="p-6 rounded-lg   shadow-lg max-w-full sm:max-w-lg lg:max-w-xl mx-auto bg-white text-gray-900 mt-16">
    <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">NFC Writer</h2>
    <div className="space-y-4">
      {/* Input for text to write */}
      <input
        type="text"
        placeholder="Enter text to write"
        value={textToWrite}
        onChange={(e) => setTextToWrite(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      {/* Write button */}
      <button
        onClick={writeData}
        className={`w-full px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-500 transition-all ${
          isWriting || !textToWrite
            ? "bg-blue-400 cursor-not-allowed"
            : "hover:bg-blue-500"
        }`}
        disabled={isWriting || !textToWrite}
      >
        Write to NFC Tag
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
  </div>
  </div>
  );
};

export default Writer;
