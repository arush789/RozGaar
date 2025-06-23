import { signOut } from "next-auth/react";
import React from "react";

const Logout = () => {
  return (
    <button
      onClick={() => {
        signOut({ callbackUrl: "/", redirect: true });
      }}
      className="bg-primary text-nav  rounded hover:bg-primary-dark cursor-pointer"
    >
      Logout
    </button>
  );
};

export default Logout;
