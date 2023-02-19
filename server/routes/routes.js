const express = require("express");

//controller imports
const { signup, login } = require("../controllers/auth.js");
const { getLeaderboard } = require("../controllers/leaderboard.js");
const { createGame } = require("../controllers/creategame.js");
const { joinGame } = require("../controllers/joingame.js");
const { leaveGame } = require("../controllers/leaveGame.js");
const { deleteGame } = require("../controllers/deleteGame.js");
const { getMyGames } = require("../controllers/yourGames.js");
const { getOtherGames } = require("../controllers/openGames.js");
const { updateScore } = require("../controllers/score.js");

//middleware import
const { checkAuth } = require("../middleware/checkAuth.js");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/creategame", checkAuth, createGame);

router.delete("/leavegame/:gameId", checkAuth, leaveGame);
router.delete("/deletegame/:gameId", checkAuth, deleteGame);

router.patch("/joingame/:gameId", checkAuth, joinGame);
router.patch("/games/:gameId/players/:playerId/score", updateScore);

router.get("/mygames", checkAuth, getMyGames);
router.get("/opengames", checkAuth, getOtherGames);
router.get("/leaderboard", getLeaderboard);

router.get("/public", (req, res, next) => {
  res.status(200).json({ message: "here is your public resource" });
});

// will match any other path
router.use("/", (req, res, next) => {
  res.status(404).json({ error: "page not found" });
});

module.exports = router;
