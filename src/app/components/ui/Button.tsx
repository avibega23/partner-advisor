import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    // Base styles:
    // 1. 'active:scale-[0.98] active:translate-y-[1px]' -> Makes it feel physical when clicked
    // 2. 'disabled:opacity-50' -> Good practice for disabled states
    "flex items-center justify-center transition-all duration-200 active:scale-[0.98] active:translate-y-[1px] cursor-pointer gap-2 disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            variant: {
                primary: [
                    "bg-pallete-6 text-white font-bold tracking-wide", 
                    "hover:brightness-90", 
                    "shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25),inset_0px_1px_0px_0px_rgba(255,255,255,0.3),inset_0px_-2px_0px_0px_rgba(0,0,0,0.3),inset_0px_0px_15px_0px_rgba(255,255,255,0.1)]",
                    "active:shadow-[inset_0px_3px_6px_0px_rgba(0,0,0,0.2)]" 
                ].join(" "),
            },
            size: {
                sm: "px-4 py-2 rounded-lg text-sm",
                md: "px-6 py-3 rounded-xl text-base", 
                lg: "px-8 py-4 rounded-xl text-lg",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "sm",
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    startIcon?: React.ReactNode;
    text: string;
}

export const Button = ({
    variant,
    size,
    className,
    startIcon,
    text,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        >
            {startIcon && <span>{startIcon}</span>}
            {text}
        </button>
    );
};