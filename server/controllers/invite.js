const { chatClient, notificationClient } = require("../path/to/streamConfig");

// Function to send a game invite
exports.sendGameInvite = async (req, res, next) => {
  const { recipientUserId } = req.body;

  try {
    // Create a new chat channel for the game invite
    const channel = chatClient.channel("messaging", {
      members: [req.user.streamUserId, recipientUserId],
      created_by_id: req.user.streamUserId,
    });

    await channel.create();

    // Send a message to the recipient with the game invite details
    const message = {
      text: `You have been invited to play a game with ${req.user.name}!`,
      type: "game-invite",
      gameData: {
        // Add details about the game being played
      },
    };

    await channel.sendMessage(message);

    // Send a notification to the recipient
    await notificationClient.send({
      user_id: recipientUserId,
      message: `${req.user.name} has invited you to play a game!`,
      data: {
        type: "game-invite",
        gameData: {
          // Add details about the game being played
        },
      },
    });

    res.status(200).json({ message: "Game invite sent successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error sending game invite" });
  }
};

// Function to accept a game invite
exports.acceptGameInvite = async (req, res, next) => {
  const { channelId } = req.body;

  try {
    // Get the chat channel for the game invite
    const channel = chatClient.channel("messaging", channelId);
    await channel.watch();

    // Send a message to the sender confirming the game invite was accepted
    const message = {
      text: `Your game invite was accepted by ${req.user.name}!`,
      type: "game-invite-accept",
      gameData: {
        // Add details about the game being played
      },
    };

    await channel.sendMessage(message);

    // Send a notification to the sender
    const members = await channel.queryMembers();
    const sender = members.filter(
      (member) => member.user.id !== req.user.streamUserId
    )[0].user;
    await notificationClient.send({
      user_id: sender.id,
      message: `${req.user.name} accepted your game invite!`,
      data: {
        type: "game-invite-accept",
        gameData: {
          // Add details about the game being played
        },
      },
    });

    res.status(200).json({ message: "Game invite accepted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error accepting game invite" });
  }
};
