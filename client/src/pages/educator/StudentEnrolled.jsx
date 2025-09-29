import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../../components/student/Loading'

const StudentEnrolled = () => {

    const { userData, backendUrl, getToken } = useContext(AppContext)
    const [enrolledStudentData, setEnrolledStudentData] = useState(null)

    //fetch enrolled students data----------------
    const fetchEnrolledStudentsData = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get(`${backendUrl}/educator/enrolled-students-data`, { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                setEnrolledStudentData(data.enrolledStudentsData)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchEnrolledStudentsData()
    }, [userData])

    return enrolledStudentData ? (
        <div className='w-full min-h-screen px-4 py-2'>
            <h3 className='text-xl '>Enrolled Students</h3>
            <div className='w-full overflow-scroll md:overflow-hidden'>
                <table className='w-auto min-w-[80%] mt-5 border border-gray-200 shadow rounded-lg'>
                    <thead>
                        <tr className='text-left border-b border-gray-200'>
                            <th className='px-4 py-4  font-medium'>#</th>
                            <th className='px-4 py-4 font-medium'>Student Name</th>
                            <th className='px-4 py-4 font-medium'>Course Title</th>
                            <th className='px-4 py-4  font-medium'>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrolledStudentData && enrolledStudentData.map((enrollment, index) => (
                            <tr key={index} className=' border border-gray-200'>
                                <td className='px-4 py-2'>{index + 1}</td>
                                <td className='pr-10 pl-4 md:px-4 py-2 '>
                                    <div className='flex items-center gap-3'>
                                        <img className='w-10 h-10 rounded-full ' src={enrollment.student.imageUrl} alt="" /><p className='whitespace-nowrap'>{enrollment.student.name}</p>
                                    </div>
                                </td>
                                <td className='px-4 py-2 whitespace-nowrap'>{enrollment.courseTitle}</td>
                                <td className='px-4 py-2 whitespace-nowrap'>{new Date(enrollment.purchaseDate).toLocaleDateString("en-GB")}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    ) : (<Loading />)
}

export default StudentEnrolled