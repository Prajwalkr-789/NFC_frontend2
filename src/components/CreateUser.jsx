import React from "react";

const Createuser = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-gray-700 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Welcome! 👋
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your details to register
        </p>
        <form className="space-y-4">
          {/* User ID */}
          <div>
            <label htmlFor="userId" className="block text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              id="userId"
              placeholder="Enter your User ID"
              className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your Phone Number"
              className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              address
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your Password"
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

        
      </div>
    </div>
  );
};

export default Createuser;