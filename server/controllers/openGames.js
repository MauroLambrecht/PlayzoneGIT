const { Op } = require("sequelize");
const Game = require("../models/game");
const User = require("../models/user");
const GamePlayer = require("../models/game_player");

exports.getOtherGames = async (req, res) => {
  const userId = req.userData.IDUser;
  const currentTime = new Date();
  const fiveMinutes = new Date(currentTime.getTime() + 5 * 60000); // Calculate the time 5 minutes ahead

  try {
    const games = await Game.findAll({
      where: {
        createdBy: {
          [Op.not]: userId,
        },
        time: {
          [Op.gt]: fiveMinutes,
        },
      },
      attributes: [
        "IDGame",
        "currentPlayers",
        "gameType",
        "gameStyle",
        "location",
        "time",
        "maxPlayers",
        "createdBy",
      ],
      include: [
        {
          model: User,
          as: "Players",
          attributes: ["IDUser", "username", "email"],
          through: { attributes: [] },
        },
      ],
    });

    // Retrieve the IDs of games that the user has joined
    const joinedGames = await GamePlayer.findAll({
      where: {
        tbluserIDUser: userId,
      },
      attributes: ["tblgameIDGame"],
      raw: true,
    });

    // Filter out the games that the user has already joined and with 0 spots left
    const filteredGames = games.filter((game) => {
      return (
        !joinedGames.some(
          (joinedGame) => joinedGame.tblgameIDGame === game.IDGame
        ) && game.currentPlayers < game.maxPlayers
      );
    });

    return res.status(200).json(filteredGames);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
