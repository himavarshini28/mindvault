import api from "../lib/api";
import { useCallback, useEffect, useState } from "react";
import { useUI } from "../store/useUI";

interface Content {
    _id: string;
    link: string;
    type: "linkedin" | "youtube" | "twitter" | "document" | "link" | "others";
    title: string;
    tags: string[];
    userId: string;
}

export function useContent() {
    const [contents, setContents] = useState<Content[]>([]);
    const selectedSection = useUI((s) => s.selectedSection);

    const refresh = useCallback(() => {
        
        const selection = selectedSection ? selectedSection.toString() : "";
        const sel = selection.toLowerCase();
        const typeMap: Record<string, string> = {
            twitter: "tweet",
            tweets: "tweet",
            youtube: "youtube",
            linkedin: "linkedin",
            link: "others",
            document: "others",
        };

        const normalized = typeMap[sel] ?? (sel && sel !== "all" ? sel : undefined);

        api
            .get(`/api/v1/content`, {
                params: { type: normalized },
            })
            .then((response: { data: { content: Content[] } }) => {
                const items = (response.data.content || []) as Content[];
                const normalizedItems = items.map((c: Content) => ({
                    ...c,
                    type: c.type === 'link' || c.type === 'document' ? 'others' : c.type,
                }));
                setContents(normalizedItems);
            })
            .catch((error: unknown) => {
                console.error("Error fetching content:", error);
            });
    }, [selectedSection]);

    useEffect(() => {
        refresh();

        const interval = setInterval(() => {
            refresh();
        }, 10 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, [refresh]);

    return { contents, refresh };
}