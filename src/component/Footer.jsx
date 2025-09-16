import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1e2939] mt-auto text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-lg font-bold tracking-wide">
          Company name
        </div>

        <nav>
          <ul className="flex flex-wrap gap-6 text-sm font-medium">
            <li className="hover:text-gray-700 cursor-pointer transition">About</li>
            <li className="hover:text-gray-700 cursor-pointer transition">Blog</li>
            <li className="hover:text-gray-700 cursor-pointer transition">Press</li>
            <li className="hover:text-gray-700 cursor-pointer transition">Help</li>
          </ul>
        </nav>

        <div className="text-xs text-white text-center md:text-right">
          © {new Date().getFullYear()} All rights reserved | Mistake Air Fares
        </div>
      </div>
    </footer>
  );
};

export default Footer;
