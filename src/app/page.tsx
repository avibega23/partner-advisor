"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession,signIn } from "next-auth/react";

const Page = () => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState<
        "authenticated" | "unauthenticated" | "loading"
    >("loading");
    const {status} = useSession();
    useEffect(()=>{
        setAuthenticated(status);
        if(status === 'authenticated')
        {
            router.push('/chat')
        }
    },[status])

    if(authenticated === 'loading')
    {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-screen">
                <div>Loading....</div>
            </div>            
        );
    }
    if(authenticated === 'unauthenticated')
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen gap-2.5">
            <div>Welcome To This Shitty Partner Advisor</div>
            <div>
                <button onClick={()=>{signIn()}}>SignIn</button>
            </div>
            <div>{`${authenticated.toUpperCase()}`}</div>
        </div>
    );
};
export default Page;
