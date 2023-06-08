const User = require("../models/user");

exports.getLeaderboard = async (req, res, next) => {
    try {
        const sortBy = req.query.sortBy || "points"; // default to sorting by points
        const order = req.query.order || "DESC"; // default to descending order

        const leaderboard = await User.findAll({
            attributes: ["username", "points", "level"],
            order: [[sortBy, order]],
        });

        res.json({ leaderboard });
    } catch (error) {
        next(error);
    }
};