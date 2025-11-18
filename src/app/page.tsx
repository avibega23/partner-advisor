"use client";

import React from "react";
import { useSession, signIn,signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    return (
      <div>
        <p>Signed in as {session.user.email}</p>
        <img src={session.user.image} alt="Profile" style={{borderRadius: '50px'}} />
        <button onClick={() => signOut()}>Sign out</button>
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
          <button onClick={() => signIn('google')}>Sign in with Google</button>
        </div>
      </div>
    </main>
  );
}



