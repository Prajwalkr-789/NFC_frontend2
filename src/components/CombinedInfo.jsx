import React from "react";

const CombinedInfo = () => {
  return (
    <div className="h-screen bg-gradient-to-l from-gray-700 via-gray-800 to-gray-900">
    <div className="  text-white px-6 lg:px-24 py-16">
      {/* Hero Section */}
      <div className=" text-center mb-12">
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">
          NFC + Cryptographic Security
        </h1>
        <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
          The powerful combination of NFC technology and cryptographic algorithms delivers unparalleled security for modern applications, revolutionizing industries like payments, healthcare, and IoT.
        </p>
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* NFC Card */}
        <div className="bg-blue-500 p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-[1.1] transition duration-300">
          <div className="flex justify-center mb-4">
            <img
              src="https://via.placeholder.com/100"
              alt="NFC Icon"
              className="w-20 h-20"
            />
          </div>
          <h2 className="text-2xl font-semibold text-center mb-2">NFC Technology</h2>
          <p className="text-white text-center">
            NFC enables secure, fast, and contactless communication for payments, data sharing, and authentication.
          </p>
        </div>

        {/* Cryptographic Card */}
        <div className="bg-yellow-500 text-white to- p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-[1.1] transition duration-300">
          <div className="flex justify-center mb-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Cryptography Icon"
              className="w-20 h-20"
            />
          </div>
          <h2 className="text-2xl font-semibold text-center mb-2">Cryptographic Security</h2>
          <p className="text-white text-center">
            Cryptographic algorithms ensure the safety and integrity of sensitive data across digital platforms.
          </p>
        </div>

        {/* Combined Card */}
        <div className="bg-green-500 p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-[1.1] transition duration-300">
          <div className="flex justify-center mb-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Secure Systems Icon"
              className="w-20 h-20"
            />
          </div>
          <h2 className="text-2xl font-semibold text-center mb-2">Combined Systems</h2>
          <p className="text-white text-center">
            When paired together, NFC and cryptographic algorithms provide end-to-end security for critical applications.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CombinedInfo;