"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Form = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    console.log(response);
    if (!response?.error) {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500">Login to your account</p>
        </div>

        <div className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div className="text-right text-sm">
          <a href="#" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Form;
