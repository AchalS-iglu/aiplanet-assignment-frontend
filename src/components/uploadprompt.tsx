import { getImageUrl } from "@/lib/utils";
import { Button } from "./ui/button";
import { uploadPDF } from "@/lib/api";

function UploadPrompt() {
    const handleClick = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".pdf";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                console.log(file);
                uploadPDF(file);
            }
        };
        input.click();
    };
    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <img
                className="object-contain w-96"
                src={getImageUrl("files-bro.svg")}
            />
            <a
                className="text-xs opacity-50"
                href="https://storyset.com/search">
                Search illustrations by Storyset
            </a>
            <Button className="mt-8 text-2xl px-6 py-6" onClick={handleClick}>
                Start by uploading a file!
            </Button>
        </div>
    );
}

export default UploadPrompt;
