import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-lg font-semibold">RozGaar</div>

        <div className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-gray-300 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-300 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-300 transition">
            Contact
          </Link>
        </div>

        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} RozGaar. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
