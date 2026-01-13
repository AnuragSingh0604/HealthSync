import mongoose from "mongoose";

const chatSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  step: {
    type: String,
    default: "START"
  },
  tempData: {
    type: Object,
    default: {}
  }
}, { timestamps: true });

const ChatSessionModel =
  mongoose.models.chat_sessions ||
  mongoose.model("chat_sessions", chatSessionSchema);

export default ChatSessionModel;
