"use client";
import { ReactElement } from "react";
import type { ButtonProps } from "./index";
import type { IPartner } from "@/types/partner.types";
import { Button, NewPartnerDialog } from "./index";
import { useState } from "react";
import NewUser from "../icons/NewUser";

export interface sidebarProps {
    logo: ReactElement;
    partners: IPartner[] | undefined;
    parnerOnClick: (partnerId: string) => void;
    partnerId: string;
}

export const SideBar = ({
    logo,
    partners,
    parnerOnClick,
    partnerId,
}: sidebarProps) => {
    const [newPartnerDialog, setNewPartnerDialog] = useState<boolean>(false);
    const buttonProps: ButtonProps = {
        background: "bg-black",
        onClick: () => {
            setNewPartnerDialog((prev) => !prev);
        },
        size: "md",
        text: "New Partner",
        variant: "primary",
        startIcon: <NewUser></NewUser>,
    };
    return (
        <div className="flex h-screen min-w-72 flex-col items-start gap-4 bg-pallete-black p-4">
            <div className="px-4 py-8 text-2xl">{logo}</div>
            <div className="w-full p-4">
                <Button {...buttonProps}></Button>
            </div>
            {newPartnerDialog && (
                <div className="w-full p-4">
                    <NewPartnerDialog></NewPartnerDialog>
                </div>
            )}
            <div className="flex h-full w-full flex-col gap-2.5 overflow-x-hidden overflow-y-auto p-4">
                {partners
                    ?.filter((p) => p.name && p.name.length > 0) // 👈 Filter out partners with empty/missing names
                    .map((partner) => {
                        const formatName = (name: string): string =>
                            name?.charAt(0)?.toUpperCase() + name?.slice(1) ||
                            "";

                        return (
                            <button
                                className={`flex w-full ${partner._id === partnerId && "bg-black"} items-center gap-2.5 py-2 text-white transition-all duration-500 hover:text-gray-300`}
                                onClick={() => {
                                    parnerOnClick(partner._id);
                                }}
                                key={partner._id}
                            >
                                <div
                                    className={`${partner.profileColor} flex h-10 w-10 items-center justify-center rounded-full`}
                                >
                                    {partner.name?.[0]?.toUpperCase() || ""}
                                </div>
                                {formatName(partner.name)}
                            </button>
                        );
                    })}
            </div>
        </div>
    );
};
