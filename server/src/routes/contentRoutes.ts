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
    
    
    
    let embedding = undefined;
    if (content && content.trim()) {
            try {
                embedding = await generateEmbedding(content);
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
            link: 'others',
            document: 'others',
            others: 'others',
        };
        const incomingType = typeof type === 'string' ? type.toLowerCase().trim() : '';
        const normalizedType = typeMap[incomingType] ?? (incomingType || undefined);

        
        const newContent = await contentModel.create({
            link,
            type: normalizedType,
            title,
            tags,
            userId,
            content: content || "",
            embedding,
        });
        
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
                if (t === 'others' || t === 'link' || t === 'document') {
                    filter.type = { $in: ['others', 'link', 'document'] };
                } else {
                    const typeMap: Record<string, string> = {
                        tweet: 'tweet',
                        tweets: 'tweet',
                        twitter: 'tweet',
                        youtube: 'youtube',
                        video: 'youtube',
                        linkedin: 'linkedin',
                    };
                    filter.type = typeMap[t] ?? t;
                }
            }

            const contentDocs = await contentModel.find(filter).sort({ createdAt: -1 }).lean();
            const normalized = contentDocs.map((c: any) => ({
                ...c,
                type: c.type === 'link' || c.type === 'document' ? 'others' : c.type,
            }));

            return res.status(200).json({ content: normalized });
        } catch(err) {
            console.error('Error fetching content:', err);
            return res.status(500).json({message: String(err)});
        }
    })
    contentRouter.get("/api/v1/content/search", authMiddleware, async (req, res) => {
        //@ts-ignore
        const userId = req.userId;
        const { query } = req.query;


        if (!query || typeof query !== 'string') {
            return res.status(400).json({ message: "search query is required" });
        }

        try {
            const queryEmbedding = await generateEmbedding(query as string);
            const userObjectId = new mongoose.Types.ObjectId(userId);

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

            

            if (results.length === 0) {
                
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
                
            }

            return res.status(200).json({ content: results });
        } catch (err) {
            console.error("Search error:", err);
            return res.status(500).json({ message: "Error performing search", err });
        }
    });
    contentRouter.delete("/api/v1/content", authMiddleware, async (req, res) => {
        //@ts-ignore
        const userId = req.userId;
        const { contentId } = req.body;

        if (!contentId) {
            return res.status(400).json({ message: "contentId is required" });
        }

        try {
            let idFilter: any = contentId;
            try {
                idFilter = new mongoose.Types.ObjectId(contentId);
            } catch (e) {
            }

            const content = await contentModel.findOne({ _id: idFilter });
            if (!content) {
                return res.status(404).json({ message: "Content not found" });
            }

            if (String(content.userId) !== String(userId)) {
                return res.status(403).json({ message: "Not authorized to delete this content" });
            }

            await contentModel.deleteOne({ _id: content._id });
            return res.status(200).json({ message: "Content deleted" });
        } catch (err) {
            console.error("Error deleting content:", err);
            return res.status(500).json({ message: "Error deleting content", err: String(err) });
        }
    });
export default contentRouter;