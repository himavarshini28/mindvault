import { useEffect } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import LinkedinIcon from "../icons/LinkedinIcon";

declare global {
    interface Window {
        twitter?: {
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
    // Ensure twitter widgets script is present and load widgets when link changes
    useEffect(() => {
        type TwttrWindow = { twttr?: { widgets?: { load: () => void } } };
        const ensureTwitterScript = (): Promise<void> => {
            return new Promise((resolve) => {
                const w = window as unknown as TwttrWindow;
                if (w.twttr && w.twttr.widgets) return resolve();
                const existing = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
                if (existing) {
                    // wait a tick for it to initialize
                    setTimeout(() => resolve(), 300);
                    return;
                }
                const s = document.createElement('script');
                s.src = 'https://platform.twitter.com/widgets.js';
                s.async = true;
                s.charset = 'utf-8';
                s.onload = () => setTimeout(() => resolve(), 200);
                document.body.appendChild(s);
            });
        };

        if (type === 'twitter' || type === 'tweet') {
            ensureTwitterScript().then(() => {
                try {
                    const w = window as unknown as TwttrWindow;
                    //@ts-ignore
                    w.twttr?.widgets.load();
                } catch {
                    // silently ignore
                }
            });
        }
    }, [link, type]);

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
                    <div className="flex items-center pb-1 text-md w-48 truncate" title={title}>
                       
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

                    {type === "linkedin" && (
                        <div className="flex items-center justify-center h-full">
                            <div className="w-16 h-16 rounded bg-white/5 flex items-center justify-center">
                                <LinkedinIcon className="w-8 h-8 text-indigo-500" />
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
}