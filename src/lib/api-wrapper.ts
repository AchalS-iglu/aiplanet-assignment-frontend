// Get API URL from environment variable
export const API_URL = import.meta.env.API_URL || "http://localhost:8000";

export const uploadPDF = async (file: File) => {
    const formdata = new FormData();
    formdata.append("file", file, file.name);
    formdata.append("name", file.name);
    fetch(`${API_URL}/pdf/upload`, {
        method: "POST",
        body: formdata,
    }).then((res) => res.json()),
        {
            loading: "Uploading...",
            success: "File uploaded!",
            error: "Failed to upload file",
        };
};

export const getFilesList = async () => {
    const data = (await (await fetch(`${API_URL}/pdf/getlist`)).json()) as {
        files: string[];
    };
    if (data.files) {
        return data.files.map((file) => file.split("/").pop() || file);
    } else {
        throw new Error("Failed to fetch files list");
    }
};

export const askQuestion = async (msg: string, selectedFile: string) => {
    let ans: { answer: string } | null = null;
    await fetch(
        `${API_URL}/conversation/ask?question=${encodeURIComponent(
            msg
        )}&file=${selectedFile}`,
        {
            method: "POST",
        }
    ).then(async (res) => {
        ans = await res.json();
        console.log(ans);
    });
    // @ts-expect-error - Works
    if (!ans?.answer) {
        throw new Error(
            "Failed to obtain an answer, kindly try another question"
        );
        // @ts-expect-error - Works
    } else return ans.answer;
};
