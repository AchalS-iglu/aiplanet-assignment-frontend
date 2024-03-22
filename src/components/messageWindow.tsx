import { useContext } from "react";
import UploadPrompt from "./uploadprompt";
import { FileContext } from "@/lib/file-context";
import Message from "./message";
import MessageInput from "./messageInput";

function MessageWindow() {
    const { selectedFile, messages } = useContext(FileContext);
    return (
        <div className="flex flex-grow flex-col gap-16 px-32 py-12">
            {selectedFile ? (
                <>
                    <div className="flex w-full h-full">
                        {messages.length > 0 ? (
                            <div className="flex w-full flex-col gap-4">
                                {messages
                                    .sort(
                                        (a, b) =>
                                            a.timestamp.getTime() -
                                            b.timestamp.getTime()
                                    )
                                    .map((msg) => (
                                        <Message
                                            key={msg.timestamp.getTime()}
                                            msg={msg}
                                        />
                                    ))}
                            </div>
                        ) : (
                            <div className="text-center text-2xl text-gray-400">
                                Start by sending a message
                            </div>
                        )}
                    </div>
                    <MessageInput />
                </>
            ) : (
                <UploadPrompt />
            )}
        </div>
    );
}

export default MessageWindow;
