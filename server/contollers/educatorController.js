
import { clerkClient } from '@clerk/express'
import courseModel from '../models/courseModel.js';
import { v2 as cloudinary } from "cloudinary";
import purchaseModel from '../models/purchaseModel.js';
import userModel from '../models/userModel.js';

//update role from student to educator----------------------------------------------------
export const updateRoleToEducator = async (req, res) => {
    try {
        const userId = req.auth.userId;

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: { role: 'educator' }
        })

        res.json({ success: true, message: "Role updated to educator. You can publish courses now!" })
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


//get educator dashboard data----------------------------------------------------
export const getEducatorDashboardData = async (req, res) => {
    try {
        const educatorId = req.auth.userId
        const educatorCourses = await courseModel.find({ educator: educatorId })
        const educatorTotalCourses = educatorCourses.length
        const educatorCoursesIds = educatorCourses.map(course => course._id)

        //total earnings
        const purchases = await purchaseModel.find({ courseId: { $in: educatorCoursesIds }, status: 'completed' })
        const EducatorTotalEarnings = purchases.reduce((acc, purchase) => acc + purchase.amount, 0)

        //enrolles students data
        const enrolledStudentsData = []
        for (const course of educatorCourses) {
            const students = await userModel.find({
                _id: { $in: course.enrolledStudents }
            }, 'name imageUrl')

            students.forEach(student => {
                enrolledStudentsData.push({
                    courseTitle: course.courseTitle,
                    student
                })
            })
        }

        res.json({
            success: true, dashboardData: {
                EducatorTotalEarnings, enrolledStudentsData, educatorTotalCourses
            }
        })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//get enrolled students data---------------------------------------------------------
export const getEnrolledStudentsData = async (req, res) => {
    try {
        const educatorId = req.auth.userId
        const educatorCourses = await courseModel.find({ educator: educatorId })
        const educatorCoursesIds = educatorCourses.map(course => course._id)

        const purchases = await purchaseModel.find({ courseId: { $in: educatorCoursesIds }, status: 'completed' })
            .populate('userId', 'name imageUrl').populate('courseId', 'courseTitle')

        const enrolledStudentsData = purchases.map(purchase => ({
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseDate: purchase.createdAt
        }))

        res.json({ success: true, enrolledStudentsData })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}