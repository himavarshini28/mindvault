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
            <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border min-h-48 min-w-72">
                <div className="flex justify-between">
                    <div className="flex items-center text-md">
                       
                        {title}
                    </div>
                    <div className="flex items-center gap-2">
                        <a href={link} target="_blank" className="text-gray-500 hover:text-gray-700 cursor-pointer">
                            <ShareIcon />
                        </a>
                        {onDelete && contentId && (
                            <button 
                                onClick={handleDelete}
                                className="text-gray-500 hover:text-red-600 cursor-pointer"
                                aria-label="Delete content"
                            >
                                <DeleteIcon />
                            </button>
                        )}
                    </div>
                </div>

                <div className=" bg-white rounded-md border-gray-200 max-w-72 h-[170px] flex flex-col">
                    <div className="pt-4 flex-1 overflow-auto no-scrollbar">
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