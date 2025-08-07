import React, { useContext, useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import humanizeDuration from 'humanize-duration'
import { Line } from 'rc-progress'

const MyEnrollments = () => {

    const { allCourses } = useContext(AppContext)
    const [userId, setUserId] = useState("user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V")
    const [enrolledCourseDetails, setEnrolledCourseDetails] = useState(null)

    // calculate chapter duration-------------------
    const calculateChapterDuration = (chapter) => {
        let chapterDuration = 0;

        return chapterDuration = chapter.chapterContent.reduce((acc, lecture) => (acc + lecture.lectureDuration), 0)
    }

    //get enrolled course details--------------------
    const getEnrolledCourseDetails = () => {
        const tempArray = dummyStudentEnrolled.filter(enrolledData => enrolledData.studentDetails._id === userId)

        const courseDetails = tempArray.map(tempArrData => {
            const tempCourseData = allCourses.find(course => course._id === tempArrData.courseDetails._id)

            let tempCourseDuration = 0;
            let tempTotalLectures = 0;

            //total lectures & course duration
            tempCourseData.courseContent.map(chapter => {
                tempTotalLectures += chapter.chapterContent.length
                tempCourseDuration += calculateChapterDuration(chapter)
            })

            //total course duration in human redable format
            const courseDuration = humanizeDuration(tempCourseDuration * 60 * 1000, { units: ["h", "m"] })

            //get course thumbnail & completed lectures & course status
            const tempCourseThumbnail = tempCourseData.courseThumbnail;
            const tempCompletedLectures = tempArrData.courseDetails.lectureCompleted;
            const tempCourseStatus = tempArrData.courseDetails.courseStatus;

            const tempCourseDetails = {
                courseThubmnail: tempCourseThumbnail,
                courseTitle: tempCourseData.courseTitle,
                totalLectures: tempTotalLectures,
                completedLectures: tempCompletedLectures,
                courseDuration,
                courseStatus: tempCourseStatus
            }

            return tempCourseDetails
        })

        setEnrolledCourseDetails(courseDetails)
    }


    useEffect(() => {
        if (userId) {
            getEnrolledCourseDetails()
        }
    }, [userId, allCourses])

    return (
        <div className='w-full min-h-screen px-4 md:px-30 pt-[30%] md:pt-[10%] mb-10'>
            <div>
                <h2 className='text-xl md:text-2xl font-medium'>My Enrollments</h2>
                <div>
                    <table className='w-full md:table-auto table-fixed overflow-hidden bg-gray-500/5 mt-10 px-4 py-2 shadow border border-gray-50'>
                        <thead className='max-sm:hidden text-left'>
                            <tr className=''>
                                <th className='px-4 py-2 font-medium'>Duration</th>
                                <th className='px-4 py-2 font-medium'>Course</th>
                                <th className='px-4 py-2 font-medium'>Completed</th>
                                <th className='px-4 py-2 font-medium'>Status</th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-600'>
                            {enrolledCourseDetails && enrolledCourseDetails.map((enrolledCourse, index) => (
                                <tr key={index} className='max-sm:flex max-sm:flex-col  border-b border-gray-300'>
                                    <td className='flex flex-col md:flex-row md:items-center justify-start gap-5 px-4 py-4 md:py-2'>
                                        <img className='md:w-30' src={enrolledCourse.courseThubmnail} alt="course-thumbnail" />
                                        <div>
                                            <p>{enrolledCourse.courseTitle}</p>
                                            <Line
                                                strokeWidth={3}
                                                percent={enrolledCourse ? (enrolledCourse.completedLectures * 100) / enrolledCourse.totalLectures : 0}
                                                className='bg-gray-300 rounded-full mt-1'
                                            />
                                        </div>
                                    </td>
                                    <td className='max-sm:hidden px-4 md:py-2'>{enrolledCourse.courseDuration}</td>
                                    <td className='max-sm:hidden px-4 md:py-2'>{enrolledCourse.completedLectures}/{enrolledCourse.totalLectures} Lectures</td>
                                    <td className='px-4 py-2'><button className='max-w-full min-w-[110px] mx-auto text-sm md:text-default text-white px-2 py-1.5 bg-blue-500 rounded shadow cursor-pointer'>{enrolledCourse.courseStatus}</button></td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MyEnrollments