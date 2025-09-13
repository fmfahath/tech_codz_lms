import courseModel from "../models/courseModel.js"



//get all courses---------------------------------------------------
export const getAllCourses = async (req, res) => {
    try {
        const coursesData = await courseModel.find({ isPublished: true })
            .select(['-courseContent', '-enrolledStudents'])
            .populate({ path: 'educator' })

        res.json({ success: true, coursesData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


//get course by id-----------------------------------------------------
export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params
        const courseData = await courseModel.findById(id).populate('educator')

        //remove lectureUrl if preview is false
        courseData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {
                if (!lecture.isPreviewFree) {
                    lecture.lectureUrl = ""
                }
            })
        })

        res.json({ success: true, courseData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

