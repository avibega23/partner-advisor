"use client";
import PartnerSidebar from "@/app/components/PartnerSidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        console.log(status)
        
    });
    return (
        <>
            <div>
            </div>
        </>
    );
};

export default Page;
