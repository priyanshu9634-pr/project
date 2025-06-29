import express from 'express';
import MutationRequest from '../models/MutationRequest.js';

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const request = new MutationRequest(req.body);
        const savedRequest = await request.save();
        res.status(201).json(savedRequest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const requests = await MutationRequest.find()
            .populate('applicant')
            .populate('landRecord')
            .populate('supportingDocuments')
            .populate('assignedTo')
            .populate('updatedBy')
            .populate('history.updatedBy');
        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const request = await MutationRequest.findById(req.params.id)
            .populate('applicant')
            .populate('landRecord')
            .populate('supportingDocuments')
            .populate('assignedTo')
            .populate('updatedBy')
            .populate('history.updatedBy');
        if (!request) return res.status(404).json({ error: 'Request not found' });
        res.json(request);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/:id/status', async (req, res) => {
    try {
        const { status, updatedBy, comment } = req.body;
        const request = await MutationRequest.findById(req.params.id);
        if (!request) return res.status(404).json({ error: 'Request not found' });

        request.status = status;
        request.updatedBy = updatedBy;
        request.history.push({
            status,
            date: new Date(),
            updatedBy,
            comment
        });

        const updated = await request.save();
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
