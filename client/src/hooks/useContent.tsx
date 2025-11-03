import api from "../lib/api";
import { useEffect, useState } from "react";

interface Content {
    _id: string;
    link: string;
    type: "tweet" | "youtube" | "twitter";
    title: string;
    tags: string[];
    userId: string;
}

export function useContent() {
    const [contents, setContents] = useState<Content[]>([]);

    function refresh() {
        api.get(`/api/v1/content`)
            .then((response: { data: { content: Content[] } }) => {
                setContents(response.data.content);
            })
            .catch((error: unknown) => {
                console.error("Error fetching content:", error);
            });
    }

    useEffect(() => {
        refresh();

        const interval = setInterval(() => {
            refresh();
        }, 10 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return { contents, refresh };
}