import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const publicUser = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  role: u.role,
  company: u.company,
  headline: u.headline,
  skills: u.skills,
  location: u.location,
  resumeUrl: u.resumeUrl,
});
const tokenFor = (u) =>
  jwt.sign(
    { id: u._id, role: u.role, name: u.name },
    process.env.JWT_SECRET || "dev_secret",
    { expiresIn: "7d" },
  );
export async function register(req, res) {
  const { name, email, password, role = "candidate", company } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ message: "Name, email and password are required" });
  if (await User.findOne({ email }))
    return res.status(409).json({ message: "Email already registered" });
  const u = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
    role: role === "admin" ? "candidate" : role,
    company,
  });
  res
    .cookie("token", tokenFor(u), { httpOnly: true, sameSite: "lax" })
    .json({ user: publicUser(u) });
}
export async function login(req, res) {
  const u = await User.findOne({ email: req.body.email });
  if (!u || !(await bcrypt.compare(req.body.password, u.password)))
    return res.status(401).json({ message: "Invalid email or password" });
  res
    .cookie("token", tokenFor(u), { httpOnly: true, sameSite: "lax" })
    .json({ user: publicUser(u) });
}
export function logout(req, res) {
  res.clearCookie("token").json({ message: "Logged out" });
}
export async function me(req, res) {
  const u = await User.findById(req.user.id).select("-password");
  res.json({ user: publicUser(u) });
}
