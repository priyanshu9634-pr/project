import express from 'express';
import AuditLog from '../models/auditLog.js'; // adjust if path is different

const router = express.Router();

// Create an audit log
router.post('/', async (req, res) => {
    try {
        const auditLog = new AuditLog(req.body);
        const savedLog = await auditLog.save();
        res.status(201).json(savedLog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all audit logs (with optional filters)
router.get('/', async (req, res) => {
    try {
        const filters = {};
        if (req.query.actionType) filters.actionType = req.query.actionType;
        if (req.query.entityType) filters.entityType = req.query.entityType;
        if (req.query.actionBy) filters.actionBy = req.query.actionBy;

        const logs = await AuditLog.find(filters)
            .populate('actionBy', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single audit log by ID
router.get('/:id', async (req, res) => {
    try {
        const log = await AuditLog.findById(req.params.id)
            .populate('actionBy', 'name email');
        if (!log) {
            return res.status(404).json({ error: 'Audit log not found' });
        }
        res.status(200).json(log);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an audit log (optional – for admins)
router.delete('/:id', async (req, res) => {
    try {
        const result = await AuditLog.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ error: 'Audit log not found' });
        }
        res.status(200).json({ message: 'Audit log deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;

