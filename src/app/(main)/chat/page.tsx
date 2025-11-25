"use client";
import { Logo, SideBar, sidebarProps } from "@/app/components/ui";
import { IPartner } from "@/types/partner.types";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PartnerContext } from "@/hooks/usePartner";

const Page = () => {
    const [partnerId,setPartnerId] = useState<string>("");
    const [partners, setPartners] = useState<IPartner[]>([]);


    const [sideBarProps, setSideBarProps] = useState<sidebarProps>({
        logo: <Logo></Logo>,
        partners,
        parnerOnClick: () => {},
    });

    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        axios.get("/api/partners").then((response) => {
            console.log(response);
            setPartners(response.data.data);
        });
    }, []);

    useEffect(() => {
        setSideBarProps((prev) => ({
            ...prev,
            partners,
        }));
    }, [partners]);

    useEffect(() => {
        if (status == "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    const addPartner = (partner: IPartner) => {
        setPartners((prev) => [...prev, partner]);
        setPartnerId(partner._id);
    };

    return (
        <PartnerContext.Provider value={{ addPartner }}>
            <div>
                <SideBar {...sideBarProps} />
            </div>
        </PartnerContext.Provider>
    );
};
export default Page;
