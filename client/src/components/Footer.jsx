import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-12">
      <div className="container mx-auto flex flex-col items-center space-y-4 px-4">
        {/* Social Icons */}
        <div className="flex gap-6 justify-center">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img
              src={assets.facebook_icon}
              alt="Twitter"
              className="h-6 w-6 sm:h-7 sm:w-7 hover:opacity-80 transition"
            />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img
              src={assets.instagram_icon}
              alt="Instagram"
              className="h-6 w-6 sm:h-7 sm:w-7 hover:opacity-80 transition"
            />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img
              src={assets.twitter_icon}
              alt="Facebook"
              className="h-6 w-6 sm:h-7 sm:w-7 hover:opacity-80 transition"
            />
          </a>
        </div>

        {/* Divider */}
        <div className="w-full sm:w-3/4 border-t border-gray-700"></div>

        {/* Copy Info */}
        <p className="text-xs sm:text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} JobFinder. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
