import jwt from "jsonwebtoken";
export function auth(req, res, next) {
  try {
    const token =
      req.cookies.token || req.headers.authorization?.replace("Bearer ", "");
    if (!token)
      return res.status(401).json({ message: "Authentication required" });
    req.user = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
    next();
  } catch (e) {
    return res
      .status(401)
      .json({ message: "Session expired. Please login again." });
  }
}
export const allow =
  (...roles) =>
  (req, res, next) =>
    roles.includes(req.user.role)
      ? next()
      : res
          .status(403)
          .json({ message: "You do not have permission for this action." });
