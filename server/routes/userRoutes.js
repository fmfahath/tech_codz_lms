import express from 'express'
import { getUserData, getUserEnrolledCourseData } from '../contollers/userController.js'

const userRouter = express.Router()

userRouter.get('/user-data', getUserData)
userRouter.get('/user-enrolled-courses', getUserEnrolledCourseData)

export default userRouter