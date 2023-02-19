const Game = require("../models/game");
const GamePlayer = require("../models/game_player");

exports.deleteGame = async (req, res, next) => {
  const gameId = req.params.gameId;
  const userId = req.userData.IDUser;

  try {
    // Check if the game exists
    const game = await Game.findByPk(gameId);
    if (!game) {
      return res.status(404).json({
        message: "Game not found",
      });
    }

    // Check if the authenticated user created the game
    if (game.createdBy !== userId) {
      return res.status(403).json({
        message: "You do not have permission to delete this game",
      });
    }

    // Delete the game from the game table
    await Game.destroy({ where: { IDGame: gameId } });

    // Delete all game player records for the game
    await GamePlayer.destroy({ where: { IDGame: gameId } });

    return res.status(200).json({
      message: "Game deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error,
    });
  }
};
