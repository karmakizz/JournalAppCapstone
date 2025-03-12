import mongoose from "mongoose";

const JournalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    mood: { type: String, enum: ["Happy", "Sad", "Anxious", "Calm", "Excited"], required: true },
    visibility: { type: String, enum: ["public", "private"], default: "private" },
  },
  { timestamps: true }
);

const Journal = mongoose.model("Journal", JournalSchema);
export default Journal;
