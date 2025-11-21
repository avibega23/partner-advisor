import { ReactElement } from "react";

export interface ButtonProps {
    text: string;
    variant: string;
    background: string;
    startIcon?: ReactElement;
    size: "sm" | "md" | "lg";
    onClick: () => void;
}

const sizeStyles = {
    sm: "p-2 rounded-sm",
    md: "p-4 rounded-md",
    lg: "p-6 rounded-lg",
};
const defaultStyles = "flex text-white font w-full gap-2.5";
export const Button = (props: ButtonProps) => {
    return (
        <button
            onClick={props.onClick}
            className={`${sizeStyles[props.size]} ${defaultStyles} ${props.background}`}
        >
            {props?.startIcon}
            {props.text}
        </button>
    );
};
