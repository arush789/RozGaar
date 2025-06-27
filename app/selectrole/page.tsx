"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { getServerSession } from "next-auth";
import { useSearchParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";

const roles = [
  {
    key: "seeker",
    label: "Job Seeker",
    description: "Looking for internships or jobs.",
  },
  {
    key: "hiring",
    label: "Hiring",
    description: "Looking to hire talented individuals.",
  },
];

const Page = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const params = useSearchParams();
  const email = params.get("email");

  useEffect(() => {
    const accessToken = Cookies.get("redirectToSelectRole");

    if (!accessToken) {
      window.location.href = "/";
    } else {
      setLoaded(true);
      setTimeout(() => {
        Cookies.remove("redirectToSelectRole");
      }, 100);
    }
  }, []);

  if (!loaded) return null;

  const handleConfirm = async () => {
    if (selectedRole) {
      const response = await axios.post("http://localhost:3001/set-role", {
        email: email,
        role: selectedRole,
      });
      if (response.status === 200) {
        Cookies.remove("redirectToSelectRole");
        window.location.href = "/";
      } else {
        alert("Failed to set role. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold mb-6 text-black">Select Your Role</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl w-full">
        {roles.map((role) => (
          <button
            key={role.key}
            onClick={() => setSelectedRole(role.key)}
            className={`rounded-2xl shadow-md p-6 border-2 transition-all duration-300 text-left ${
              selectedRole === role.key
                ? "border-blue-500"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2 text-black">
              {role.label}
            </h2>
            <p className="text-black">{role.description}</p>
          </button>
        ))}
      </div>

      <button
        onClick={handleConfirm}
        disabled={!selectedRole}
        className={`mt-8 px-6 py-3 rounded-xl font-semibold text-white transition-colors ${
          selectedRole
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Confirm
      </button>
    </div>
  );
};

export default Page;
