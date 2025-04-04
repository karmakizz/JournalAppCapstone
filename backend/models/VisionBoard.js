import mongoose from "mongoose";

const VisionBoardItemSchema = new mongoose.Schema({
  text: { type: String, required: false },
  image: { type: String, required: false }, // Store URL or base64 string
  position: { x: Number, y: Number },
  size: { width: Number, height: Number },
});

const VisionBoardItem = mongoose.model("VisionBoardItem", VisionBoardItemSchema);

export default VisionBoardItem;  // Default export
