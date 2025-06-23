"use client";
import React from "react";

const Form = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    if (response.ok) {
      // Handle successful registration, e.g., redirect to login page
      window.location.href = "/login";
    }
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
