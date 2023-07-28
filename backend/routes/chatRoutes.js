const express = require("express");
const { handleCreateChat } = require("../controller/chatController");
const router = express.Router();


router.post("/createChat", handleCreateChat);

module.exports = router;