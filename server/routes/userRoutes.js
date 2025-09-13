import express from 'express'
import { addUserRatings, getUserCourseProgress, getUserData, getUserEnrolledCourseData, purchaseCourse, updateUserCourseProgress } from '../contollers/userController.js'

const userRouter = express.Router()

userRouter.get('/user-data', getUserData)
userRouter.get('/user-enrolled-courses', getUserEnrolledCourseData)
userRouter.post('/purchase', purchaseCourse)
userRouter.post('/update-course-progress', updateUserCourseProgress)
userRouter.post('/get-course-progress', getUserCourseProgress)
userRouter.post('/add-rating', addUserRatings)

export default userRouter