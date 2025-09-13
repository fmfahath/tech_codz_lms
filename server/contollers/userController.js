import userModel from "../models/userModel.js"
import courseModel from "../models/courseModel.js"
import purchaseModel from "../models/purchaseModel.js"
import Stripe from "stripe"
import courseProgressModel from "../models/courseProgress.js"

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

//puchase course--------------------------------------------------------
export const purchaseCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const { origin } = req.headers
        const userId = req.auth.userId

        //get course data
        const courseData = await courseModel.findById(courseId)
        //get user data
        const userData = await userModel.findById(userId)


        if (!courseData || !userData) {
            return res.json({ success: false, message: "Course data or User details not found!" })
        }

        const purchaseData = {
            courseId: courseData._id,
            userId,
            amount: (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)
        }

        //store purchase data into  DB
        const newPurchase = await purchaseModel.create(purchaseData)

        //initialize stripe gateway
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)
        const currency = process.env.CURRENCY.toLowerCase()

        //creating line items for stripe
        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: courseData.courseTitle
                },
                unit_amount: Math.floor(newPurchase.amount) * 100
            },
            quantity: 1
        }]

        //create stripe session
        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-enrollments`,
            cancel_url: `${origin}/`,
            line_items: line_items,
            mode: 'payment',
            metadata: {
                purchaseId: newPurchase._id.toString()
            }
        })

        res.json({ success: true, session_url: session.url })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


//update user course progress---------------------------------------------
export const updateUserCourseProgress = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { courseId, lectureId } = req.body
        const progressData = await courseProgressModel.findOne({ userId, courseId });

        if (progressData) {
            if (progressData.lectureCompleted.includes(lectureId)) {
                return res.json({ sucess: true, message: "Lecture already completed" });
            }
            progressData.lectureCompleted.push(lectureId);
            await progressData.save();
        }
        else {
            await courseProgressModel.create({
                userId,
                courseId,
                lectureCompleted: [lectureId]
            });
        }

        res.json({ success: true, message: "Course progress updated successfully" });

    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//get user course progress---------------------------------------------------
export const getUserCourseProgress = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { courseId } = req.body
        const progressData = await courseProgressModel.findOne({ courseId, userId });

        if (!progressData) {
            return res.json({ success: false, message: "No progress data found for this course" });
        }

        res.json({ success: true, progressData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//add user ratings-----------------------------------------------------------
export const addUserRatings = async (req, res) => {
    const userId = req.auth.userId;
    const { courseId, rating } = req.body;

    if (!courseId || !rating || !userId || rating < 1 || rating > 5) {
        return res.json({ success: false, message: "Invalid details" });
    }

    try {
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.json({ success: false, message: "Course not found" });
        }

        const user = await userModel.findById(userId);
        if (!user || !user.enrolledCourses.includes(courseId)) {
            return res.json({ success: false, message: "User has not enrolled in this course" });
        }

        const existingRatingIndex = course.courseRatings.findIndex(r => r.userId === userId);
        if (existingRatingIndex > -1) {
            course.courseRatings[existingRatingIndex].rating = rating;
        }
        else {
            course.courseRatings.push({ userId, rating });
        }

        await course.save();

        return res.json({ success: true, message: "Rating added" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}