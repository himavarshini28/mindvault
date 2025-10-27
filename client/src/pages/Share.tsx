import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Card } from "../components/Card";

interface SharedContent {
    _id: string;
    link: string;
    type: "tweet" | "youtube" | "twitter" | "document" | "link";
    title: string;
}

export function Share() {
    const { shareId } = useParams<{ shareId: string }>();
    const [contents, setContents] = useState<SharedContent[]>([]);
    const [username, setUsername] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchSharedContent() {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareId}`);
                setContents(response.data.content);
                setUsername(response.data.username);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching shared content:", err);
                setError("Failed to load shared content. The link may be invalid or expired.");
                setLoading(false);
            }
        }

        if (shareId) {
            fetchSharedContent();
        }
    }, [shareId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    {username}'s Brain
                </h1>
                <p className="text-gray-600 mt-2">
                    Shared collection of {contents.length} item{contents.length !== 1 ? 's' : ''}
                </p>
            </div>

            <div className="max-w-7xl mx-auto">
                {contents.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                        No content shared yet.
                    </div>
                ) : (
                    <div className="flex gap-4 flex-wrap">
                        {contents.map((content) => (
                            <Card
                                key={content._id}
                                type={content.type}
                                link={content.link}
                                title={content.title}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
