"use client"
import { IMessage } from "@/types/message.types";
interface MessageListProps {
    messages: IMessage[];
}

const MessagesList = ({ messages }: MessageListProps) => {
    return (
        <div className="h-full w-full">
            {messages.map((message,index) => {
                if (message.role === "user") {
                    return (
                        <div
                            key={index}
                            className="flex w-full items-center justify-end"
                        >
                            <Message content={message.content}></Message>
                        </div>
                    );
                } else {
                    return (
                        <div
                            key={index}
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
