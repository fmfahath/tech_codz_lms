
import { clerkClient } from '@clerk/express'
import courseModel from '../models/courseModel.js';
import { v2 as cloudinary } from "cloudinary";

//update role from student to educator----------------------------------------------------
export const updateRoleToEducator = async (req, res) => {
    try {
        const userId = req.auth.userId;

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: { role: 'educator' }
        })

        res.json({ success: true, message: "Role updated to educator. Please re-login to see the changes." })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//add new course-----------------------------------------------------------------------------
export const addNewCourse = async (req, res) => {
    try {
        const { courseData } = req.body
        const courseImageFile = req.file
        const educatorId = req.auth.userId

        if (!courseImageFile) {
            return res.json({ success: false, message: "Course thumbnail is required" })
        }

        const parsedCourseData = JSON.parse(courseData)
        parsedCourseData.educator = educatorId

        const newCourse = await courseModel.create(parsedCourseData)
        const uploadedImage = await cloudinary.uploader.upload(courseImageFile.path, { folder: 'techcodz-lms' })

        newCourse.courseThumbnail = uploadedImage.secure_url
        await newCourse.save()

        res.json({ success: true, message: "New course added successfully" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//get educator's courses----------------------------------------------------------------
export const getEducatorCourses = async (req, res) => {
    try {
        const educatorId = req.auth.userId
        const educatorCourses = await courseModel.find({ educator: educatorId })

        res.json({ success: true, courses: educatorCourses })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
