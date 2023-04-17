const { Op } = require("sequelize");
const User = require("../models/user");

exports.searchUsersByName = async (req, res, next) => {
  const searchString = req.params.name;
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // exclude password field
      where: {
        username: {
          [Op.like]: `%${searchString}%`,
        },
      },
    });
    res.status(200).json({
      users: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
};
