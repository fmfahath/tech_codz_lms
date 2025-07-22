import React from 'react'
import SearchBar from '../../components/student/SearchBar'
import { dummyCourses } from '../../assets/assets'
import CourseCard from '../../components/student/CourseCard'

const CourseList = () => {
    return (
        <div className='px-10 md:px-30 py-30  '>
            <div className='mb-5 md:mb-10 '>
                <p className='text-lg md:text-xl text-center text-gray-700'>Search by Course Names</p>
                <SearchBar />
            </div>
            <hr className='border border-gray-100' />
            <div>

            </div>
        </div>
    )
}

export default CourseList