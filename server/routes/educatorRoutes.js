import express from "express";
import { addNewCourse, getEducatorCourses, updateRoleToEducator } from "../contollers/educatorController.js";
import { verifyEducatorRole } from "../middlewares/authMiddleware.js";
import upload from "../configs/multer.js";

const educatorRouter = express.Router();

educatorRouter.get('/update-role', updateRoleToEducator)
educatorRouter.post('/add-course', verifyEducatorRole, upload.single('image'), addNewCourse)
educatorRouter.get('/courses', verifyEducatorRole, getEducatorCourses)

export default educatorRouter;

