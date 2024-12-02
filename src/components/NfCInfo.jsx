import React from "react";

const NFCInfo = () => {
  return (
    <div className="h-screen bg-gradient-to-l from-gray-700 via-gray-800 to-gray-900 text-white px-6 lg:px-24 py-16">
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
        {/* Left Section */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Near Field Communication (NFC)
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 mb-4">
            NFC is a cutting-edge technology that enables two devices to communicate when placed near each other. It is widely adopted in industries such as payments, transportation, healthcare, and more.
          </p>
          <p className="text-lg lg:text-xl text-gray-300">
            Whether you're tapping your phone to pay at a store or scanning a smart tag, NFC makes everyday interactions seamless, efficient, and secure.
          </p>
        </div>
        {/* Right Section */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src="https://via.placeholder.com/500x300"
            alt="NFC Technology"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Additional Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div className="bg-gray-800 p-6 rounded-lg shadow-[0px_0px_8px_gray]">
          <h2 className="text-2xl font-semibold mb-2">How NFC Works</h2>
          <p className="text-gray-300">
            NFC works by electromagnetic induction, enabling communication between devices within a few centimeters. This makes it secure for data exchange without requiring power on the passive device.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-[0px_0px_8px_gray] ">
          <h2 className="text-2xl font-semibold mb-2">Applications of NFC</h2>
          <ul className="list-disc ml-6 text-gray-300">
            <li>Contactless Payments</li>
            <li>Public Transportation Systems</li>
            <li>Access Control</li>
            <li>Device Pairing</li>
            <li>Healthcare Monitoring</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NFCInfo;