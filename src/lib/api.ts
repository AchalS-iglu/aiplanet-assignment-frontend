import { toast } from "sonner";

// Get API URL from environment variable
export const API_URL = import.meta.env.API_URL || "http://localhost:8000";

export const uploadPDF = async (file: File) => {
    const formdata = new FormData();
    formdata.append("file", file, file.name);
    formdata.append("name", file.name);
    toast.promise(
        fetch(`${API_URL}/pdf/upload`, {
            method: "POST",
            body: formdata,
        }).then((res) => res.json()),
        {
            loading: "Uploading...",
            success: "File uploaded!",
            error: "Failed to upload file",
        }
    );
};
