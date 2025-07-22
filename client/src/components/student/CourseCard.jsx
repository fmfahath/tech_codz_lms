import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const CourseCard = () => {

    const { allCourses } = useContext(AppContext)

    return (
        <div>CourseCard</div>
    )
}

export default CourseCard