import { useEffect } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import LinkedinIcon from "../icons/LinkedinIcon";
import LinkIcon from "../icons/linkIcon";

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
    type: "tweet" | "youtube" | "twitter" | "document" | "link" | "linkedin" | "others";
    contentId?: string;
    onDelete?: (contentId: string) => void;
}

export function Card({ title, link, type, contentId, onDelete }: CardProps) {
    useEffect(() => {
        if (window.twttr?.widgets) {
            window.twttr.widgets.load();
        }
    }, [link]);

    const handleDelete = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (contentId && onDelete) {
            if (confirm("Are you sure you want to delete this content?")) {
                onDelete(contentId);
            }
        }
    };
    const normalizedType = type === "link" || type === "document" ? "others" : type;

    return (
        <div>
            <div className="p-4 bg-[#0f1724] rounded-md border border-gray-800 max-w-72 min-h-48 min-w-72 text-white relative">
                
                <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(link, "_blank", "noopener,noreferrer");
                        }}
                        className="text-gray-400 hover:text-gray-200 cursor-pointer"
                        aria-label="Open link"
                    >
                        <ShareIcon />
                    </button>
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

                
                <a href={link} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="flex items-center pb-1 text-md w-48 truncate px-1" title={title}>
                        {title}
                    </div>

                    <div className="bg-[#071029] rounded-md border border-gray-800 max-w-72 h-[150px] flex flex-col mt-2">
                        <div className="flex-1 overflow-auto no-scrollbar text-gray-200">
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

                    {(normalizedType === "twitter" || normalizedType === "tweet") && (
                        <blockquote className="twitter-tweet ">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    )}
                        {normalizedType === "others" && (
                            <div className="flex items-center justify-center h-full">
                                <div className=" rounded w-full h-full bg- flex items-center justify-center flex-col">
                                    <LinkIcon aria-label="Link icon" className="w-10 h-10 text-slate-400" />
                                     <div className="mt-2 text-xs text-gray-300 truncate max-w-full text-center">{title.trim()}</div>
                                </div>
                            </div>
                        )}
                    {normalizedType === "linkedin" && (
                            <div className="flex items-center justify-center h-full">
                                <div className=" rounded w-full h-full bg- flex items-center justify-center flex-col">
                                    <LinkedinIcon aria-label="LinkedIn logo" className="w-10 h-10 text-blue-600" />
                                     <div className="mt-2 text-xs text-gray-300 truncate max-w-full text-center">{title.trim()}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                </a>
            </div>
        </div>
    );
}