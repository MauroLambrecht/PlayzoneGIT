const GamePlayer = require("../models/game_player");
const Game = require("../models/game");
const User = require("../models/user");

exports.getGame = async (req, res) => {
  const { gameId } = req.params;
  const userID = req.userData.IDUser;

  try {
    // Check if the user has joined the game
    const gamePlayer = await GamePlayer.findOne({
      where: {
        tbluserIDUser: userID,
        tblgameIDGame: gameId,
      },
    });

    if (!gamePlayer) {
      return res.status(403).json({
        message: "Access denied. You are not a participant of this game.",
      });
    }

    // Retrieve the game with the provided gameId
    const game = await Game.findByPk(gameId, {
      include: [
        {
          model: User,
          as: "Players",
          attributes: ["IDUser", "username", "email"], // Include only the desired user attributes
          through: {
            model: GamePlayer,
            attributes: [], // Exclude the association attributes
          },
        },
      ],
    });

    if (!game) {
      return res.status(404).json({
        message: "Game not found",
      });
    }

    return res.status(200).json({
      game,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
