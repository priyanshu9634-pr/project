import express from "express";
import mongoose from "mongoose";

import userRoutes from "./routes/user.js";
import documentRoutes from "./routes/document.js";
import auditLogRoutes from "./routes/auditlog.js";
import chatbotRoutes from "./routes/chatbotinteraction.js";
import landRecordRoutes from "./routes/landrecord.js";
import mutationRequestRoutes from "./routes/mutationrequest.js";

const app = express();
const port = 3000;

app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/landDisputeDB", {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));


app.use("/api/users", userRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/audit-logs", auditLogRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/land-records", landRecordRoutes);
app.use("/api/mutation-requests", mutationRequestRoutes);


app.get("/", (req, res) => {
    res.send("Land Dispute App API running");
});

app.listen(port, () => {
console.log(`Server running at http://localhost:${port}`);
});
