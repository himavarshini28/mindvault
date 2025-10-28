import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config.ts";
import axios from "axios";

const ContentType = {
    Youtube: "youtube",
    Twitter: "tweet"
} as const;

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
    const contentRef=useRef<HTMLTextAreaElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState<string>(ContentType.Youtube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const content=contentRef.current?.value;

        if (!title || !link) {
            alert("Please enter both title and link");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            
            if (!token) {
                alert("Please sign in first");
                return;
            }

            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                link,
                title,
                type,
                tags: [],
                content
            }, {
                headers: {
                    "authorization": token
                }
            });

            if (titleRef.current) titleRef.current.value = "";
            if (linkRef.current) linkRef.current.value = "";
            if(contentRef.current) contentRef.current.value="";
            onClose();
            alert("Content added successfully!");
        } catch (error: unknown) {
            console.error("Error adding content:", error);
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    alert("Authentication failed. Please sign in again.");
                } else {
                    alert(`Error: ${error.response?.data?.message || "Failed to add content"}`);
                }
            } else {
                alert("An unexpected error occurred");
            }
        }
    }

    return (
        <div>
            {open && (
                <div>
                    <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
                    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
                        <div className="flex flex-col justify-center">
                            <span className="bg-white opacity-100 p-4 rounded fixed">
                                <div className="flex justify-end">
                                    <div onClick={onClose} className="cursor-pointer">
                                        <CrossIcon />
                                    </div>
                                </div>
                                <div>
                                    <Input reference={titleRef} placeholder="Title" />
                                    <Input reference={linkRef} placeholder="Link" />
                                    <textarea
    ref={contentRef}
    placeholder="Paste the actual content (tweet text, article summary, etc.)"
    className="w-full border rounded p-2 min-h-[100px]"
/>
                                </div>
                                <div>
                                    <h1>Type</h1>
                                    <div className="flex gap-1 justify-center pb-2">
                                        <Button
                                            text="Youtube"
                                            variant={type === ContentType.Youtube ? "primary" : "secondary"}
                                            onClick={() => setType(ContentType.Youtube)}
                                        />
                                        <Button
                                            text="Twitter"
                                            variant={type === ContentType.Twitter ? "primary" : "secondary"}
                                            onClick={() => setType(ContentType.Twitter)}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <Button onClick={addContent} variant="primary" text="Submit" />
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}