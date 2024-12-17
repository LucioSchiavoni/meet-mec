import { Router } from "express";
import { createMeet, getMeet } from "../controllers/meet.controller.js";


const meetRouter = Router();




meetRouter.get("/get", getMeet)
meetRouter.post("/post/meet", createMeet)




export default meetRouter;