import React, { useContext, useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import humanizeDuration from 'humanize-duration'
import { Line } from 'rc-progress'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../../components/student/Loading'

const MyEnrollments = () => {

    const { allCourses, enrolledCourses, backendUrl, getToken, userData } = useContext(AppContext)
    const [enrolledCourseDetails, setEnrolledCourseDetails] = useState(null)
    const navigate = useNavigate()

    // calculate chapter duration-------------------
    const calculateChapterDuration = (chapter) => {
        let chapterDuration = 0;

        return chapterDuration = chapter.chapterContent.reduce((acc, lecture) => (acc + lecture.lectureDuration), 0)
    }

    //fetch enrolled course data---------------------
    const fetchEnrolledCourseDetails = async () => {
        const enrolledCourseData = await Promise.all(
            enrolledCourses.map(async (course) => {
                try {
                    let tempCourseDuration = 0;
                    let tempTotalLectures = 0;
                    let tempCourseStatus = null;
                    let tempCompletedLectures = 0;

                    //total lectures & course duration
                    course.courseContent.map(chapter => {
                        tempTotalLectures += chapter.chapterContent.length
                        tempCourseDuration += calculateChapterDuration(chapter)
                    })

                    //total course duration in human redable format
                    tempCourseDuration = humanizeDuration(tempCourseDuration * 60 * 1000, { units: ["h", "m"] })

                    //get course id, thumbnail & title
                    const tempCourseId = course._id;
                    const tempCourseThumbnail = course.courseThumbnail;
                    const tempCourseTitle = course.courseTitle;

                    //get completed ltecture & course status
                    const token = await getToken()
                    const { data } = await axios.post(`${backendUrl}/user/get-course-progress`,
                        { courseId: course._id },
                        { headers: { Authorization: `Bearer ${token}` } }
                    )

                    if (data.success) {
                        tempCompletedLectures = data.progressData.lectureCompleted.length;
                        tempCourseStatus = data.progressData.completed
                    } else {
                        toast.error(data.message)
                    }

                    const tempCourseDetails = {
                        courseId: tempCourseId,
                        courseThubmnail: tempCourseThumbnail,
                        courseTitle: tempCourseTitle,
                        totalLectures: tempTotalLectures,
                        completedLectures: tempCompletedLectures,
                        courseDuration: tempCourseDuration,
                        courseStatus: tempCourseStatus
                    }

                    return tempCourseDetails

                } catch (error) {
                    toast.error(error.message)
                }
            })
        )

        setEnrolledCourseDetails(enrolledCourseData)
    }

    useEffect(() => {
        if (userData) {
            fetchEnrolledCourseDetails()
        }
    }, [userData, allCourses])

    return enrolledCourseDetails ? (
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
                                        <div className='w-full'>
                                            <p>{enrolledCourse.courseTitle}</p>
                                            <Line
                                                strokeWidth={4}
                                                percent={enrolledCourse ? (enrolledCourse.completedLectures * 100) / enrolledCourse.totalLectures : 0}
                                                className='bg-gray-300 rounded-full mt-1 w-[50%]'
                                            />
                                        </div>
                                    </td>
                                    <td className='max-sm:hidden px-4 md:py-2'>{enrolledCourse.courseDuration}</td>
                                    <td className='max-sm:hidden px-4 md:py-2'>{enrolledCourse.completedLectures}/{enrolledCourse.totalLectures} Lectures</td>
                                    <td className='px-4 py-2'>
                                        <button onClick={() => navigate(`/player/${enrolledCourse.courseId}`)} className={`max-w-full min-w-[110px] mx-auto text-sm md:text-default text-white px-2 py-1.5 ${enrolledCourse.completedLectures == enrolledCourse.totalLectures ? "bg-green-500" : "btn-bg"} rounded shadow cursor-pointer`}>{enrolledCourse.completedLectures == enrolledCourse.totalLectures ? "Completed" : "On Going"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    ) : (<Loading />)
}

export default MyEnrollments