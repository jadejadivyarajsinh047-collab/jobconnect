import { Router } from "express";
import { auth, allow } from "../middleware/auth.js";
import * as c from "../controllers/application.controller.js";
const r = Router();
r.post("/:jobId", auth, allow("candidate"), c.apply);
r.get("/mine", auth, allow("candidate"), c.mine);
r.get("/recruiter", auth, allow("recruiter", "admin"), c.recruiter);
r.patch("/:id", auth, allow("recruiter", "admin"), c.update);
export default r;
