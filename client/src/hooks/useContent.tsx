import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config.ts";

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
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        })
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