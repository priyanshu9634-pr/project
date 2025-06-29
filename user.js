import express from "express";
//import User from " ../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
try {
    const user = new User(req.body);
    const saved = await user.save();
    res.status(201).json(saved);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

export default router;
