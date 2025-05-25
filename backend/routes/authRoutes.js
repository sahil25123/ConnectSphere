import express from "express"
import { login, signup } from "../controllers/authController.js";
const router = express.Router();


router.get("/signup" ,signup);

router.get("/login" ,login);

router.get("/logout" , (req,res)  =>{
    res.send("logout page");
});


export default router;
