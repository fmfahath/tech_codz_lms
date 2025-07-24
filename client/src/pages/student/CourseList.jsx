import React, { useContext, useEffect, useState } from 'react'
import SearchBar from '../../components/student/SearchBar'
import { dummyCourses } from '../../assets/assets'
import CourseCard from '../../components/student/CourseCard'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import { useNavigate, useParams } from 'react-router-dom'
import { IoMdCloseCircle } from "react-icons/io";

const CourseList = () => {

    const { allCourses } = useContext(AppContext)
    const [filteredCourses, setFilteredCourses] = useState([])
    const { input } = useParams()
    const navigate = useNavigate()



    //filter courses based on search
    useEffect(() => {
        if (allCourses && allCourses.length > 0) {
            const tempCourses = allCourses.slice()

            input ? setFilteredCourses(tempCourses.filter(course =>
                course.courseTitle.toLowerCase().includes(input.toLowerCase())
            )) : setFilteredCourses(tempCourses)
        }
    }, [input, allCourses])


    return (
        <div className='px-10 md:px-30 py-30'>
            <div className='mb-5 md:mb-10 '>
                <p className='text-lg md:text-xl text-center text-gray-700'>Search by Course Names</p>
                <div className=''>
                    <SearchBar />
                </div>
            </div>
            <hr className='border border-gray-100' />
            {input && <div className='my-2'>
                <p className='text-gray-700'>Search word: <span className='inline-flex items-center gap-1 py-1 px-2 bg-gray-300/70 hover:bg-red-200 rounded-md shadow-md cursor-pointer'>{input}<IoMdCloseCircle className='text-red-500 cursor-pointer' onClick={() => navigate('/course-list')} /></span></p>
            </div>}
            <div className='grid grid-cols-[repeat(auto-fill,_minmax(100px,1fr))] md:grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] gap-2 md:gap-4  mt-5'>
                {
                    filteredCourses ? filteredCourses.map((course, i) => <CourseCard key={i} courseData={course} />) : <Loading />
                }
            </div>
        </div>
    )
}

export default CourseList