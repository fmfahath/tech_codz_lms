import React, { useContext } from 'react'
import SearchBar from '../../components/student/SearchBar'
import { dummyCourses } from '../../assets/assets'
import CourseCard from '../../components/student/CourseCard'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'

const CourseList = () => {

    const { allCourses } = useContext(AppContext)

    return (
        <div className='px-10 md:px-30 py-30 scroll-smooth'>
            <div className='mb-5 md:mb-10 '>
                <p className='text-lg md:text-xl text-center text-gray-700'>Search by Course Names</p>
                <SearchBar />
            </div>
            <hr className='border border-gray-100' />
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 mt-5'>
                {
                    allCourses ? allCourses.map((course, i) => <CourseCard key={i} courseData={course} />) : <Loading />
                }
            </div>
        </div>
    )
}

export default CourseList