import React from 'react'
import { logo } from '../../assets/assets'

const Footer = () => {
    return (
        <footer className='bg-gray-900 md:px-36 text-left w-full '>
            <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/10'>
                <div className='flex flex-col md:items-start items-center w-full'>
                    <img className='w-50 h-20' src={logo.white_logo} alt="logo" />
                    <p className='mt-6 text-sm md:text-md text-center md:text-start  text-white/60'>Lorem Ipsumis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
                </div>
                <div className='flex- flex-col md:items-start items-center w-full'>
                    <h2 className='font-semibold text-white mb-5 text-center md:text-start'>Compnay</h2>
                    <ul className='flex flex-col w-full items-center md:items-start justify-between text-sm md:text-md text-white/60 space-y-2 '>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Courses</a></li>
                        <li><a href="#">Career Support</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className='flex flex-col items-center md:items-start w-full'>
                    <h2 className='font-semibold text-white mb-5'>Subscribe to our Newsletter</h2>
                    <p className='text-sm md:text-md text-white/60 text-center md:text-start'>The latest news, articles, and resources, sent to your inbox weekly.</p>
                    <div className='flex flex-col md:flex-row items-center gap-2 pt-4'>
                        <input type="email" placeholder='Enter your email ' className='border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2' />
                        <button className='w-24 h-9 btn-bg text-white rounded cursor-pointer  '>Subscibe</button>
                    </div>
                </div>
            </div>
            <p className='py-4 text-center text-xs md:text-sm text-white/60'>Copyright 2025 © TechCodz. All Right Reserved.</p>
        </footer>
    )
}

export default Footer