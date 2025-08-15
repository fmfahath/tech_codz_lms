import React from 'react'
import { educatorDashboardMenu } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='w-16 md:w-55 min-h-screen flex flex-col border-r border-gray-300 bg-gray-100'>
            {educatorDashboardMenu && educatorDashboardMenu.map((item, index) => (
                <NavLink
                    to={item.path}
                    key={index}
                    end={item.path === '/educator'}
                    className={({ isActive }) => `flex items-center gap-2 p-2 ${isActive ? 'bg-gray-200 border-r-5 border-blue-400' : 'bg-gray-100'} hover:bg-gray-200 cursor-pointer`}
                >
                    <item.icon className='md:w-8 md:h-8 text-blue-600 ' />
                    <p>{item.name}</p>
                </NavLink>
            ))}
        </div>
    )
}

export default Sidebar