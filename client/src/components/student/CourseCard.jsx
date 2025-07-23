import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";

const CourseCard = ({ courseData }) => {

    const { calculateRating } = useContext(AppContext)


    //rating stars
    const fullStar = Math.floor(calculateRating(courseData));
    const halfStar = calculateRating(courseData) % 1 >= 0.5 ? 1 : 0;
    const emptyStar = 5 - fullStar - halfStar;

    return (
        <Link to={`/course/${courseData._id}`} className='flex-shrink-0  max-w-[150px] md:max-w-[300px] bg-white hover:bg-gray-50 border border-gray-200 rounded shadow hover:shadow-lg p-2'>
            {/* course thumbnail */}
            <div className='w-full'>
                <img src={courseData.courseThumbnail} alt="" className='rounded' />
            </div>
            {/* course details */}
            <div className='mt-2'>
                <h1 className='text-md md:text-lg font-semibold truncate'>{courseData.courseTitle}</h1>
                <p className='text-[10px] md:text-sm text-gray-600'>Course by: {courseData.educator?.name ? courseData.educator?.name : "Verified Instructors"} </p>
                <div className='flex items-center gap-1 my-1 text-yellow-500'>
                    {[...Array(fullStar)].map((_, i) => <FaStar key={i} />)}
                    {halfStar > 0 && <FaRegStarHalfStroke />}
                    {[...Array(emptyStar)].map((_, i) => <FaRegStar key={i} />)}
                </div>
                <p className='text-lg font-light'>$ {courseData.coursePrice}</p>
            </div>
        </Link>
    )
}

export default CourseCard