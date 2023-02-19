const GamePlayer = require("../models/game_player");
const Game = require("../models/game");
const User = require("../models/user");

exports.leaveGame = async (req, res) => {
  const userID = req.userData.IDUser;
  const { gameId } = req.params;

  try {
    // Check if the user and game exist
    const user = await User.findByPk(userID);
    const game = await Game.findByPk(gameId);
    if (!user || !game) {
      return res.status(404).json({
        message: "User or game not found",
      });
    }

    // Check if the user has joined the game
    const gamePlayer = await GamePlayer.findOne({
      where: {
        IDUser: userID,
        IDGame: gameId,
      },
    });

    if (!gamePlayer) {
      return res.status(400).json({
        message: "You have not joined this game",
      });
    }

    if (game.createdBy == userID) {
      return res.status(400).json({
        message:
          "You cannot leave the game as you are the creator. Please delete the game instead.",
      });
    }

    // Remove the record from the game_player table
    await GamePlayer.destroy({
      where: {
        IDUser: userID,
        IDGame: gameId,
      },
    });

    // Update the currentPlayers count in the game table
    await Game.decrement("currentPlayers", {
      where: { IDGame: gameId },
    });

    return res.status(200).json({
      message: "Successfully left the game",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
