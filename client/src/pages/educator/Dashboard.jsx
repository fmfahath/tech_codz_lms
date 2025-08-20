import React from 'react'
import { FaUsers } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const Dashboard = () => {
    return (
        <div className='w-full min-h-screen px-4 py-2'>
            <div className='flex flex-col md:flex-row items-center  gap-5 mb-10'>
                <div className=' flex flex-col md:flex-row items-center gap-5 shadow-md px-4 py-2 rounded-lg btn-bg mb'>
                    <FaUsers className='w-15 h-15 text-white' />
                    <div>
                        <p className='font-medium text-2xl md:text-5xl'>10</p>
                        <p className='text-lg md:text-xl'>Students Enrolled</p>
                    </div>
                </div>
                <div className=' flex items-center gap-5 shadow-md px-4 py-2 rounded-lg btn-bg'>
                    <ImBooks className='w-15 h-15 text-white' />
                    <div>
                        <p className='font-medium text-2xl md:text-5xl'>03</p>
                        <p className='text-lg md:text-xl'>Total Courses</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 shadow-md px-4 py-2 rounded-lg btn-bg'>
                    <RiMoneyDollarCircleFill className='w-15 h-15 text-white' />
                    <div>
                        <p className='font-medium text-2xl md:text-5xl'>$123.45</p>
                        <p className='text-lg md:text-xl'>Total Earnings</p>
                    </div>
                </div>
            </div>

            {/* table */}
            <div className=''>
                <h3 className='text-xl '>Latest Enrollments</h3>
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
                        <tr className='text-left text-gray-600 border-b border-gray-200'>
                            <td className='px-4 py-2 '>1</td>
                            <td className='px-4 py-2 '>Fahath</td>
                            <td className='px-4 py-2 '>React for Beginners</td>
                            <td className='px-4 py-2 '>2023-10-01</td>
                        </tr>
                        <tr className='text-left text-gray-600 border-b border-gray-200'>
                            <td className='px-4 py-2 '>2</td>
                            <td className='px-4 py-2 '>David</td>
                            <td className='px-4 py-2 '>Python for Data SCience</td>
                            <td className='px-4 py-2 '>2023-10-06</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard