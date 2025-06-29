import mongoose from 'mongoose';

const mutationRequestSchema = new mongoose.Schema({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    landRecord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LandRecord',
        required: true
    },
    requestType: {
        type: String,
        enum: ['ownership_transfer', 'division', 'inheritance', 'correction'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    supportingDocuments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    }],
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // Panchayat Officer
    },
    remarks: String,
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    history: [{
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected']
        },
        date: Date,
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comment: String
    }]
}, { timestamps: true });

export default mongoose.model('MutationRequest', mutationRequestSchema);