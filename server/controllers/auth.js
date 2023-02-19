const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
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
    const passwordHash = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      username: req.body.username,
      password: passwordHash,
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
  try {
    const dbUser = await User.findOneByEmail(req.body.email);
    console.log(dbUser.IDUser);
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
    return res.status(200).json({ message: "User logged in", token });
  } catch (err) {
    console.error(err);
    return res.status(502).json({ message: "Error while logging in" });
  }
};

module.exports = { signup, login };
