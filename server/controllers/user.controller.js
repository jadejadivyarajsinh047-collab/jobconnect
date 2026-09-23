import User from "../models/User.js";
import Notification from "../models/Notification.js";
export async function profile(req, res) {
  res.json(await User.findById(req.user.id).select("-password"));
}
export async function update(req, res) {
  const allowed = [
    "name",
    "headline",
    "bio",
    "skills",
    "resumeUrl",
    "company",
    "location",
    "avatar",
  ];
  const data = {};
  allowed.forEach((k) => {
    if (k in req.body) data[k] = req.body[k];
  });
  const u = await User.findByIdAndUpdate(req.user.id, data, {
    new: true,
  }).select("-password");
  res.json(u);
}
export async function notifications(req, res) {
  res.json(
    await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(30),
  );
}
export async function readNotifications(req, res) {
  await Notification.updateMany({ user: req.user.id }, { read: true });
  res.json({ ok: true });
}
