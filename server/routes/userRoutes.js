import express from 'express'
import { getUserData, getUserEnrolledCourseData, purchaseCourse } from '../contollers/userController.js'

const userRouter = express.Router()

userRouter.get('/user-data', getUserData)
userRouter.get('/user-enrolled-courses', getUserEnrolledCourseData)
userRouter.post('/purchase', purchaseCourse)

export default userRouter