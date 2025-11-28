"use client";
import {
    Button,
    Logo,
    SideBar,
    sidebarProps,
    InputBar,
    MessagesList,
} from "@/app/components/ui";
import { IPartner } from "@/types/partner.types";
import { signOut } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { PartnerContext } from "@/hooks/usePartner";
import { IMessage } from "@/types/message.types";

const Page = () => {
    const [partnerId, setPartnerId] = useState<string>("");
    const [partners, setPartners] = useState<IPartner[]>([]);
    const [messages, setMessages] = useState<IMessage[]>([]);

    const inputHandler = async (input: string) => {
        setMessages((prev) => [
            ...prev,
            {
                _id: "temp-" + crypto.randomUUID(),
                content: input,
                role: "user",
            },
        ]);
        await axios.post(`/api/chat/${partnerId}`, { message: input });

        const response = await axios.get(`/api/chat/${partnerId}`);
        setMessages(response.data.messages);

        console.log(response.data.messages);
    };

    const [sideBarProps, setSideBarProps] = useState<sidebarProps>({
        logo: <Logo></Logo>,
        partners,
        parnerOnClick: (id: string) => {
            setPartnerId(id);
        },
        partnerId,
    });

    const addPartner = (partner: IPartner) => {
        setPartners((prev) => [...prev, partner]);
        setPartnerId(partner._id);
    };

    useEffect(() => {
        const id: string = localStorage.getItem("partnerId") ?? "";

        const fetchPartners = async (): Promise<void> => {
            const response = await axios.get("/api/partners/");
            setPartners(response.data.partners);
        };
        fetchPartners();

        if (id !== "") {
            setPartnerId(id);
        }
    }, []);

    useEffect(() => {
        setSideBarProps((prev) => ({ ...prev, partners }));
        const uploadPartner = async ()=>{
            await axios.post('/api/partners',{clientData : partners[partners.length-1]})
        }
        uploadPartner();
    }, [partners]);

    useEffect(() => {
        if (!partnerId) return;

        localStorage.setItem("partnerId", partnerId);

        const fn = async () => {
            const partner = partners.find((p) => p._id === partnerId);

            if (partner?.status === "new") {
                await axios.post(`/api/chat/${partnerId}`, {
                    message: "nothing-yet",
                });
            }
        };
        fn()
        const fetchMessages = async () => {
            const response = await axios.get(`/api/chat/${partnerId}`);
            setMessages(response.data.messages);
            console.log(messages);
        };
        fetchMessages()

        setSideBarProps((prev) => ({ ...prev, partnerId }));
    }, [partnerId]);

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
                                onClick={() => {
                                    signOut();
                                }}
                                size="md"
                                text="SignOut"
                                variant="primary"
                            ></Button>
                        </div>
                    </div>

                    <div className="flex h-full w-full flex-col gap-4 px-8 py-4">
                        <div className="w-full flex-7 overflow-y-auto px-48 py-1">
                            <MessagesList messages={messages}></MessagesList>
                        </div>
                        <div className="h-full w-full flex-1 px-48 py-1">
                            <InputBar inputHandler={inputHandler}></InputBar>
                        </div>
                    </div>
                </div>
            </div>
        </PartnerContext.Provider>
    );
};
export default Page;
