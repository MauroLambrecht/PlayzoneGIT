//maken een model
const User = require("../models/user.js");
//library
const jwt = require("jsonwebtoken");

//maak een export aan
exports.changeUser = async (req, res, next) => {
  //variabel const userID initialiseren
  const userID = req.userData.IDUser;
  const newusername = req.body.newusername;

  //find a user with the userid from the authentication
  const user = await User.findOne({
    where: {
      IDUser: userID,
    },
  });

  //update the username with the newusername where the id = id
  const usernameUpdate = await User.update(
    { username: newusername },
    {
      where: {
        IDUser: userID,
      },
    }
  );

  if (user.username === newusername) {
    return res.status(400).json({
      message: "This is already your current username!",
    });
  }

  return res.status(200).json({
    message: "Your name is succesfully changed.",
  });
};
