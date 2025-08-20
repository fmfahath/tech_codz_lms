import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const MyCourses = () => {

    const educatorId = "675ac1512100b91a6d9b8b24"
    const { allCourses } = useContext(AppContext)

    //calculate earnings----------------
    const calculateEarnings = (courseData) => {
        const discount = (courseData.coursePrice * courseData.discount) / 100;
        const totalEarings = courseData.coursePrice - discount * courseData.enrolledStudents.length;
        return totalEarings.toFixed(2);
    }

    return (
        <div className='w-full min-h-screen px-4 py-2'>
            <h3 className='text-xl '>My Courses</h3>
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
                    {allCourses && allCourses.filter(course => course.educator === educatorId).map((course, index) => (
                        <tr key={course._id} className='text-left text-gray-600 border-b border-gray-200'>
                            <td className='px-4 py-2 '>{index + 1}</td>
                            <td className='px-4 py-2 flex items-center gap-2'>
                                <img src={course.courseThumbnail} alt="" className='w-25' />
                                <p>{course.courseTitle}</p>
                            </td>
                            <td className='px-4 py-2 '>${calculateEarnings(course)}</td>
                            <td className='px-4 py-2 '>{course.enrolledStudents.length}</td>
                            <td className='px-4 py-2 '>{new Date(course.createdAt).toLocaleDateString("en-GB")}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default MyCourses