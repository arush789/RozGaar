"use client";
import { signIn } from "next-auth/react";
import React, { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { getUser } from "../utils";

const Form = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user = await getUser({
      email: formData.get("email") as string,
    });
    if (user) {
      alert("User already exists with this email.");
      return;
    }
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
        username: formData.get("name"),
      }),
    });
    if (response.ok) {
      window.location.href = "/login";
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Create an Account
          </h2>
          <p className="text-sm text-gray-500">
            Start your journey to your dream job or internship
          </p>
        </div>

        <div className="space-y-4">
          <input
            name="name"
            type="name"
            required
            placeholder="Username"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
        >
          Register
        </button>
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="flex items-center justify-center gap-2 w-full py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition duration-300"
        >
          <FcGoogle size={24} />
          <span className="text-gray-700 font-medium">Sign in with Google</span>
        </button>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Form;
