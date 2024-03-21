import UploadPrompt from "./uploadprompt";

function MessageWindow() {
    return (
        <div className="flex flex-grow flex-col gap-16 px-32 py-12">
            {/* <Message />
            <Message />
            <Message />
            <MessagePrompt /> */}
            <UploadPrompt />
        </div>
    );
}

export default MessageWindow;
