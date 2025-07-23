import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

const CourseCard = ({ courseData }) => {

    const { calculateRating } = useContext(AppContext)

    //rating starts
    const fullStar = Math.floor(calculateRating(courseData));
    const halfStar = calculateRating(courseData) % 1 >= 0.5 ? 1 : 0;
    const emptyStar = 5 - fullStar - halfStar;

    return (
        <Link to={`/course/${courseData._id}`}>
            {/* course thumbnail */}
            <div>
                <img src={courseData.courseThumbnail} alt="" />
            </div>
            {/* course details */}
            <div>
                <h1>{courseData.courseTitle}</h1>
                <p>Course by: {courseData.educator?.name ? courseData.educator?.name : "Verified Instructors"} </p>
                <div>

                </div>
            </div>
        </Link>
    )
}

export default CourseCard