import quizzController from "../controllers/quizzController";
import { Router } from "express";
const quizzRouter=Router();
quizzRouter.post('/quizz-response',quizzController.quizz_response);
export default quizzRouter