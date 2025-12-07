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
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Page = () => {
    const [partnerId, setPartnerId] = useState<string>("");
    const [partners, setPartners] = useState<IPartner[]>([]);
    const [messages, setMessages] = useState<IMessage[]>([]);

    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "loading") return;
        if (status === "unauthenticated") router.push("/");
    }, [status]);

    const router = useRouter();

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
    };

    const [sideBarProps, setSideBarProps] = useState<sidebarProps>({
        logo: <Logo></Logo>,
        partners,
        parnerOnClick: (id: string) => {
            setPartnerId(id);
            // 2. UX IMPROVEMENT: Close sidebar automatically when a partner is clicked on mobile
            setIsMobileSidebarOpen(false);
        },
        partnerId,
    });

    const addPartner = (partner: IPartner) => {
        setPartners((prev) => [...prev, partner]);
        setPartnerId(partner._id);
        setIsMobileSidebarOpen(false); // Close sidebar after adding
    };

    // ... (Your existing useEffects remain unchanged) ...
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
        const uploadPartner = async () => {
            await axios.post("/api/partners", {
                clientData: partners[partners.length - 1],
            });
        };
        uploadPartner();
    }, [partners]);

    useEffect(() => {
        if (!partnerId) return;
        localStorage.setItem("partnerId", partnerId);

        const fn = async () => {
            const partner = partners.find((p) => p._id === partnerId);
            if (partner?.status === "new") {
                setMessages([
                    {
                        content:
                            "Hey I am Here to help with your partner. Should we start?",
                        role: "model",
                    },
                ]);
            }
        };
        const fetchMessages = async () => {
            const response = await axios.get(`/api/chat/${partnerId}`);
            setMessages([
                {
                    content:
                        "Hey I am Here to help with your partner. Should we start?",
                    role: "model",
                },
                ...response.data.messages,
            ]);
        };
        fetchMessages();
        fn();
        setSideBarProps((prev) => ({ ...prev, partnerId }));
    }, [partnerId]);

    return (
        <PartnerContext.Provider value={{ addPartner }}>
            <div className="flex h-screen w-full overflow-hidden bg-[#212121]">
                {isMobileSidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                        onClick={() => setIsMobileSidebarOpen(false)}
                    />
                )}

                <div
                    className={`h-full shrink-0 transition-transform duration-300 ease-in-out ${""} ${
                        isMobileSidebarOpen
                            ? "fixed inset-y-0 left-0 z-50 w-64 translate-x-0 shadow-2xl"
                            : "hidden -translate-x-full md:flex md:translate-x-0"
                    } `}
                >
                    <SideBar {...sideBarProps} />
                </div>

                <div className="relative flex h-full w-full flex-col">
                    <div className="flex w-full shrink-0 items-center justify-between p-2 md:justify-end md:p-4">
                        <button
                            onClick={() => setIsMobileSidebarOpen(true)}
                            className="rounded-md p-2 text-white hover:bg-[#303030] md:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>

                        <div className="flex">
                            <Button
                                onClick={() => {
                                    signOut();
                                }}
                                size="md"
                                text="SignOut"
                                variant="primary"
                            ></Button>
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-2 overflow-hidden px-2 pb-2 md:gap-4 md:px-12 md:pb-4 lg:px-24 2xl:px-48">
                        <div className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent w-full flex-1 overflow-y-auto">
                            <MessagesList messages={messages}></MessagesList>
                        </div>
                        <div className="w-full shrink-0 pt-2">
                            <InputBar inputHandler={inputHandler}></InputBar>
                        </div>
                    </div>
                </div>
            </div>
        </PartnerContext.Provider>
    );
};
export default Page;
