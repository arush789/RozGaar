"use client";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import Logout from "./Logout";
import { getRole } from "@/app/utils";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import userImage from "../public/images/user-img.jpg";
import Link from "next/link";

const Navbar = ({ session }: { session: any }) => {
  const [menu, setMenu] = useState<boolean>(false);
  const toggleMenu = () => {
    setMenu(!menu);
    console.log("Menu toggled:", !menu);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <nav className="p-4">
        {/* Desktop Navbar */}
        <div className="container mx-auto justify-between items-center lg:flex hidden">
          <div className="text-nav text-lg font-bold">RozGaar</div>
          <ul className="flex items-center space-x-4">
            <li>
              <a href="/" className="text-nav hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-nav hover:text-gray-300">
                About
              </a>
            </li>
            <li>
              <a href="/Jobs" className="text-nav hover:text-gray-300">
                Jobs
              </a>
            </li>
            <li>
              {session && (
                <div className="mt-1">
                  <button onClick={handleClick}>
                    <Image
                      src={session?.user.image || userImage}
                      alt="profile"
                      width={34}
                      height={34}
                      className="rounded-full"
                    />
                  </button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      list: {
                        "aria-labelledby": "basic-button",
                      },
                    }}
                  >
                    <MenuItem>
                      <Link href="/Profile">Profile</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem>
                      <Logout />
                    </MenuItem>
                  </Menu>
                </div>
              )}
              {!session && (
                <a
                  href="/login"
                  className="bg-primary text-nav rounded hover:bg-primary-dark cursor-pointer px-4 py-2"
                >
                  Login
                </a>
              )}
            </li>
          </ul>
        </div>

        {/* Mobile Navbar */}
        <div className="lg:hidden flex justify-between items-center">
          <div className="text-nav text-lg font-bold">RozGaar</div>
          <div className="flex items-center space-x-4">
            <button
              className="text-nav focus:outline-none"
              onClick={toggleMenu}
            >
              <GiHamburgerMenu size={24} />
            </button>
            {session && (
              <div className="mt-1">
                <button onClick={handleClick}>
                  <Image
                    src={session?.user.image || userImage}
                    alt="profile"
                    width={34}
                    height={34}
                    className="rounded-full"
                  />
                </button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link href="/Profile" className="w-full block">
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem>
                    <Logout />
                  </MenuItem>
                </Menu>
              </div>
            )}
            {!session && (
              <a
                href="/login"
                className="bg-primary text-nav rounded hover:bg-primary-dark cursor-pointer px-4 py-2"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </nav>

      {menu && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm brightness-75 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Sidebar menu */}
      <div
        className={`fixed top-0 right-0 h-full w-68 bg-nav text-white transform transition-transform duration-300 ease-in-out z-50 ${
          menu ? "-translate-x-0 over" : "translate-x-full"
        }`}
      >
        <ul className="mt-10 space-y-2 px-6 w-full">
          <div className="w-full flex justify-end relative -top-5">
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu}
            >
              <RxCross2 size={24} />
            </button>
          </div>
          <li className="py-2 rounded">
            <a href="/" className="block">
              Home
            </a>
          </li>
          <li className="py-2 rounded">
            <a href="/about" className="block">
              About
            </a>
          </li>
          <li className="py-2 rounded">
            <a href="/Jobs" className="block">
              Jobs
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
