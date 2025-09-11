import userModel from "../models/userModel.js"

//get user data---------------------------------------------------
export const getUserData = async (req, res) => {
    try {
        const userId = req.auth.userId
        const userData = await userModel.findById(userId)

        if (!userData) {
            return res.json({ success: false, message: 'User not found!' })
        }

        res.json({ success: true, userData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//get user enrolled courses------------------------------------------
export const getUserEnrolledCourseData = async (req, res) => {
    try {
        const userId = req.auth.userId
        const userData = await userModel.findById(userId).populate('enrolledCourses')

        res.json({ success: true, enrolledCourseData: userData.enrolledCourses })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
