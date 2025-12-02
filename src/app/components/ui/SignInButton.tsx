"use client";

import { signIn } from "next-auth/react";
import { Button } from "./";

 function SignInButton() {
  return (
    <Button
      text="Get Started"
      onClick={()=>signIn()}
      variant={"primary"}
      size={'sm'}
    />
  );
}

export  {SignInButton}
