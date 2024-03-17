import Message from "./message";
import MessagePrompt from "./messagePrompt";

function MessageWindow() {
    return (
        <div className="flex flex-col gap-16 px-32 py-12">
            <Message />
            <Message />
            <Message />
            <MessagePrompt />
        </div>
    );
}

export default MessageWindow;
