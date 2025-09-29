import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../../components/student/Loading'

const MyCourses = () => {

    const { userData, backendUrl, getToken } = useContext(AppContext)
    const [educatorCourses, setEducatorCourses] = useState(null)

    //fetch educator courses----------------
    const fetchEducatorCourses = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get(`${backendUrl}/educator/courses`, { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                setEducatorCourses(data.courses)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    //calculate earnings----------------
    const calculateEarnings = (courseData) => {
        const discount = (courseData.coursePrice * courseData.discount) / 100;
        const totalEarings = (courseData.coursePrice - discount) * courseData.enrolledStudents.length;
        return totalEarings.toFixed(2);
    }

    useEffect(() => {
        fetchEducatorCourses()
    }, [userData])

    return educatorCourses ? (
        <div className='w-full min-h-screen px-4 py-2 '>
            <h3 className='text-xl '>My Courses</h3>
            <div className='w-full overflow-scroll md:overflow-hidden'>
                <table className='w-auto min-w-[80%] mt-5 border border-gray-200 shadow rounded-lg'>
                    <thead>
                        <tr className='text-left border-b border-gray-200'>
                            <th className='px-4 py-4  font-medium'>#</th>
                            <th className='px-4 py-4 font-medium'>All Courses</th>
                            <th className='px-4 py-4 font-medium'>Earnings</th>
                            <th className='px-4 py-4  font-medium'>Students</th>
                            <th className='px-4 py-4  font-medium'>Published On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {educatorCourses && educatorCourses.map((course, index) => (
                            <tr key={course._id} className='text-left text-gray-600 border-b border-gray-200'>
                                <td className='px-4 py-2 '>{index + 1}</td>
                                <td className='px-4 py-2 flex items-center gap-2'>
                                    <img src={course.courseThumbnail} alt="" className='w-25' />
                                    <p className='text-nowrap overflow-hidden'>{course.courseTitle}</p>
                                </td>
                                <td className='px-4 py-2 text-nowrap'>${calculateEarnings(course)}</td>
                                <td className='px-4 py-2 text-nowrap'>{course.enrolledStudents.length}</td>
                                <td className='px-4 py-2 text-nowrap'>{new Date(course.createdAt).toLocaleDateString("en-GB")}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    ) : (<Loading />)
}

export default MyCourses