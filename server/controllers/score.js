const GamePlayer = require("../models/game_player");

exports.updateScore = async (req, res, next) => {
  try {
    const { gameId, playerId } = req.params;
    const { score } = req.body;

    // find the game player by game and player ids
    const gamePlayer = await GamePlayer.findOne({
      where: { IDGame: gameId, IDUser: playerId },
    });

    if (!gamePlayer) {
      return res.status(404).json({ error: "Game player not found" });
    }

    // update the score and save the changes to the database
    gamePlayer.score = score;
    await gamePlayer.save();

    res.status(200).json({ message: "Score updated successfully" });
  } catch (err) {
    next(err);
  }
};
