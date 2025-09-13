import userModel from "../models/userModel.js"
import courseModel from "../models/courseModel.js"
import purchaseModel from "../models/purchaseMOdel.js"
import Stripe from "stripe"

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
            return res.json({ success: false, message: "Course data or user details not found!" })
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
