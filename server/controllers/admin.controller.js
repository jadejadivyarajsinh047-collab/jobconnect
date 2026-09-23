import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
export async function dashboard(req, res) {
  const [users, jobs, applications, recruiters, candidates] = await Promise.all(
    [
      User.countDocuments(),
      Job.countDocuments({ isActive: true }),
      Application.countDocuments(),
      User.countDocuments({ role: "recruiter" }),
      User.countDocuments({ role: "candidate" }),
    ],
  );
  res.json({ users, jobs, applications, recruiters, candidates });
}
export async function users(req, res) {
  res.json(await User.find().select("-password").sort({ createdAt: -1 }));
}
export async function deleteUser(req, res) {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
}
