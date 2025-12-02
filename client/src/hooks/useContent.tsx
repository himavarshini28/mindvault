import api from "../lib/api";
import { useCallback, useState } from "react";
import { useUI } from "../store/useUI";
import { useAsync } from "./useAsync";

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
    
    const { loading, run } = useAsync(); 

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

        run(async () => {
            const response = await api.get(`/api/v1/content`, {
                params: { type: normalized },
            });
            const items = (response.data.content || []) as Content[];
            const normalizedItems = items.map((c: Content) => ({
                ...c,
                type: c.type === 'link' || c.type === 'document' ? 'others' : c.type,
            }));
            setContents(normalizedItems);
        }).catch((error) => {
             console.error("Error fetching content:", error);
        });

    }, [selectedSection, run]);

  

    return { contents, refresh, loading };
}