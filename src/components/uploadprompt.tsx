import { getImageUrl } from "@/lib/utils";
import { Button } from "./ui/button";
import { uploadPDF } from "@/lib/api-wrapper";
import { toast } from "sonner";
import { useContext } from "react";
import { FileContext } from "@/lib/file-context";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function UploadPrompt() {
    const { fileList, setSelectedFile } = useContext(FileContext);

    const handleClick = () => {
        toast.promise(
            new Promise((resolve, reject) => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = ".pdf";
                input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                        console.log(file);
                        uploadPDF(file)
                            .then((res) => {
                                resolve(res);
                                setSelectedFile(file.name);
                            })
                            .catch((err) => reject(err));
                    }
                };
                input.click();
            }),
            {
                loading: "Uploading...",
                success: "File uploaded!",
                error: "An error occurred",
            }
        );
    };
    return (
        <div className="flex flex-col w-full h-full items-center justify-center gap-2">
            <img
                className="object-contain w-96"
                src={getImageUrl("files-bro.svg")}
            />
            <a
                className="text-xs opacity-50"
                href="https://storyset.com/search">
                Search illustrations by{" "}
                <span className="underline">Storyset</span>
            </a>
            <Button className="text-2xl px-6 py-6" onClick={handleClick}>
                Start by uploading a file!
            </Button>
            {fileList.length > 0 && (
                <span>
                    <span>or{"  "}</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button>Select a File</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {fileList.map((file) => (
                                <DropdownMenuItem
                                    key={file}
                                    onClick={() => setSelectedFile(file)}>
                                    {file}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </span>
            )}
        </div>
    );
}

export default UploadPrompt;
