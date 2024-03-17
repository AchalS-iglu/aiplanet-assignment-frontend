import { Input } from "./ui/input";

function MessagePrompt() {
    return (
        <div>
            <Input
                className="text-sm px-6 py-6"
                placeholder="Send a message..."
            />
        </div>
    );
}

export default MessagePrompt;
