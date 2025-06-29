import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
fileName: String,
fileUrl: String,
fileType: String,
fileSize: Number,
fileHash: String,
docType: {
    type: String,
    enum: ["mutation", "partition", "notification", "dispute"],
    required: true
}
});

// ✅ This line is critical
const Document = mongoose.model("Document", documentSchema);
export default Document;
