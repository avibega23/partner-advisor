import { ReactElement } from "react";

interface ButtonProps {
    text: string;
    variant:string
    background: string;
    startIcon?: ReactElement;
    size: "sm" | "md" | "lg";
}

const sizeStyles = {
    sm: "p-2 rounded-sm",
    md: "p-4 rounded-md",
    lg: "p-6 rounded-lg",
};
const defaultStyles = "flex text-white font";
export const Button = (props: ButtonProps) => {
    return (
        <div className={`${sizeStyles[props.size]} ${defaultStyles} ${props.background}`}>
            {props?.startIcon}
            {props.text}
        </div>
    );
};
