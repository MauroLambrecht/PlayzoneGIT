const Game = require("../models/game");

exports.getMyGames = async (req, res) => {
  const userId = req.userData.IDUser;

  try {
    const games = await Game.findAll({
      where: { createdBy: userId },
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
    });
    return res.status(200).json(games);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
