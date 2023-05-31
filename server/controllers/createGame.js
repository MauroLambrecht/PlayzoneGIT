const GamePlayer = require("../models/game_player");
const Game = require("../models/game");

exports.createGame = async (req, res, next) => {
  const userID = req.userData.IDUser;

  console.log(req.userData);

  // Get the body
  const { gameType, gameStyle, location, time, title, extraInfo } = req.body;
  let maxPlayers;

  if (gameStyle === "1v1") maxPlayers = 2;
  if (gameStyle === "2v2") maxPlayers = 4;
  if (gameStyle === "3v3") maxPlayers = 6;
  if (gameStyle === "4v4") maxPlayers = 8;
  if (gameStyle === "5v5") maxPlayers = 10;

  // Find all my games
  const openGames = await Game.findAll({
    where: {
      createdBy: userID,
    },
  });
  if (openGames.length >= 100) {
    return res.status(400).json({
      message: "You can't create a new game. You already have 3 open games.",
    });
  }

  // Create the game
  Game.create({
    gameType: gameType,
    gameStyle: gameStyle,
    location: location,
    time: time,
    maxPlayers: maxPlayers,
    createdBy: userID,
    title: title,
    extraInfo: extraInfo,
  })
    // Add player to game
    .then((newGame) => {
      GamePlayer.create({
        tblgameIDGame: newGame.IDGame,
        tbluserIDUser: userID,
      }).then(() => {
        res.status(201).json({
          message: "Game created successfully",
          game: newGame,
        });
      });
    })
    .catch((error) => {
      console.log("Error creating game:", error);
      res.status(500).json({
        error: error,
      });
    });
};
