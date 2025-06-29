import mongoose from 'mongoose';

const landRecordSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    surveyNumber: {
        type: String,
        required: true,
        index: true
    },
    village: {
        type: String,
        index: true
    },
    district: {
        type: String,
        index: true
    },
    state: String,
    areaInAcres: Number,
    landType: {
        type: String,
        enum: ['agricultural', 'residential', 'commercial', 'industrial'],
        required: true
    },
    geoCoordinates: {
        type: { type: String, default: 'Point' },
        coordinates: {
            type: [Number],  // [longitude, latitude]
            index: '2dsphere'
        }
    },
    documents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    }],
    isDisputed: {
        type: Boolean,
        default: false
    },
    lastMutationDate: Date
}, { timestamps: true });

export default mongoose.model('LandRecord', landRecordSchema);