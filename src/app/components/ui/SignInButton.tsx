"use client";

import { signIn } from "next-auth/react";
import { Button } from "./";

 function SignInButton() {
  return (
    <Button
      background="bg-black"
      size="md"
      text="SignIn"
      variant="primary"
      onClick={() => signIn()}
    />
  );
}

export  {SignInButton}
