const { Op } = require("sequelize");
const Game = require("../models/game");

exports.getOtherGames = async (req, res) => {
  const userId = req.userData.IDUser;

  //offset = where to start and limit = how many to show
  const offset = parseInt(req.query.offset) || 0;
  const limit = 15;

  try {
    const games = await Game.findAll({
      where: {
        createdBy: {
          //where not userid
          [Op.not]: userId,
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
      limit: limit,
      offset: offset,
    });

    return res.status(200).json(games);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
