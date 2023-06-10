const User = require("../models/user");
const Location = require("../models/location");

exports.getLeaderboard = async (req, res, next) => {
  try {
    const sortBy = req.query.sortBy || "points"; // default to sorting by points
    const order = req.query.order || "DESC"; // default to descending order

    const leaderboard = await User.findAll({
      attributes: ["IDUser", "username", "points", "level"],
      order: [[sortBy, order]],
    });

    res.json({ leaderboard });
  } catch (error) {
    next(error);
  }
};

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.status(200).json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
