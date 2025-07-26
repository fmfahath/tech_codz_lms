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
import humanizeDuration from 'humanize-duration'
import { TbPlayerPlayFilled } from "react-icons/tb";

const CourseDetails = () => {

    const { id } = useParams()
    const { allCourses, calculateRating } = useContext(AppContext)
    const [courseData, setCourseData] = useState(null)
    const [stars, setStars] = useState({ full: 0, half: 0, empty: 0 })
    const [rating, setRating] = useState(0)
    const [toggle, setToggle] = useState({})
    const [playerData, setPlayerData] = useState(null)


    //rating stars------------------------
    const ratingStar = () => {
        const rating = calculateRating(courseData);
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5 ? 1 : 0;
        const empty = 5 - (full + half);

        setStars({ full, half, empty })
        setRating(rating)
    }

    //fetching course's data------------------
    const fetchCourseData = async () => {
        setCourseData(await allCourses.find(course => (course._id === id)))
    }

    // calculate chapter-------------------
    const calculateChapterDuration = (chapter) => {
        let chapterDuration = 0;

        chapterDuration = chapter.chapterContent.reduce((acc, lecture) => (acc + lecture.lectureDuration), 0)
        return humanizeDuration(chapterDuration * 60 * 1000, { units: ["h", "m"] })
    }

    //toggle div show/hide-------------------
    const toggleSection = (index) => {
        setToggle((prev) => ({ ...prev, [index]: !prev[index] }))
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
            <div className='w-full flex flex-col md:flex-row justify-start gap-5 py-4 px-6 bg-lue rounded-md shadow-lg'>
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
                <p className='text-xl font-semibold text-gray-800 mb-5 md:mb-10'>Course Structure</p>
                <div className='flex flex-col md:flex-row justify-between gap-5'>
                    {/* chapter */}
                    <div className='flex-1'>
                        {courseData?.courseContent?.map((chapter, index) => (
                            <div key={index} className=' bg-white border border-gray-200 rounded shadow-md'>
                                <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-2 p-2 border-b border-gray-200 cursor-pointer' onClick={(prev) => toggleSection(index)}>
                                    <div className='flex items-center gap-2'>
                                        <IoIosArrowDown className={`self-center transform transition-transform ${toggle[index] ? "rotate-180" : ""}`} />
                                        <p className=''>{chapter.chapterTitle}</p>
                                    </div>
                                    <div className='text-sm md:text-[14px] italic'>
                                        <p className='ml-6 md:ml-0'>{`${chapter.chapterContent.length} Lectures -  ${calculateChapterDuration(chapter)}`}</p>
                                    </div>
                                </div>
                                <div className={`px-2 ${toggle[index] ? "max-h-96" : "max-h-0"} overflow-hidden transition-all duration-300 ease-in-out`}>
                                    {
                                        chapter.chapterContent.map((chapterContent, i) => (
                                            <div key={i} className={`flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-sm md:text-[15px] font-light my-2 md:my-4`}>
                                                <div className='flex gap-4 items-center justify-start ml-5'>
                                                    <MdOutlineSlowMotionVideo />
                                                    <p>{chapterContent.lectureTitle}</p>
                                                </div>
                                                <div className='flex gap-4 items-center ml-auto justify-between'>
                                                    <Link onClick={() => setPlayerData(chapterContent.lectureUrl.split('/').pop())} className='text-blue-500 cursor-pointer italic'>{chapterContent.isPreviewFree && "Preview"}</Link>
                                                    <p className='text-gray-700 text-[13px] italic'>{humanizeDuration(chapterContent.lectureDuration * 60 * 1000, { units: ["h", "m"] })}</p>
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
                        {playerData ? <YouTube videoId={playerData} opts={{ playerVars: { autoplay: 1 } }} iframeClassName='w-full aspect-video' /> :
                            <div className='flex flex-col items-center justify-center gap-5 bg-black w-full md:min-w-[550px] h-[180px] md:min-h-[250px] text-white'>
                                <p className='text-center'>CLick the <span className='text-blue-500 italic'>Preview</span> Link to View the Free Lecture Videos</p>
                                <TbPlayerPlayFilled className='w-10 h-10 md:w-15 md:h-15 bg-blue-500 hover:bg-blue-400 rounded-full p-2 cursor-pointer ' onClick={() => setPlayerData(courseData?.courseContent[0]?.chapterContent[0]?.lectureUrl.split('/').pop())} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CourseDetails