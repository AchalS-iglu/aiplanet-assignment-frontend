import { useContext, useState } from "react";
import { Input } from "./ui/input";
import { FileContext } from "@/lib/file-context";
import { ArrowRightCircle } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

function MessageInput() {
    const { sendMessage } = useContext(FileContext);
    const [input, setInput] = useState<string>("");
    return (
        <span className="flex">
            <Input
                className="text-sm px-6 py-6 h-12 input"
                placeholder="Send a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <Button
                className="px-6 py-6 h-12"
                onClick={() => {
                    if (input.length > 0) {
                        sendMessage(input);
                        setInput("");
                    } else {
                        toast.warning("Please enter a message");
                    }
                }}>
                <ArrowRightCircle />
            </Button>
        </span>
    );
}

export default MessageInput;
