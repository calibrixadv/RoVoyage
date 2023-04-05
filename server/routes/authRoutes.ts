import { Router } from "express";
import authController from "../controllers/authController";
const authRouter=Router();
authRouter.get('/sign-up',authController.signup_get)
authRouter.post('/sign-up',authController.signup_post)
authRouter.get('/log-in',authController.login_get)
authRouter.post('/log-in',authController.login_post)
export default authRouter;