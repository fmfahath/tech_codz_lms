import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import YouTube from 'react-youtube'


const CourseDetails = () => {

    const { id } = useParams()
    const { allCourses, calculateRating } = useContext(AppContext)
    const [courseData, setCourseData] = useState(null)
    const [stars, setStars] = useState({ full: 0, half: 0, empty: 0 })
    const [rating, setRating] = useState(0)

    //rating stars
    const ratingStar = () => {
        const rating = calculateRating(courseData);
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5 ? 1 : 0;
        const empty = 5 - (full + half);

        setStars({ full, half, empty })
        setRating(rating)
    }

    //fetching course's data
    const fetchCourseData = async () => {
        setCourseData(await allCourses.find(course => (course._id === id)))
    }

    useEffect(() => {
        if (allCourses && allCourses.length > 0) {
            fetchCourseData()
        }

    }, [id, allCourses])

    useEffect(() => {
        if (courseData) {
            ratingStar()
        }
    }, [courseData])


    return (
        <div className='w-full min-h-screen px-5 md:px-30 pt-[20%] md:pt-[10%] mb-10 bg-gray-50'>
            {/* course heading card */}
            <div className='w-full flex flex-col md:flex-row justify-start gap-5 py-4 px-6 bg-white rounded-md shadow-lg'>
                <div className=''>
                    <img className=' md:max-w-[350px] rounded-md' src={courseData?.courseThumbnail} alt="course-thubmnail" />
                </div>
                <div className='md:max-w-[600px] '>
                    <div className=''>
                        <h1 className='font-roboto text-gray-800 text-[23px] md:text-3xl font-medium md:font-semibold '>{courseData?.courseTitle}</h1>
                        <p className='text-gray-800 mt-2' dangerouslySetInnerHTML={{ __html: courseData?.courseDescription?.slice(0, 150) }}></p>
                    </div>
                    <div className=''>
                        <p className='my-4 text-sm md:text-[15px] italic text-gray-600'>Course by: {courseData?.educator?.name ? courseData.educator.name : "Experienced Lecturer"}</p>
                        <div className='flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4'>
                            <div className='flex items-center gap-1 my-1 text-yellow-500'>
                                {[...Array(stars.full)].map((_, i) => (<FaStar key={i} />))}
                                {stars.half > 0 && <FaRegStarHalfStroke />}
                                {[...Array(stars.empty)].map((_, i) => <FaRegStar key={i} />)}
                            </div>
                            <div className='flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 italic text-sm  text-gray-600'>
                                <p>({courseData && rating}) Ratings</p>
                                <p>({courseData && courseData.enrolledStudents.length}) Students Enrolled</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-1 flex-col items-center justify-center'>
                    <p className='text-4xl font-semibold'>${(courseData?.coursePrice - (courseData?.coursePrice / 100) * courseData?.discount).toFixed(2)}</p>
                    <div className='flex gap-4 text-red-400'>
                        <p className='line-through'>${courseData?.coursePrice}</p>
                        <p className=''>{courseData?.discount}% off</p>
                    </div>
                    <Link to='#' className='flex items-center justify-between gap-2 btn-bg py-2 px-4 mt-4 md:text-lg shadow-lg'>Enroll Now <RiArrowRightDoubleLine /></Link>
                </div>
            </div>

            {/* course description */}
            <div className='flex md:gap-x-10 gap-y-5'>
                <div className='py-20 text-sm md:text-default'>
                    <p className='text-xl font-semibold text-gray-800'>Course Description</p>
                    <p className='rich-text max-w-[900px]' dangerouslySetInnerHTML={{ __html: courseData?.courseDescription }}></p>
                </div>
            </div>

            {/* course structure */}
            <div className=''>
                <p className='text-xl font-semibold text-gray-800 mb-10'>Course Structure</p>
                <div className='flex justify-between gap-5'>
                    {/* chapter */}
                    <div className='flex-1'>
                        {courseData?.courseContent?.map((chapter, index) => (
                            <div key={index} className=' bg-white border border-gray-200 rounded shadow-md'>
                                <div className='flex items-center justify-between gap-2 p-2 border-b border-gray-200 cursor-pointer '>
                                    <div className='flex items-center gap-2'>
                                        <IoIosArrowDown className='self-center' />
                                        <p className=''>{chapter.chapterTitle}</p>
                                    </div>
                                    <div className='text-sm md:text-[15px]'>
                                        <p>2 Lectures - 23 Minutes </p>
                                    </div>
                                </div>
                                <div className='p-2'>
                                    {
                                        chapter.chapterContent.map((chapterContent, i) => (
                                            <div key={i} className='flex gap-4 items-center justify-between text-sm md:text-[15px] font-light my-2 md:my-4'>
                                                <div className='flex gap-4 items-center justify-start ml-5'>
                                                    <MdOutlineSlowMotionVideo />
                                                    <p>{chapterContent.lectureTitle}</p>
                                                </div>
                                                <div className='flex gap-4 items-center justify-between'>
                                                    <Link className='text-blue-500 cursor-pointer'>{chapterContent.isPreviewFree && "Preview"}</Link>
                                                    <p>{chapterContent.lectureDuration} Minutes</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))}

                    </div>
                    {/* video player */}
                    <div className=''>
                        <YouTube videoId="" opts={{ playerVars: { autoplay: 1 } }} iframeClassName='w-full aspect-video' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetails