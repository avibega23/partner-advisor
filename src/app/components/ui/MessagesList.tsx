"use client"
import { IMessage } from "@/types/message.types";
import { useState } from "react";

interface MessageListProps {
    messages: IMessage[];
}

const MessagesList = ({ messages }: MessageListProps) => {
    const [allMessages, setMessages] = useState<IMessage[]>(messages);
    return (
        <div className="h-full w-full">
            {allMessages.map((message) => {
                if (message.role === "user") {
                    return (
                        <div
                            key={message._id}
                            className="flex w-full items-center justify-end"
                        >
                            <Message content={message.content}></Message>
                        </div>
                    );
                } else {
                    return (
                        <div
                            key={message._id}
                            className="flex w-full items-center"
                        >
                            <Message content={message.content}></Message>
                        </div>
                    );
                }
            })}
        </div>
    );
};
export { MessagesList };

const Message = ({ content }: { content: string }) => {
    return <div className="p-6">{content}</div>;
};
