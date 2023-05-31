const express = require("express");

//controller imports
const { signup, login } = require("../controllers/auth.js");
const { getLeaderboard } = require("../controllers/leaderboard.js");
const { createGame } = require("../controllers/createGame.js");
const { joinGame } = require("../controllers/joingame.js");
const { leaveGame } = require("../controllers/leaveGame.js");
const { deleteGame } = require("../controllers/deleteGame.js");
const { getMyGames } = require("../controllers/yourGames.js");
const { getOtherGames } = require("../controllers/openGames.js");
const { updateScore } = require("../controllers/score.js");
const { searchUsersByName } = require("../controllers/getUserList.js");
const {
  changeUser,
  changeEmail,
  changePassword,
  changeProfilePicture,
} = require("../controllers/changeUser.js");
const {
  getUserInfo,
  getOtherUserInfo,
  checkPassword,
  getProfilePicture,
} = require("../controllers/account.js");
const {
  createMessage,
  getMessages,
  updateMessage,
  deleteMessage,
} = require("../controllers/Message.js");

//middleware import
const { checkAuth } = require("../middleware/checkAuth.js");
const { getAllLocations } = require("../controllers/getLocations.js");
const { getGame } = require("../controllers/getGame.js");
const { getfinishedGame } = require("../controllers/getFinishedGames.js");

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
