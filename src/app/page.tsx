"use client"
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

export default function Home() {
  return (
    <div>
      <button>
        <RegisterLink>Register</RegisterLink>
      </button>
    </div>
  );
}
