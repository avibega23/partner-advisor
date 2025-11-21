"use client";
import { useEffect, useState } from "react";
import { SideBar, sidebarProps, Button, Logo } from "./components/ui/";
import axios from "axios";
import { IPartner } from "@/types/partner.types";
import { NewUserIcon } from "./components/icons";

const partnerOnClickHandler = (partnerId: string) => {
    //todo have to do
};



const Page = () => {
    const [partners, setPartners] = useState<IPartner[] | undefined>(undefined);
    useEffect(() => {
        const fetchPartners = async () => {
            axios.get("/api/partners").then((response) => {
                setPartners(response.data.data);
                console.log(response);
            });
        };

        fetchPartners();
    }, []);
    const sideBarLocalProps: sidebarProps = {
        partners: partners,
        ButtonComponent: Button,
        buttonProps: {
            background: "bg-pallete-secondary",
            onClick: () => {},
            size: "md",
            text: "New Partner",
            variant: "primary",
            startIcon: <NewUserIcon></NewUserIcon>
        },
        logo: <Logo></Logo>,
        parnerOnClick: partnerOnClickHandler,
    };
    return <SideBar {...sideBarLocalProps}></SideBar>;
};

export default Page;
