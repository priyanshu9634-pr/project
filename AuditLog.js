import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
    actionBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    actionType: {
        type: String,
        enum: ['create', 'update', 'delete', 'approve', 'reject'],
        required: true
    },
    entityType: {
        type: String,
        enum: ['User', 'LandRecord', 'MutationRequest', 'Document'],
        required: true
    },
    entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    description: String
}, { timestamps: true });

export default mongoose.model('AuditLog', auditLogSchema);