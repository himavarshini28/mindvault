import api from "../lib/api";
import { useCallback, useEffect, useState } from "react";
import { useUI } from "../store/useUI";

interface Content {
    _id: string;
    link: string;
    type: "linkedin" | "youtube" | "twitter" | "others";
    title: string;
    tags: string[];
    userId: string;
}

export function useContent() {
    const [contents, setContents] = useState<Content[]>([]);
    // Subscribe to selectedSection using selector to avoid unnecessary re-renders
    const selectedSection = useUI((s) => s.selectedSection);

    const refresh = useCallback(() => {
        // normalize UI selection to backend type values
        const selection = selectedSection ? selectedSection.toString() : "";
        const sel = selection.toLowerCase();
        const typeMap: Record<string, string> = {
            twitter: "tweet",
            tweets: "tweet",
            youtube: "youtube",
            linkedin: "linkedin",
        };

        const normalized = typeMap[sel] ?? (sel && sel !== "all" ? sel : undefined);

        api
            .get(`/api/v1/content`, {
                params: {
                    // send `type` only when a specific section (not 'all') is selected
                    type: normalized,
                },
            })
            .then((response: { data: { content: Content[] } }) => {
                setContents(response.data.content || []);
            })
            .catch((error: unknown) => {
                console.error("Error fetching content:", error);
            });
    }, [selectedSection]);

    useEffect(() => {
        // immediate load when selectedSection changes (or on mount)
        refresh();

        // polling (keeps refreshing every 10s)
        const interval = setInterval(() => {
            refresh();
        }, 10 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, [refresh]);

    return { contents, refresh };
}