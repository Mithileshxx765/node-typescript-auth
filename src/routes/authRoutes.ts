import { Router } from "express";
import { login_post } from "../controllers/loginCont";
import { signup_post } from "../controllers/signupCont";

const router = Router();

router.post("/signup", signup_post);
router.post("/login", login_post);

export default router;
