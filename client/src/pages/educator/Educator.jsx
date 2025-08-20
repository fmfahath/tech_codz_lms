import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/educator/Sidebar'

const Educator = () => {
    return (
        <div className='w-full h-full min-h-screen pt-[30%] md:pt-[5%]  '>
            <p className='text-lg md:text-xl font-medium ml-5 my-5'>Admin Panel</p>
            <div className='flex border-t border-gray-300'>
                {/* sidebar */}
                <div className=''>
                    <Sidebar />
                </div>

                {/* content */}
                <div className='flex-1 p-4 overflow-scroll md:overflow-hidden'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Educator