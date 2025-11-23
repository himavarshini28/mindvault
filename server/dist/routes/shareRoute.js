import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { contentModel, linkModel, userModel } from "../db.js";
import { random } from "../utils.js";
const shareRoute = Router();
shareRoute.post('/api/v1/share/brain', authMiddleware, async (req, res) => {
    const { share } = req.body;
    if (share) {
        const existingLink = await linkModel.findOne({
            //@ts-ignore
            userId: req.userId
        });
        if (existingLink) {
            res.json({ hash: existingLink.hash });
            return;
        }
        const hash = random(10);
        //@ts-ignore
        await linkModel.create({ userId: req.userId, hash });
        res.json({ hash });
    }
    else {
        //@ts-ignore
        await linkModel.deleteOne({ userId: req.userId });
        res.json({ message: "Removed link" });
    }
});
shareRoute.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await linkModel.findOne({ hash });
    if (!link) {
        res.status(404).json({ message: "Invalid share link" });
        return;
    }
    const content = await contentModel.find({ userId: link.userId });
    const user = await userModel.findOne({ _id: link.userId });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.json({
        username: user.username,
        content
    });
});
export default shareRoute;
//# sourceMappingURL=shareRoute.js.map