import { ReactElement, ComponentType } from "react";
import type { ButtonProps } from "./index";
import type { IPartner } from "@/types/partner.types";

export interface sidebarProps {
    logo: ReactElement;
    ButtonComponent: ComponentType<ButtonProps>;
    buttonProps: ButtonProps;
    partners: IPartner[] | undefined;
    parnerOnClick: (partnerId:string)=>void
}

const colorClasses = [
    "bg-random-1",
    "bg-random-2",
    "bg-random-3",
    "bg-random-4",
    "bg-random-5",
    "bg-random-6",
    "bg-random-7",
    "bg-random-8",
    "bg-random-9",
];

const getRandomColor = () => {
    return colorClasses[Math.floor(Math.random() * colorClasses.length)];
};

export const SideBar = ({
    logo,
    ButtonComponent,
    buttonProps,
    partners,
    parnerOnClick
}: sidebarProps) => {
    return (
        <div className="flex h-screen max-w-72 flex-col items-start gap-4 bg-pallete-black p-4">
            <div className="px-4 py-8 text-2xl">{logo}</div>
            <div className="w-full p-4">
                <ButtonComponent {...buttonProps}></ButtonComponent>
            </div>
            <div className="flex h-full w-full flex-col gap-2.5 p-4">
                {partners?.map((partner) => {
                    const formatName = (name: string): string =>
                        name.charAt(0).toUpperCase() + name.slice(1);

                    return (
                        <button
                            className="flex w-full gap-2.5 py-2 text-white transition-all duration-500 hover:text-gray-300 items-center"
                            onClick={()=>{parnerOnClick(partner._id)}}
                            key={partner._id}
                        >
                            <div
                                className={`${getRandomColor()} flex h-10 w-10 items-center justify-center rounded-full`}
                            >
                                {partner.name[0].toUpperCase()}
                            </div>
                            {formatName(partner.name)}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
