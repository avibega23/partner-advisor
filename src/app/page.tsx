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
        router.push("/dashboard");
      }
      console.log(isAuthenticated);
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
      return (
          <div className="flex items-center justify-center h-screen bg-gray-50 font-sans">
            <div className="text-lg font-semibold text-gray-600 flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
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
        <main className="flex items-center justify-center h-screen bg-gray-100 font-sans">
          <div className="text-center p-10 bg-white rounded-xl shadow-lg max-w-md w-full">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to Partner Advisor
            </h1>
            <p className="mb-8 text-gray-600">
              Please sign in or create an account to access your dashboard.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <LoginLink className="w-full sm:w-auto px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Login
              </LoginLink>
              <RegisterLink className="w-full sm:w-auto px-6 py-3 font-semibold text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
                Register
              </RegisterLink>
            </div>
          </div>
        </main>
    );
  }
