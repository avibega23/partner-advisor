"use client";
import { useState } from "react";
import { Send } from "lucide-react";

interface inputBarProps {
    inputHandler: (text: string) => void;
}
const InputBar = ({ inputHandler }: inputBarProps) => {
    const [text, setText] = useState<string>("");
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("text");
        e.preventDefault();
        inputHandler(text);
        setText("");
    };
    return (
        <div className="flex h-full w-full items-center">
            <form className="relative w-full" onSubmit={onSubmitHandler}>
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={text}
                        placeholder="Type your message..."
                        onChange={(e) => setText(e.target.value)}
                        className="w-full rounded-xl bg-pallete-black p-6 pr-14 text-white placeholder-gray-100 transition outline-none focus:ring-2 focus:ring-pallete-6"
                    />

                    <button
                        type="submit"
                        className="absolute right-2 rounded-2xl bg-pallete-6 p-3 transition hover:bg-pallete-5 active:scale-95"
                    >
                        <Send></Send>
                    </button>
                </div>
            </form>
        </div>
    );
};

export { InputBar };
