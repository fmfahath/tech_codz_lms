import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import humanizeDuration from 'humanize-duration'
import { IoIosArrowDown } from "react-icons/io";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import YouTube from 'react-youtube'
import { TbPlayerPlayFilled } from "react-icons/tb";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';


const Player = () => {

    const { courseId } = useParams()
    const { allCourses, enrolledCourses, userData, backendUrl, getToken, fetchUserEnrolledCourses } = useContext(AppContext)
    const [courseDetails, setCourseDetails] = useState(null)
    const [toggle, setToggle] = useState({})
    const [playerData, setPlayerData] = useState(null)
    const [initialRatings, setInitialRatings] = useState(0)
    const [courseProgressData, setCourseProgressData] = useState(null)

    //getCourseDetails----------------------------
    const getCourseDetails = () => {
        enrolledCourses.map(course => {
            if (course._id === courseId) {
                setCourseDetails(course)
                course.courseRatings.map(item => {
                    if (item.userId === userData._id) {
                        setInitialRatings(item.rating)
                    }
                })
            }
        })

    }

    //get course progress-------------------------
    const fetchCourseProgressData = async () => {
        try {
            const courseId = courseDetails._id
            const token = await getToken()
            const { data } = await axios.post(`${backendUrl}/user/get-course-progress`, { courseId }, { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                setCourseProgressData(data.progressData)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }



    //ratings--------------------------------------
    const setRatings = async (rating) => {
        try {
            const token = await getToken()
            const { data } = await axios.post(`${backendUrl}/user/add-rating`, { courseId, rating }, { headers: { Authorization: `Bearer ${token}` } })
            if (data.success) {
                toast.success(data.message)
                setInitialRatings(rating)
                await fetchUserEnrolledCourses()
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("systemError: " + error.message)
        }
    }


    //toggle menu content - show/hide---------------------
    const toggleSection = (index) => {
        setToggle(prev => ({ ...prev, [index]: !prev[index] }))
    }

    //get youtube video ID and time----------------------
    const getYoutubeData = (url, lectureId, lectureTitle) => {
        const videoId = url.split('/').pop().split('?')[0]
        const query = new URLSearchParams(url.split('?')[1] || '')
        const time = query.get('t')
        return { lectureId, lectureTitle, videoId, time: time ? parseInt(time, 10) : 0 }
    }

    //update course progress - completed lecture--------------
    const markAsLectureCompleted = async (lectureId) => {
        try {
            const courseId = courseDetails._id
            const token = await getToken()
            const { data } = await axios.post(`${backendUrl}/user/update-course-progress`, { courseId, lectureId }, { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                toast.success(data.message)
                await fetchUserEnrolledCourses()
                await fetchCourseProgressData()
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (courseDetails) {
            fetchCourseProgressData()
        }
    }, [courseDetails])


    useEffect(() => {
        if (courseId && allCourses.length > 0) {
            getCourseDetails()
        }
    }, [courseId, allCourses])



    return courseDetails ? (
        <div className='w-full min-h-screen px-4 md:px-30 pt-[30%] md:pt-[10%] mb-10'>
            <h1 className='text-xl md:text-2xl font-medium'>Course Structure</h1>
            <div className='flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-5 mt-10'>
                {/* course structure */}
                <div className='w-full md:flex-1'>
                    {courseDetails && courseDetails.courseContent.map((chapter, index) => (
                        <div key={index} className='bg-gray-500/5 mb-2 shadow rounded px-2 py-4 '>
                            <div className='flex   items-center justify-start gap-2 cursor-pointer' onClick={() => toggleSection(index)}>
                                <IoIosArrowDown className={`transform transition-transform  ${toggle[index] ? "rotate-180" : ""}`} />
                                <p className='font-medium'>{chapter.chapterTitle}</p>
                            </div>
                            <div className={`w-full ${toggle[index] ? "max-h-96" : "max-h-0"} overflow-hidden transition-all duration-300 ease-in-out `}>
                                {chapter.chapterContent.map((lecture, i) => (
                                    <div key={i} className='flex  md:flex-row items-center justify-between gap-5 pl-2 md:pl-5 text-gray-700 mt-2 '>
                                        <div className='md:w-auto flex items-start gap-2 '>
                                            {courseProgressData && courseProgressData.lectureCompleted.includes(lecture.lectureId) ?
                                                <IoCheckmarkDoneCircleSharp className='text-blue-500' /> :
                                                <IoCheckmarkDoneCircleOutline />
                                            }

                                            <p className='w-55 md:min-w-100 truncate'>{lecture.lectureTitle}</p>
                                        </div>
                                        <div className='md:w-[30%] flex items-start justify-end md:justify-start gap-5 '>
                                            <Link
                                                className='text-blue-500'
                                                onClick={() => setPlayerData(getYoutubeData(lecture.lectureUrl, lecture.lectureId, lecture.lectureTitle))}
                                            >Play
                                            </Link>
                                            <p className='hidden md:block'>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ["h", "m"] })}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    ))}
                </div>

                {/* player */}
                <div className='w-auto md:w-[45%] mt-5 md:mt-0  '>
                    {playerData ?
                        (<div className='w-full]'>
                            <YouTube
                                videoId={playerData.videoId}
                                opts={{
                                    playerVars: {
                                        autoplay: 1,
                                        start: playerData.time || 0
                                    }
                                }}
                                iframeClassName='w-full aspect-video'
                            />
                            <div className='flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-2 mt-2'>
                                <p className='text-blue-700 md:w-110 truncate text-wrap md:text-nowrap'>{playerData.lectureTitle} </p>
                                <button className='bg-blue-500 px-2 py-1 rounded shadow-lg text-white text-sm cursor-pointer hover:bg-blue-600' onClick={() => markAsLectureCompleted(playerData.lectureId)}>Mark as Completed</button>
                            </div>
                        </div>
                        ) :
                        (<div className='flex flex-col items-center justify-center gap-5 bg-black w-full md:min-w-[550px] h-[180px] md:min-h-[250px] text-white'>
                            <p className='text-center'>CLick the <span className='text-blue-500 italic'>Play</span> Link to View the Free Lecture Videos</p>
                            <TbPlayerPlayFilled className='w-10 h-10 md:w-15 md:h-15 bg-blue-500 hover:bg-blue-400 rounded-full p-2 cursor-pointer ' onClick={() => setPlayerData(getYoutubeData(courseDetails?.courseContent[0]?.chapterContent[0]?.lectureUrl))} />
                        </div>)
                    }
                </div>
            </div>


            {/* course rating */}
            <div className='flex items-center gap-5 text-lg md:text-xl font-medium mt-5'>
                <h2>Rate this course</h2>
                <div className='flex gap-1 text-[25px] text-yellow-400 cursor-pointer'>
                    {initialRatings && initialRatings >= 0 ? [...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <span key={index} onClick={() => setRatings(index)}>
                                {index <= initialRatings ? <FaStar /> : <FaRegStar />}
                            </span>
                        )
                    }) : [...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <span key={index} onClick={() => setRatings(index)}>
                                {index <= initialRatings ? <FaStar /> : <FaRegStar />}
                            </span>
                        )
                    })
                    }
                </div>
            </div>
        </div >
    ) : (<Loading />)
}

export default Player