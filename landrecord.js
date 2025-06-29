
import express from 'express';
import LandRecord from '../models/landRecord.js';

const router = express.Router();


router.post('/', async (req, res) => {
try {
    const newRecord = new LandRecord(req.body);
    const saved = await newRecord.save();
    res.status(201).json(saved);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

export default router;

