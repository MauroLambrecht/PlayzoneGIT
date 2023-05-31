const Game = require("../models/game");
const User = require("../models/user");

exports.getMyGames = async (req, res) => {
  const userId = req.userData.IDUser;

  try {
    const user = await User.findByPk(userId, {
      include: {
        model: Game,
        as: "Games",
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
      },
    });

    const games = user.Games;
    return res.status(200).json(games);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
