import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { contentModel } from "../db.js";
import { generateEmbedding } from "../utils/embeddings.js";
import mongoose from "mongoose";

const contentRouter=express.Router();

contentRouter.post("/api/v1/content",authMiddleware,async(req,res)=>{
    const {link,type,title,tags,content}=req.body;
    //@ts-ignore
    const userId=req.userId;
    
    console.log("Content route - userId from req:", userId);
    console.log("Content route - body:", {link, type, title, tags, content});
    
    let embedding = undefined;
    if (content && content.trim()) {
        try {
            console.log("Generating embedding for content:", content.substring(0, 50) + "...");
            embedding = await generateEmbedding(content);
            console.log("Embedding generated successfully, length:", embedding?.length);
        } catch (embeddingError) {
            console.error("Embedding generation failed:", embeddingError);
        }
    } else {
        console.log("No content provided, skipping embedding generation");
    }
    
    try {
        if(!userId) {
            return res.status(401).json({message: "User ID not found in request"});
        }

        const typeMap: Record<string, string> = {
            twitter: 'twitter',
            tweet: 'tweet',
            youtube: 'youtube',
            video: 'youtube',
            linkedin: 'linkedin',
            link: 'link',
            document: 'document',
            others: 'others',
        };
        const incomingType = typeof type === 'string' ? type.toLowerCase().trim() : '';
        const normalizedType = typeMap[incomingType] ?? (incomingType || undefined);

        console.log("Creating content with data:", {link, type: normalizedType, title, tags, userId, hasEmbedding: !!embedding});
        const newContent = await contentModel.create({
            link,
            type: normalizedType,
            title,
            tags,
            userId,
            content: content || "",
            embedding,
        });
        console.log("Content created successfully:", newContent._id);
        return res.json({message: "Content created successfully", content: newContent});
    } catch (error) {
        console.error("Content creation error:", error);
        return res.status(500).json({message: "Error creating content", error: String(error)});
    }
})
    
    contentRouter.get("/api/v1/content",authMiddleware,async(req,res)=>{
        //@ts-ignore
        const userId=req.userId;
        const { type } = req.query;
        try {
            if(!userId) {
                return res.status(401).json({message: "User ID not found in request"});
            }

            const filter: any = {};
            try {
                filter.userId = new mongoose.Types.ObjectId(userId);
            } catch (e) {
                filter.userId = userId;
            }

            if (type && typeof type === 'string' && type.trim() && type !== 'all') {
                const t = type.toLowerCase().trim();
                const typeMap: Record<string, string> = {
                    tweet: 'tweet',
                    tweets: 'tweet',
                    twitter: 'tweet',
                    youtube: 'youtube',
                    video: 'youtube',
                    linkedin: 'linkedin',
                    link: 'link',
                    document: 'document',
                    others: 'others',
                };
                filter.type = typeMap[t] ?? t;
            }

            const content = await contentModel.find(filter).sort({ createdAt: -1 });
            return res.status(200).json({content});
        } catch(err) {
            console.error('Error fetching content:', err);
            return res.status(500).json({message: String(err)});
        }
    })
    contentRouter.get("/api/v1/content/search", authMiddleware, async (req, res) => {
        //@ts-ignore
        const userId = req.userId;
        const { query } = req.query;

        console.log("Search params - userId:", userId, "query:", query);

        if (!query || typeof query !== 'string') {
            console.log("Search query validation failed");
            return res.status(400).json({ message: "search query is required" });
        }

        try {
            console.log("Generating query embedding for:", query);
            const queryEmbedding = await generateEmbedding(query as string);
            console.log("Query embedding generated, is array:", Array.isArray(queryEmbedding), "length:", queryEmbedding.length);

            console.log("Performing vector search...");

            const userObjectId = new mongoose.Types.ObjectId(userId);
            console.log("Converted userId to ObjectId:", userObjectId);

            const results = await contentModel.aggregate([
                {
                    $vectorSearch: {
                        index: "vector_index",
                        path: "embedding",
                        queryVector: queryEmbedding,
                        numCandidates: 50,
                        limit: 10,
                    },
                },
                {
                    $addFields: {
                        score: { $meta: "vectorSearchScore" },
                    },
                },
                {
                    $match: {
                        userId: userObjectId,
                        score: { $gte: 0.75 },
                    },
                },
                {
                    $sort: { score: -1 },
                },
            ]);

            console.log("Search complete, found", results.length, "results");
            if (results.length > 0) {
                console.log("Top result score:", results[0].score);
                console.log("Lowest result score:", results[results.length - 1].score);
            }

            if (results.length === 0) {
                console.log("No results found. Checking without score filter...");
                const allResults = await contentModel.aggregate([
                    {
                        $vectorSearch: {
                            index: "vector_index",
                            path: "embedding",
                            queryVector: queryEmbedding,
                            numCandidates: 10,
                            limit: 10,
                        },
                    },
                    {
                        $addFields: {
                            score: { $meta: "vectorSearchScore" },
                        },
                    },
                    {
                        $match: {
                            userId: userObjectId,
                        },
                    },
                ]);
                console.log("Total results without score filter:", allResults.length);
                if (allResults.length > 0) {
                    console.log("Best score available:", allResults[0].score);
                }
            }

            return res.status(200).json({ content: results });
        } catch (err) {
            console.error("Search error:", err);
            return res.status(500).json({ message: "Error performing search", err });
        }
    });
export default contentRouter;