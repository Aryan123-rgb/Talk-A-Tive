const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const MessageSchema = new Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);

const MessageModel = model("Message", MessageSchema);

module.exports = MessageModel;
