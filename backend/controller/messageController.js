const Chat = require("../models/Chat");
const User = require("../models/User");
const Message = require("../models/Message");

const handleSendMessage = async (req, res) => {
  const { content, chatId, senderId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  let newMessage = {
    sender: senderId,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    res.json(message);
  } catch (error) {
    res.status(400);
    console.log(error.message);
  }
};

const handleGetAllMessages = async (req, res) => {
  try {
    const { chatId } = req?.body;
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    console.log(error.message);
  }
};

module.exports = { handleSendMessage, handleGetAllMessages };
