const GamePlayer = require("../models/game_player");
const Game = require("../models/game");
const User = require("../models/user");
const { Op } = require("sequelize");

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
                tbluserIDUser: userID,
                tblgameIDGame: gameId,
            },
        });
        if (existingGamePlayer) {
            return res.status(400).json({
                message: "You have already joined this game",
            });
        }

        // Add the record to the game_player table
        await GamePlayer.create({
            tblgameIDGame: gameId,
            tbluserIDUser: userID,
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

exports.createGame = async (req, res, next) => {
    const userID = req.userData.IDUser;

    console.log(req.userData);

    // Get the body
    const { gameType, gameStyle, location, time, title, extraInfo } = req.body;
    let maxPlayers;

    if (gameStyle === "1v1") maxPlayers = 2;
    if (gameStyle === "2v2") maxPlayers = 4;
    if (gameStyle === "3v3") maxPlayers = 6;
    if (gameStyle === "4v4") maxPlayers = 8;
    if (gameStyle === "5v5") maxPlayers = 10;

    // Find all my games
    const openGames = await Game.findAll({
        where: {
            createdBy: userID,
        },
    });
    if (openGames.length >= 100) {
        return res.status(400).json({
            message: "You can't create a new game. You already have 3 open games.",
        });
    }

    // Create the game
    Game.create({
        gameType: gameType,
        gameStyle: gameStyle,
        location: location,
        time: time,
        maxPlayers: maxPlayers,
        createdBy: userID,
        title: title,
        extraInfo: extraInfo,
    })
        // Add player to game
        .then((newGame) => {
            GamePlayer.create({
                tblgameIDGame: newGame.IDGame,
                tbluserIDUser: userID,
            }).then(() => {
                res.status(201).json({
                    message: "Game created successfully",
                    game: newGame,
                });
            });
        })
        .catch((error) => {
            console.log("Error creating game:", error);
            res.status(500).json({
                error: error,
            });
        });
};

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