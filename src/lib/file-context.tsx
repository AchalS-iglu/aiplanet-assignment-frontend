import {
    FC,
    ReactNode,
    createContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import { askQuestion, getFilesList } from "./api-wrapper";
import { toast } from "sonner";

export type T_Message = {
    sentBy: AgentTypes;
    content: string;
    timestamp: Date;
};

export enum AgentTypes {
    User,
    Model,
}

enum MessagesActionTypes {
    AddMessage,
    ClearMessages,
}

const messagesReducer = (
    state: Array<T_Message>,
    action: {
        type: MessagesActionTypes;
        payload: T_Message;
    }
) => {
    switch (action.type) {
        case MessagesActionTypes.AddMessage:
            return [...state, action.payload];
        case MessagesActionTypes.ClearMessages:
            return [];
        default:
            return state;
    }
};

interface FileContextProps {
    fileList: string[];
    selectedFile: string | null;
    setFileList: (files: string[]) => void;
    setSelectedFile: (file: string) => void;
    clearSelectedFile: () => void;
    messages: Array<T_Message>;
    messagesDispatch: React.Dispatch<{
        type: MessagesActionTypes;
        payload: T_Message;
    }>;
    sendMessage: (msg: string) => void;
}

const initialFileContext: FileContextProps = {
    fileList: [],
    selectedFile: null,
    setFileList: () => {},
    setSelectedFile: () => {},
    clearSelectedFile: () => {},
    messages: [],
    messagesDispatch: () => {},
    sendMessage: () => {},
};

export const FileContext = createContext<FileContextProps>(initialFileContext);

export const FileContextProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [fileList, _setFileList] = useState<string[]>(
        initialFileContext.fileList
    );
    const [selectedFile, _setSelectedFile] = useState<string | null>(
        initialFileContext.selectedFile
    );

    const [messages, messagesDispatch] = useReducer(
        messagesReducer,
        initialFileContext.messages
    );

    const setFileList = (files: string[]) => {
        _setFileList(files);
    };

    const setSelectedFile = (file: string) => {
        _setSelectedFile(file);
    };

    const clearSelectedFile = () => {
        _setSelectedFile(null);
    };

    useEffect(() => {
        getFilesList().then((data) => {
            setFileList(data);
        }),
            {
                loading: "Fetching files...",
                success: "Files fetched!",
                error: "Failed to fetch files",
            };
    }, []);

    console.log(fileList);

    const sendMessage = (msg: string) => {
        toast.promise(
            new Promise((resolve, reject) => {
                askQuestion(msg, selectedFile || "")
                    .then((res) => {
                        if (!res) {
                            reject(
                                "Failed to obtain an answer, kindly try another question"
                            );
                        }
                        messagesDispatch({
                            type: MessagesActionTypes.AddMessage,
                            payload: {
                                sentBy: AgentTypes.User,
                                content: msg,
                                timestamp: new Date(),
                            },
                        });
                        messagesDispatch({
                            type: MessagesActionTypes.AddMessage,
                            payload: {
                                sentBy: AgentTypes.Model,
                                content: res,
                                timestamp: new Date(),
                            },
                        });
                        resolve(res);
                    })
                    .catch((err) => reject(err));
            }),
            {
                loading: "Sending message...",
                success: "Message sent!",
                error: "Failed to send message",
            }
        );
    };

    return (
        <FileContext.Provider
            value={{
                fileList,
                selectedFile,
                setFileList,
                setSelectedFile,
                clearSelectedFile,
                messages,
                messagesDispatch,
                sendMessage,
            }}>
            {children}
        </FileContext.Provider>
    );
};
