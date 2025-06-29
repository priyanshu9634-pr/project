
import express from "express";
import Document from "../models/Document.js"; // Ensure the path and name are correct

const router = express.Router();

router.post("/", async (req, res) => {
try {
    const doc = new Document(req.body);
    const savedDoc = await doc.save();
    res.status(201).json(savedDoc);
} catch (err) {
    res.status(400).json({ error: err.message });
}
});

export default router;

