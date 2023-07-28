const User = require("../models/User");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const secret = "!@#$%^&*()";

const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email, password });
  if (userDoc) {
    jwt.sign(
      {
        id: userDoc._id,
        name: userDoc.name,
        email: userDoc.email,
        password: userDoc.password,
        pic: userDoc.pic,
      },
      secret,
      {},
      (err, token) => {
        const response = {
          id: userDoc._id,
          name: userDoc.name,
          email: userDoc.email,
          password: userDoc.password,
          pic: userDoc.pic,
          token: token,
        };
        res.cookie("token", token).json(response);
      }
    );
  } else res.status(400).json({ error: "Not found" });
};

const handleSignUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    return;
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json("User already exits");
    return;
  }
  let pic;
  if (req?.file) {
    const { originalname, path, destination } = req?.file;
    fs.renameSync(path, `${destination}/${originalname}`);
    pic = `${destination}/${originalname}`;
  }

  try {
    const defaultpic =
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
    const userDoc = await User.create({
      name: name,
      email: email,
      password: password,
      pic: pic || defaultpic,
    });
    jwt.sign(
      {
        id: userDoc._id,
        name: userDoc.name,
        email: userDoc.email,
        password: userDoc.password,
        pic: userDoc.pic,
      },
      secret,
      {},
      (err, token) => {
        const response = {
          id: userDoc._id,
          name: userDoc.name,
          email: userDoc.email,
          password: userDoc.password,
          pic: userDoc.pic,
          token: token,
        };
        res.cookie("token", token).json(response);
      }
    );
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

const handleGetLoggedInUser = async (req, res) => {
  const token = req?.cookies.token;
  if (req?.cookies.token) {
    const info = jwt.verify(token, secret);
    const id = info?.id;
    const usersData = await User.find({ _id: id });
    res.json(usersData);
  } else {
    res.status(400).json({ error: "Log in required." });
  }
};

const handleGetAllUserInfo = async (req, res) => {
  const token = req?.cookies.token;
  if(!token){
    return;
  }
  let loggedUserId;
  if (req?.cookies.token) {
    const info = jwt.verify(token, secret);
    loggedUserId = info?.id;
    const userDoc = await User.find({ _id: { $ne: loggedUserId } });
    res.json(userDoc);
  } else {
    res.status(400).json({ error: "Log in required." });
  }
};

const handleLogoutUser = async (req, res) => {
  res?.cookie("token", "").json("ok");
};

module.exports = {
  handleLoginUser,
  handleSignUpUser,
  handleGetLoggedInUser,
  handleLogoutUser,
  handleGetAllUserInfo
};
