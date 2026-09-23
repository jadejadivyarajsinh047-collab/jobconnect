import { Router } from "express";
import { auth, allow } from "../middleware/auth.js";
import * as c from "../controllers/admin.controller.js";
const r = Router();
r.get("/dashboard", auth, allow("admin"), c.dashboard);
r.get("/users", auth, allow("admin"), c.users);
r.delete("/users/:id", auth, allow("admin"), c.deleteUser);
export default r;
