import { useContext, useEffect } from "react";
import "./App.css";
import MessageWindow from "./components/messageWindow";
import NavBar from "./components/navbar";
import { getFilesList } from "./lib/api-wrapper";
import { toast } from "sonner";
import { FileContext } from "./lib/file-context";

function App() {
    const { setFileList } = useContext(FileContext);

    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            <MessageWindow />
        </div>
    );
}

export default App;
