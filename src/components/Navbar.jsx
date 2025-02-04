import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section: Logo and Name */}
        <div className="flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/6871/6871676.png"
            alt="Logo"
            className="w-10 h-10 rounded-full invert"
          />
          <span className="text-xl font-bold ml-2">CryptoShield</span>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Right Section: Links */}
        <div className="hidden lg:flex mr-10 gap-6">
          <Link to="/" className="text-lg hover:underline hover:font-semibold">
            Home
          </Link>
          <Link to="/read" className="text-lg hover:underline">
            Read tag
          </Link>
          <Link to="/write" className="text-lg hover:underline">
            Write tag
          </Link>
          <Link to="/validate" className="text-lg hover:underline">
            Validate tag
          </Link>
          <Link to="/createuser" className="text-lg hover:underline">
            Create User
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-center gap-4 py-4 bg-gray-700">
          <Link to="/" className="text-lg hover:text-gray-300">
            Home
          </Link>
          <Link to="/read" className="text-lg hover:text-gray-300">
            Read Tag
          </Link>
          <Link to="/validate" className="text-lg hover:text-gray-300">
            Validate
          </Link>
          <Link to="/write" className="text-lg hover:text-gray-300">
            Write tag
          </Link>
          <Link to="/createuser" className="text-lg hover:underline">
            Create User
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
