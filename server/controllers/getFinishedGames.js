const GamePlayer = require("../models/game_player");
const Game = require("../models/game");
const User = require("../models/user");

exports.getfinishedGame = async (req, res) => {
  const userID = req.userData.IDUser;

  try {
    // Check if the user has joined the game
    const gamePlayer = await GamePlayer.findOne({
      where: {
        tbluserIDUser: userID,
      },
    });

    if (!gamePlayer) {
      return res.status(403).json({
        message: "Access denied. You are not a participant of this game.",
      });
    }

    // Retrieve the game with the provided gameId
    const game = await Game.findAll({
      where: {
        finished: true,
      },
      include: [
        {
          model: User,
          as: "Players",
          attributes: ["IDUser", "username", "email"],
          through: {
            model: GamePlayer,
            attributes: [],
            where: {
              tbluserIDUser: userID,
            },
          },
        },
      ],
    });

    if (game.lenght === 0) {
      return res.status(404).json({
        message: "no games found",
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
