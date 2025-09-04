import express from "express";
import { updateRoleToEducator } from "../contollers/educatorController.js";

const educatorRouter = express.Router();

educatorRouter.get('/update-role', updateRoleToEducator)

export default educatorRouter;

