// routes/chatbotInteractionRoutes.js
import express from 'express';
import ChatbotInteraction from '../models/ChatbotInteraction.js';

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const interaction = new ChatbotInteraction(req.body);
        const saved = await interaction.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const interactions = await ChatbotInteraction.find().populate('user');
        res.json(interactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const interaction = await ChatbotInteraction.findById(req.params.id).populate('user');
        if (!interaction) return res.status(404).json({ error: 'Not found' });
        res.json(interaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const result = await ChatbotInteraction.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
