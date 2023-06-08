const express = require("express");

//MIDDLEWARE
const { checkAuth } = require("../middleware/JWTAuthenticator");

//CONTROLLERS
const { login, signup } = require("../controllers/_Authentication");
const { getLeaderboard } = require("../controllers/_Public");
const { createGame, leaveGame, deleteGame, joinGame, updateScore, getMyGames, getOtherGames, getGame, getfinishedGame } = require("../controllers/GameController");
const { createMessage, deleteMessage, updateMessage, getMessages } = require("../controllers/MessageController");
const { checkPassword, changeUser, changeEmail, changePassword, changeProfilePicture, searchUsersByName, getUserInfo, getOtherUserInfo, getProfilePicture } = require("../controllers/UserController");
const { getAllLocations } = require("../controllers/LocationController")

const router = express.Router();

//write or read
router.post("/login", login);
router.post("/signup", signup);
router.post("/creategame", checkAuth, createGame);
router.post("/createMessage", checkAuth, createMessage);
router.post("/verify", checkAuth, checkPassword);

//delete
router.delete("/leavegame/:gameId", checkAuth, leaveGame);
router.delete("/deletegame/:gameId", checkAuth, deleteGame);
router.delete("deleteMessage", checkAuth, deleteMessage);

//update
router.patch("/joingame/:gameId", checkAuth, joinGame);
router.patch("/games/:gameId/players/:playerId/score", updateScore);
router.patch("/changeuser", checkAuth, changeUser);
router.patch("/changeemail", checkAuth, changeEmail);
router.patch("/changepassword", checkAuth, changePassword);
router.patch("/changeprofilepicture", checkAuth, changeProfilePicture);
router.patch("/updateMessage", checkAuth, updateMessage);

//read
router.get("/mygames", checkAuth, getMyGames);
router.get("/opengames", checkAuth, getOtherGames);
router.get("/game/:gameId", checkAuth, getGame);
router.get("/leaderboard", getLeaderboard);
router.get("/users/:name", checkAuth, searchUsersByName);
router.get("/account", checkAuth, getUserInfo);
router.get("/account/:IDUser", checkAuth, getOtherUserInfo);
router.get("/getMessage", checkAuth, getMessages);
router.get("/getProfilePicture", checkAuth, getProfilePicture);
router.get("/getLocations", getAllLocations);
router.get("/getfinishedGame", checkAuth, getfinishedGame);

router.get("/public", (req, res, next) => {
  res.status(200).json({ message: "here is your public resource" });
});

// will match any other path
router.use("/", (req, res, next) => {
  res.status(404).json({ error: "page not found" });
});

module.exports = router;
