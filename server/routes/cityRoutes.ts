import city from "../controllers/cityController";
import { Router } from "express";
const cityRouter=Router();
cityRouter.post('/city-post',city.getData);
export default cityRouter
