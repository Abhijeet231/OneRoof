import mongoose, { Schema } from "mongoose";

const chatMessageSchema = new mongoose.Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        chat: {
            type: Schema.Types.ObjectId,
            ref: "Chat",
            required: true,
        },
    },
    {timestamps: true}
);

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

export default ChatMessage;