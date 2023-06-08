const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const { StreamChat } = require("stream-chat");
const apiKey = "ngdaaxg4xenm";
const apiSecret =
  "vc2qxxpwebfeh7gtrrnugw7q3h4efgenwecw6n82ech35tw4t88r6wrmnggw7dvm";
const streamClient = new StreamChat(apiKey, apiSecret);

require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

const signup = async (req, res, next) => {
  try {
    const dbUser = await User.findOneByEmail(req.body.email);
    if (dbUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    if (!req.body.email) {
      return res.status(400).json({ message: "Email not provided" });
    }
    if (!req.body.password) {
      return res.status(400).json({ message: "Password not provided" });
    }
    if (!req.body.username) {
      return res.status(400).json({ message: "Username not provided" });
    }
    if (!req.body.firstName) {
      return res.status(400).json({ message: "First name not provided" });
    }
    if (!req.body.lastName) {
      return res.status(400).json({ message: "Last name not provided" });
    }
    const passwordHash = await bcrypt.hash(req.body.password, 12);
    await User.create({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: passwordHash,
      dob: req.body.dob,
    });
    return res.status(200).json({ message: "User created" });
  } catch (err) {
    console.error(err);
    return res
      .status(502)
      .json({ message: "Error while creating the user or checking email" });
  }
};

const login = async (req, res, next) => {
  console.log("login was called");
  try {
    const dbUser = await User.findOneByEmail(req.body.email);
    if (!dbUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      dbUser.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: dbUser.email, IDUser: dbUser.IDUser },
      jwtSecret,
      {
        expiresIn: "24h",
      }
    );

    const { IDUser, firstname, lastname, username, email } = dbUser;
    const chatToken = streamClient.createToken(email);

    return res.status(200).json({
      message: "User logged in",
      token,
      chatToken,
      user: { IDUser, firstname, lastname, username, email },
    });
  } catch (err) {
    console.error(err);
    return res.status(502).json({ message: "Error while logging in" });
  }
};

module.exports = { signup, login };
