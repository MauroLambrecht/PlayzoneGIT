const GamePlayer = require("../models/game_player");
const Game = require("../models/game");
const User = require("../models/user");

exports.joinGame = async (req, res) => {
  const userID = req.userData.IDUser;
  const { gameId } = req.params;

  try {
    // Check if the user and game exist
    const user = await User.findByPk(userID);
    const game = await Game.findByPk(gameId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (!game) {
      return res.status(404).json({
        message: "game not found",
      });
    }

    // Check if the game is full
    if (game.currentPlayers >= game.maxPlayers) {
      return res.status(400).json({
        message: "The game is already full",
      });
    }

    // Check if the user has already joined the game
    const existingGamePlayer = await GamePlayer.findOne({
      where: {
        IDUser: userID,
        IDGame: gameId,
      },
    });
    if (existingGamePlayer) {
      return res.status(400).json({
        message: "You have already joined this game",
      });
    }

    // Add the record to the game_player table
    await GamePlayer.create({
      IDGame: gameId,
      IDUser: userID,
    });

    // Update the currentPlayers count
    await Game.increment("currentPlayers", {
      where: { IDGame: gameId },
    });

    return res.status(200).json({
      message: "Successfully joined the game",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
