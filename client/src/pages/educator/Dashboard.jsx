import React, { use, useContext, useEffect, useState } from 'react'
import { FaUsers } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';

const Dashboard = () => {

    const { backendUrl, getToken, userData } = useContext(AppContext)
    const [dashboardData, setDashboardData] = useState(null)

    //get dashboard data----------------------------------------------
    const fetchDashbaordData = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get(`${backendUrl}/educator/dashboard-data`, { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                setDashboardData(data.dashboardData)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchDashbaordData()
    }, [userData])


    return dashboardData ? (
        <div className='w-full min-h-screen px-2 py-1 md:px-4 md:py-2'>
            <div className='w-full md:max-w-[90%] flex flex-col md:flex-row items-center  gap-5 mb-10'>
                <div className='w-full md:max-w-[30%] flex items-center gap-5 shadow-md px-4 py-2 rounded-lg btn-bg'>
                    <FaUsers className='w-10 h-10 md:w-15 md:h-15 text-white' />
                    <div>
                        <p className='font-medium text-2xl md:text-5xl'>{dashboardData && dashboardData.enrolledStudentsData.length}</p>
                        <p className='text-lg md:text-xl'>Students Enrolled</p>
                    </div>
                </div>
                <div className='w-full md:max-w-[30%] flex items-center gap-5 shadow-md px-4 py-2 rounded-lg btn-bg'>
                    <ImBooks className='w-10 h-10 md:w-15 md:h-15 text-white' />
                    <div>
                        <p className='font-medium text-2xl md:text-5xl'>{dashboardData && dashboardData.educatorTotalCourses}</p>
                        <p className='text-lg md:text-xl'>Total Courses</p>
                    </div>
                </div>
                <div className='w-full md:max-w-[30%] flex items-center gap-5 shadow-md px-4 py-2 rounded-lg btn-bg'>
                    <RiMoneyDollarCircleFill className='w-10 h-10 md:w-15 md:h-15 text-white' />
                    <div>
                        <p className='font-medium text-2xl md:text-5xl'>{dashboardData && dashboardData.EducatorTotalEarnings}</p>
                        <p className='text-lg md:text-xl'>Total Earnings</p>
                    </div>
                </div>
            </div>

            {/* table */}
            <div className='w-full  '>
                <h3 className='text-xl '>Latest Enrollments</h3>
                <div className='w-full overflow-scroll md:overflow-hidden'>
                    <table className='w-full md:w-auto md:min-w-[80%] mt-5 border border-gray-200 shadow rounded-lg'>
                        <thead>
                            <tr className='text-left border-b border-gray-200'>
                                <th className='px-4 py-4  font-medium'>#</th>
                                <th className='px-4 py-4 font-medium'>Student Name</th>
                                <th className='px-4 py-4 font-medium'>Course Title</th>
                                {/* <th className='px-4 py-4  font-medium'>Date</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData && dashboardData.enrolledStudentsData.map((student, index) => (
                                <tr key={index} className=' border border-gray-200'>
                                    <td className='px-4 py-2'>{index + 1}</td>
                                    <td className='pr-10 pl-4 md:px-4 py-2 '>
                                        <div className='flex items-center gap-3'>
                                            <img className='w-10 h-10 rounded-full ' src={student.student.imageUrl} alt="" /><p className='whitespace-nowrap'>{student.student.name}</p>
                                        </div>
                                    </td>
                                    <td className='px-4 py-2 whitespace-nowrap'>{student.courseTitle}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    ) : (<Loading />)
}

export default Dashboard