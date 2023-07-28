const Chat = require("../models/Chat");
const User = require("../models/User");

const handleCreateChat = async (req, res) => {
  const { userId, otherId } = req.body;
  if (!userId) {
    console.log(userId, otherId);
    return res.sendStatus(400);
  }
  let isChat = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq: userId } } },
      { users: { $elemMatch: { $eq: otherId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      users: [userId, otherId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400).json("Failed to create");
      console.log(error.message);
    }
  }
};

module.exports = { handleCreateChat };
