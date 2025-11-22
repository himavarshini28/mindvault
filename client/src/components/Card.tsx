import { useEffect } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/DeleteIcon";

declare global {
    interface Window {
        twttr?: {
            widgets: {
                load: () => void;
            };
        };
    }
}

interface CardProps {
    title: string;
    link: string;
    type: "tweet" | "youtube" | "twitter" | "document" | "link";
    contentId?: string;
    onDelete?: (contentId: string) => void;
}

export function Card({ title, link, type, contentId, onDelete }: CardProps) {
    useEffect(() => {
        if (window.twttr?.widgets) {
            window.twttr.widgets.load();
        }
    }, [link]);

    const handleDelete = () => {
        if (contentId && onDelete) {
            if (confirm("Are you sure you want to delete this content?")) {
                onDelete(contentId);
            }
        }
    };

    return (
        <div>
            <div className="p-4 bg-[#0f1724] rounded-md border border-gray-800 max-w-72 min-h-48 min-w-72 text-white">
                <div className="flex justify-between">
                    <div className="flex items-center pb-1 text-md block w-48 truncate" title={title}>
                       
                        {title}
                    </div>
                    <div className="flex items-center gap-2">
                        <a href={link} target="_blank" className="text-gray-400 hover:text-gray-200 cursor-pointer">
                            <ShareIcon />
                        </a>
                        {onDelete && contentId && (
                            <button 
                                onClick={handleDelete}
                                className="text-gray-400 hover:text-red-400 cursor-pointer"
                                aria-label="Delete content"
                            >
                                <DeleteIcon />
                            </button>
                        )}
                    </div>
                </div>

                <div className=" bg-[#071029] rounded-md border border-gray-800 max-w-72 h-[150px] flex flex-col">
                    <div className=" flex-1 overflow-auto no-scrollbar text-gray-200">
                    {type === "youtube" && (
                        <iframe
                            className="w-full"
                            src={link
                                .replace("watch", "embed")
                                .replace("?v=", "/")}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}

                    {(type === "twitter" || type === "tweet") && (
                        <blockquote className="twitter-tweet">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    )}

                    {(type === "document" || type === "link") && (
                        <div className="text-blue-600 hover:text-blue-800">
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                View {type === "document" ? "Document" : "Link"} →
                            </a>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
}