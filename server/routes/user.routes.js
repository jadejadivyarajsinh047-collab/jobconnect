import { Router } from "express";
import { auth } from "../middleware/auth.js";
import * as c from "../controllers/user.controller.js";
const r = Router();
r.get("/profile", auth, c.profile);
r.put("/profile", auth, c.update);
r.get("/notifications", auth, c.notifications);
r.patch("/notifications/read", auth, c.readNotifications);
export default r;
