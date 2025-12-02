"use client";

import { signIn } from "next-auth/react";
import { Button } from "./";
  interface SingInProps{
    size : "sm"|"md"|"lg"
  }
 function SignInButton({size}:SingInProps) {
  return (
    <Button
      text="Get Started"
      onClick={()=>signIn()}
      variant={"primary"}
      size={size}
    />
  );
}

export  {SignInButton}
