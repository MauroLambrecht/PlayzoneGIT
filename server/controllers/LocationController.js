const Location = require("../models/location");

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.status(200).json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
