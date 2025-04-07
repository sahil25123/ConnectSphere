import {Router} from "express"
import { login, register, getCurrentUser } from "../controllers/user.js";

const router = Router();

router.route("/auth").post(login)
router.route("/register").post(register)
router.route("/me").get(getCurrentUser)
router.route("/add_to_activity")
router.route("/get_all_activity")

export default router;

