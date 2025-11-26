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
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PartnerContext } from "@/hooks/usePartner";
import { IMessage } from "@/types/message.types";

const Page = () => {
    const [partnerId, setPartnerId] = useState<string>("");
    const [partners, setPartners] = useState<IPartner[]>([]);
    const [messages,setMessages] = useState<IMessage[]>([]);


    const inputHandler = (input : string)=>{
        axios.post('/api/chat',{
            partnerId,
            message: input
        }).then((response)=>{
            setMessages((message)=>[...message,response.data.data])
        })
    }

    useEffect(()=>{
        axios.get('/api/chat').then((response)=>{
            setMessages(response.data.data);

            if(messages.length === 0)
            {
                inputHandler("");
            }
        })

    },[partnerId])
    const [sideBarProps, setSideBarProps] = useState<sidebarProps>({
        logo: <Logo></Logo>,
        partners,
        parnerOnClick: (id:string) => {setPartnerId(id)},
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
                        <div className="w-full flex-7 overflow-y-auto px-48 py-1">
                            <MessagesList messages={messages}></MessagesList>
                        </div>
                        <div className="h-full w-full flex-1 px-48 py-1">
                            <InputBar></InputBar>
                        </div>
                    </div>
                </div>
            </div>
        </PartnerContext.Provider>
    );
};
export default Page;
