const stream = require("../services/stream");

exports.sendNotification = async (req, res, next) => {
  const { userId, message } = req.body;

  try {
    const notification = await stream.notificationClient.sendNotification({
      user_id: userId,
      message: message,
    });

    return res.status(200).json({
      notification: notification,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while sending the notification",
    });
  }
};

exports.getNotifications = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const notifications = await stream.notificationClient.getNotifications({
      user_id: userId,
      mark_read: true,
    });

    return res.status(200).json({
      notifications: notifications,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while getting the notifications",
    });
  }
};
