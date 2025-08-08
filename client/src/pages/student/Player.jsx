import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import humanizeDuration from 'humanize-duration'
import { IoIosArrowDown } from "react-icons/io";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const Player = () => {

    const { courseId } = useParams()
    const { allCourses } = useContext(AppContext)
    const [courseDetails, setCourseDetails] = useState(null)

    //getCourseDetails
    const getCourseDetails = () => {
        const courseData = allCourses.find(course => course._id === courseId)
        setCourseDetails(courseData)
    }

    useEffect(() => {
        if (courseId) {
            getCourseDetails()
        }
    }, [courseId, allCourses])



    return (
        <div className='w-full min-h-screen px-4 md:px-30 pt-[30%] md:pt-[10%] mb-10'>
            <h1 className='text-xl md:text-2xl font-medium'>Course Structure</h1>
            {courseDetails && (
                <div className='mt-10'>
                    {/* course structure */}
                    <div>
                        {courseDetails?.courseContent.map((chapter, index) => (
                            <div key={index} className='bg-gray-500/5 mb-2 px-4 py-2 shadow rounded'>
                                <div key={index} className='flex items-center justify-start gap-2 cursor-pointer'>
                                    <IoIosArrowDown />
                                    <p className='font-medium'>{chapter.chapterTitle}</p>
                                </div>
                                <div className="">
                                    {chapter.chapterContent.map((lecture, i) => (
                                        <div key={i} className=' flex items-center justify-between pl-5 text-gray-700 mt-2'>
                                            <div className='flex items-center gap-2'>
                                                {/* <IoCheckmarkDoneCircleOutline /> */}
                                                <IoCheckmarkDoneCircleSharp className='text-blue-500' />
                                                <p>{lecture.lectureTitle}</p>
                                            </div>
                                            <div className='flex items-center justify-start gap-5'>
                                                <a href="#">Link</a>
                                                <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ["h", "m"] })}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        ))}
                    </div>

                    {/* player */}
                    <div>

                    </div>
                </div>
            )}
        </div >
    )
}

export default Player