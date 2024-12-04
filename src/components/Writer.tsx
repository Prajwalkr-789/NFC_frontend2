import React, { useState } from "react";

const Writer: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [textToWrite, setTextToWrite] = useState("");
  const [tagId, setTagId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [token, setToken] = useState("");
  const [response, setResponse] = useState<null | { success: boolean; message: string }>(null);

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

      // Send data to the backend
      try {
        const response = await fetch("https://nfc-backend-4ue4.onrender.com/api/writeontag", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tagId, phoneNumber, token }),
        });

        if (response.ok) {
          const data = await response.json();
          log("Data successfully sent to the backend.");
          setResponse(data);
        } else {
          log("Failed to send data to the backend.");
        }
      } catch (error: any) {
        log(`Error sending data to backend: ${error.message}`);
      }
    } catch (error: any) {
      log(`Error: ${error.message}`);
    } finally {
      setIsWriting(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-l from-gray-700 via-gray-800 to-gray-900">
      <div className="p-6 rounded-lg shadow-lg max-w-full sm:max-w-lg lg:max-w-xl mx-auto bg-white text-gray-900 mt-16">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">NFC Writer</h2>
        <div className="space-y-4">
          {/* Input Fields */}
          <input
            type="text"
            placeholder="Enter tag ID"
            value={tagId}
            onChange={(e) => setTagId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Enter token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {/* Write Button */}
          <button
            onClick={writeData}
            className={`w-full px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow ${
              isWriting || !tagId || !phoneNumber || !token
                ? "bg-blue-400 cursor-not-allowed"
                : "hover:bg-blue-500"
            } transition-all`}
            disabled={isWriting || !tagId || !phoneNumber || !token}
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
        {response && (
          <div className="mt-6 p-6 bg-green-50 border border-green-300 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700 mb-2">Server Response:</h3>
            <p className="text-gray-800">
              <strong>Message:</strong> {response.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Writer;
