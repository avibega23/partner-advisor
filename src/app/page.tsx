"use client";

import React, { useEffect } from "react";
import {
  LoginLink,
  RegisterLink,
  useKindeAuth,
} from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthenticated, isLoading } = useKindeAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/chat");
    } 
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="bg-black-100 flex h-screen items-center justify-center">
        <div className="flex items-center text-lg font-semibold text-white">
          <svg
            className="mr-3 -ml-1 h-5 w-5 animate-spin text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <main className="flex h-screen items-center justify-center bg-pallete-black">
      <div className="w-full max-w-md rounded-xl bg-white p-10 text-center shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">
          Welcome to Partner Advisor
        </h1>
        <p className="mb-8 text-gray-600">
          Please sign in or create an account to access your dashboard.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row dark:text-black">
          <LoginLink className="w-full rounded-lg bg-primary-1 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:w-auto">
            Login
          </LoginLink>
          <RegisterLink className="w-full rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-800 transition-all duration-300 ease-in-out hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none sm:w-auto">
            Register
          </RegisterLink> 
        </div>
      </div>
    </main>
  );
}
