import User from '../models/User'; // import user model
import Notification from '../schemas/Notification'; // import notification model

/** NotificationController methods index and update */
class NotificationController {
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    }); // check exists provider

    /** conditions reverse checkIsProvider */
    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Only provider can load notifications' });
    }

    /** notifications find */
    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort('createdAt: desc')
      .limit(20);

    return res.json(notifications); // Return notificatios in json
  }


  async update(req, res) {
    // const notification = await Notification.findById(req.params.id);
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true },
    );

    return res.json(notification);
  }

}

export default new NotificationController();
