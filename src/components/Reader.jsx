import React, { useState } from "react";

const Reader = () => {
  const [activeTab, setActiveTab] = useState("wifi"); // Default active tab
  const [log, setLog] = useState(""); // Log output

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  const handleWifiSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const ssid = formData.get("ssid");
    const pass = formData.get("pass");
    const auth = formData.get("auth");
    const enc = formData.get("ecpy");
    setLog(`Wifi Details: SSID=${ssid}, Password=${pass}, Auth=${auth}, Encryption=${enc}`);
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get("url");
    setLog(`URL to write: ${url}`);
  };

  const startNFCScan = () => {
    setLog("Starting NFC scan...");
    if ("NDEFReader" in window) {
      const reader = new window.NDEFReader();
      reader.scan().then(() => {
        reader.onreading = (event) => {
          const message = event.message.records.map((record) =>
            record.data ? new TextDecoder().decode(record.data) : "Unsupported data"
          );
          setLog(`NFC tag read: ${message}`);
        };
        setLog("NFC scanning started.");
      }).catch((err) => {
        setLog(`Error starting NFC scan: ${err}`);
      });
    } else {
      setLog("NFC not supported in this browser.");
    }
  };

  const stopNFCScan = () => {
    setLog("NFC scanning stopped.");
    // Note: Actual NFC scanning does not have a "stop" feature in Web NFC yet.
  };

  return (
    <div className="bg-gray-100 font-sans text-gray-800 min-h-screen flex flex-col items-center justify-center">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition mb-6"
        onClick={() => setLog("NFC Access granted (simulated).")}
      >
        Grant NFC Access
      </button>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        {/* Tabs */}
        <div className="tab flex justify-around mb-6">
          {["wifi", "url", "read"].map((tab) => (
            <button
              key={tab}
              className={`tablinks px-4 py-2 rounded transition ${
                activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => openTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "wifi" && (
          <div id="wifi">
            <h4 className="text-lg font-semibold mb-4">Write Wifi connection to NFC tag</h4>
            <form id="wifi-form" className="space-y-4" onSubmit={handleWifiSubmit}>
              <div>
                <label htmlFor="ssid" className="block text-sm font-medium">SSID</label>
                <input id="ssid" name="ssid" type="text" required className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label htmlFor="pass" className="block text-sm font-medium">Password</label>
                <input id="pass" name="pass" type="text" required className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label htmlFor="auth" className="block text-sm font-medium">Authentication</label>
                <select id="auth" name="auth" required className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="WPA/WP2 PERSONAL">WPA/WP2 PERSONAL</option>
                  <option value="OPEN">OPEN</option>
                </select>
              </div>
              <div>
                <label htmlFor="ecpy" className="block text-sm font-medium">Encryption</label>
                <select id="ecpy" name="ecpy" required className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="NONE">NONE</option>
                  <option value="AES">AES</option>
                </select>
              </div>
              <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Write</button>
            </form>
          </div>
        )}

        {activeTab === "url" && (
          <div id="url">
            <h4 className="text-lg font-semibold mb-4">Write a URL to an NFC tag</h4>
            <form id="url-form" className="space-y-4" onSubmit={handleUrlSubmit}>
              <div>
                <label htmlFor="url" className="block text-sm font-medium">URL</label>
                <input id="url" name="url" type="url" required className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Write</button>
            </form>
          </div>
        )}

        {activeTab === "read" && (
          <div id="read">
            <h4 className="text-lg font-semibold mb-4">Read contents of an NFC tag</h4>
            <div className="space-y-4">
              <button onClick={startNFCScan} className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                Start scan
              </button>
              <button onClick={stopNFCScan} className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                Stop scan
              </button>
            </div>
          </div>
        )}

        {/* Log Section */}
        <div id="log" className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded">
          {log || "Logs will appear here..."}
        </div>
      </div>
    </div>
  );
};

export default Reader;
