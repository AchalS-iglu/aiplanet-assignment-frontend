import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "@/components/ui/sonner";
import "./index.css";
import { FileContextProvider } from "./lib/file-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <FileContextProvider>
            <App />
            <Toaster position="top-left" />
        </FileContextProvider>
    </React.StrictMode>
);
