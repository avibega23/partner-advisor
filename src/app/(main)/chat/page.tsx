"use client";
import {
    Button,
    Logo,
    SideBar,
    sidebarProps,
    InputBar,
} from "@/app/components/ui";
import { IPartner } from "@/types/partner.types";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PartnerContext } from "@/hooks/usePartner";

const Page = () => {
    const [partnerId, setPartnerId] = useState<string>("");
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
            <div className="flex h-screen w-screen">
                <div>
                    <SideBar {...sideBarProps} />
                </div>
                <div className="flex h-full w-full flex-col gap-4 px-4">
                    <div className="flex justify-end gap-2.5 p-4">
                        <div className="p-4">
                            <Button
                                background="bg-black"
                                onClick={() => {}}
                                size="md"
                                text="SignOut"
                                variant="primary"
                            ></Button>
                        </div>
                    </div>

                    <div className="flex h-full w-full flex-col gap-4 px-8 py-4">
                        <div className="w-full flex-7 overflow-y-auto px-10 py-2">
                            {/* <MessagesList></MessagesList> */}
                        </div>
                        <div className="w-full flex-1 px-48 py-1 h-full">
                            <InputBar></InputBar>
                        </div>
                    </div>
                </div>
            </div>
        </PartnerContext.Provider>
    );
};
export default Page;
