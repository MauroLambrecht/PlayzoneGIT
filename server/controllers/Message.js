const Chat = require("../models/chat_message");

exports.createMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.userData.IDUser;

    const chat = await Chat.create({
      senderId,
      receiverId,
      message,
    });

    return res.status(201).json({ chat });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create chat message" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.userData.IDUser;

    const chats = await Chat.findAll({
      where: {
        [Op.or]: [
          {
            senderId,
            receiverId,
          },
          {
            senderId: receiverId,
            receiverId: senderId,
          },
        ],
      },
      order: [["createdAt", "ASC"]],
    });

    return res.status(200).json({ chats });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to get chat messages" });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const { messageId, message } = req.body;
    const senderId = req.userData.IDUser;

    const chat = await Chat.findOne({
      where: {
        id: messageId,
        senderId,
      },
    });

    if (!chat) {
      return res.status(404).json({ error: "Chat message not found" });
    }

    chat.message = message;
    await chat.save();

    return res.status(200).json({ chat });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to update chat message" });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const senderId = req.userData.IDUser;

    const chat = await Chat.findOne({
      where: {
        id: messageId,
        senderId,
      },
    });

    if (!chat) {
      return res.status(404).json({ error: "Chat message not found" });
    }

    await chat.destroy();

    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to delete chat message" });
  }
};
