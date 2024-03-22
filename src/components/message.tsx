import { AgentTypes, T_Message } from "@/lib/file-context";
import { getImageUrl } from "@/lib/utils";

function Message({ msg }: { msg: T_Message }) {
    return (
        <div
            className={`flex flex-row gap-8 ${
                msg.sentBy == AgentTypes.User
                    ? "flex-row-reverse"
                    : "justify-start"
            }`}>
            <div className="rounded-full w-12 h-12">
                {msg.sentBy == AgentTypes.User ? (
                    <img
                        className="rounded-full w-12 h-12 object-fill"
                        src="https://picsum.photos/200"
                    />
                ) : (
                    <img
                        className="w-12 h-12 object-fill"
                        src={getImageUrl("ai-planet-logo-only.svg")}
                    />
                )}
            </div>
            <div>{msg.content}</div>
        </div>
    );
}

export default Message;
