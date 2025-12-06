"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/app/components/ui";
import NewUser from "@/app/components/icons/NewUser";
import { Google } from "@/app/components/icons/Google";

export default function SignIn() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black">
            <Button text="Continue With Google" variant={"primary"} onClick={()=>{signIn("google",{callbackUrl:"/"})}} size={"md"} startIcon={<Google></Google>}></Button>
        </div>
    );
}
