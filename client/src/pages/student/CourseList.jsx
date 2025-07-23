import React, { useContext } from 'react'
import SearchBar from '../../components/student/SearchBar'
import { dummyCourses } from '../../assets/assets'
import CourseCard from '../../components/student/CourseCard'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'

const CourseList = () => {

    const { allCourses } = useContext(AppContext)

    return (
        <div className='px-10 md:px-30 py-30'>
            <div className='mb-5 md:mb-10 '>
                <p className='text-lg md:text-xl text-center text-gray-700'>Search by Course Names</p>
                <div className=''>
                    <SearchBar />
                </div>
            </div>
            <hr className='border border-gray-100' />
            <div className='grid grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] md:grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-2 md:gap-4  mt-5'>
                {
                    allCourses ? allCourses.map((course, i) => <CourseCard key={i} courseData={course} />) : <Loading />
                }
            </div>
        </div>
    )
}

export default CourseList