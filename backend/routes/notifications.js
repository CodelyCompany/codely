const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

router.get('/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.params.userId });
    return res.status(200).send(notifications);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/:userId', async (req, res) => {
  try {
    const newNotification = await Notification({
      user: req.params.userId,
      ...req.body,
    }).save();
    return res.status(200).send(newNotification);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.put('/:notificationId', async (req, res) => {
  try {
    const { notificationId } = req.params;
    await Notification.findByIdAndUpdate(notificationId, {
      read: true,
    });
    const updatedNotification = await Notification.findOne({
      _id: notificationId,
    });
    return res.status(200).send(updatedNotification);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
