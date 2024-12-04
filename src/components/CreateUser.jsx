import React, { useState } from "react";

const Createuser = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
  });
  const [response, setResponse] = useState(null); // State to store backend response
  const [error, setError] = useState(null); // State to store errors

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://nfc-backend-4ue4.onrender.com/api/register-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setResponse(data);
        setError(null); // Clear any previous errors
      } else {
        setResponse(null);
        setError(data.message || "An error occurred.");
      }
    } catch (err) {
      setResponse(null);
      setError("An error occurred while sending the request.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-gray-700 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Welcome! 👋
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your details to register
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your Name"
              className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-medium"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your Phone Number"
              className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-gray-700 font-medium"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your Address"
              className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-md shadow-md transition-transform transform hover:scale-105"
          >
            Register
          </button>
        </form>

        {/* Display Backend Response */}
        {response && (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md">
            <h3 className="font-bold">Success!</h3>
            <p>{response.message}</p>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md">
            <h3 className="font-bold">Error</h3>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Createuser;
