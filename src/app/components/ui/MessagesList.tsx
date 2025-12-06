"use client";
import { IMessage } from "@/types/message.types";
interface MessageListProps {
    messages: IMessage[];
}

const MessagesList = ({ messages }: MessageListProps) => {
    return (
        <div className="h-full w-full flex flex-col gap-4">
            {messages.map((message, index) => {
                if (message.role === "user") {
                    return (
                        <div
                            key={index}
                            className="flex w-full items-center justify-end"
                        >
                            <Message content={message.content} role="user"></Message>
                        </div>
                    );
                } else {
                    return (
                        <div key={index} className="flex w-full items-center">
                            <Message
                                content={message.content}
                                role={"model"}
                            ></Message>
                        </div>
                    );
                }
            })}
        </div>
    );
};
export { MessagesList };

const Message = ({ content, role }: { content: string; role?: string }) => {
    return (
        <div
            className={`p-4 ${
                role === "user" ? "rounded-xl bg-pallete-black" : ""
            } leading-relaxed`}
        >
            {content}
        </div>
    );
};
