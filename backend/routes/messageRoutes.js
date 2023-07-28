const express = require("express");
const {
  handleSendMessage,
  handleGetAllMessages,
} = require("../controller/messageController");

const router = express.Router();

router.post("/getAlldata", handleGetAllMessages);
router.post("/send", handleSendMessage);

module.exports = router;
