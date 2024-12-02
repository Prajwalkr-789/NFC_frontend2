import React from 'react';

const Footer = () => {
  return (

    <footer className="bg-gradient-to-l from-gray-700 via-gray-800 to-gray-900 text-white py-10">
        <hr />
      <div className="max-w-screen-xl mx-auto px-6 mt-2 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">About Us</h3>
            <p className="text-gray-200">
              We are a leading tech company revolutionizing the world with innovative solutions and services.
            </p>
            <p className="text-gray-200">
              Our mission is to deliver secure and efficient products powered by advanced technology.
            </p>
          </div>

          {/* Column 2: Links Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Quick Links</h3>
            <ul className="text-gray-200 space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300">Home</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">Services</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">Contact</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-200 hover:text-white">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-gray-200 hover:text-white">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-200 hover:text-white">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
              <a href="#" className="text-gray-200 hover:text-white">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="text-center mt-8">
          <p className="text-gray-200">
            &copy; 2024 Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;