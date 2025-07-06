"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { FiPlus } from "react-icons/fi";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";

const AddJob = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <CircularProgress />;

  if (session?.user?.role === "seeker") return null;

  return (
    <Link
      href="/Jobadd"
      className="bg-blue-400 text-white p-2 rounded-xl flex items-center gap-2"
    >
      <FiPlus />
      Add
    </Link>
  );
};

export default AddJob;
