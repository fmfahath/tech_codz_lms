import React, { Fragment } from 'react'
import { dummyTestimonial } from '../../assets/assets'
import { FaQuoteLeft } from "react-icons/fa6";

const Testimonial = () => {
    return (
        <div className='py-8 md:py-10 mt-7 md:mt-10 bg-gray-100'>
            <div className=''>
                <div className='md:max-w-[900px] mx-auto p-4'>
                    <h1 className='font-roboto text-2xl text-gray-700 md:text-3xl font-medium text-center'>Real Experiences - Real Impact</h1>
                    <p className='font-roboto text-lg md:text-xl font-light text-center  mx-auto mt-3'>Discover how learners from all walks of life have enhanced their skills, gained confidence, and achieved their goals through our engaging and practical courses.</p>
                </div>

                <div className="w-full overflow-hidden bg-gray-100 py-8 relative">
                    {/* right-to-left marquee */}
                    <div className="w-max flex gap-4 animate-marquee-left whitespace-nowrap">
                        {
                            dummyTestimonial?.map((testimo, index) => (
                                <Fragment key={index + "set-1"}>
                                    <div key={index + "-copy-1"} className='max-w-[300px] md:max-w-[450px] h-[180px] md:h-[200px]  bg-white border border-cyan-600/50 rounded-lg shadow-md p-5'>
                                        <div className='flex items-center justify-center gap-4'>
                                            <FaQuoteLeft className=' text-cyan-500 w-15 h-15 md:w-20 md:h-20 ' />
                                            <p className='text-sm md:text-md   font-light text-wrap'> {testimo.feedback} </p>
                                        </div>
                                        <div className='flex items-center justify-end gap-5 mt-5'>
                                            <div>
                                                <p className='text-sm md:text-md  text-end'>{testimo.name}</p>
                                                <p className='text-sm text-gray-500 text-end'>{testimo.role}</p>
                                            </div>
                                            <img src={testimo.image} alt="Profile" className='w-[50px] h-[50px] rounded-full' />
                                        </div>
                                    </div>
                                    <div key={index + "-copy-1-copy"} className='max-w-[300px] md:max-w-[450px] h-[180px] md:h-[200px]  bg-white border border-pink-600/50 rounded-lg shadow-md p-5'>
                                        <div className='flex items-center justify-start  gap-4'>
                                            <FaQuoteLeft className=' text-cyan-500 w-15 h-15 md:w-20 md:h-20 ' />
                                            <p className='text-sm md:text-md   font-light text-wrap'> {testimo.feedback} </p>
                                            {/* <FaQuoteRight /> */}
                                        </div>
                                        <div className='flex items-center justify-end gap-5 mt-5'>
                                            <div>
                                                <p className='text-sm md:text-md  text-end'>{testimo.name}</p>
                                                <p className='text-sm text-gray-500 text-end'>{testimo.role}</p>
                                            </div>
                                            <img src={testimo.image} alt="Profile" className='w-[50px] h-[50px] rounded-full' />
                                        </div>
                                    </div>
                                </Fragment>

                            ))
                        }
                    </div>

                    {/* left-to-right marquee */}
                    <div className="w-max flex gap-4 animate-marquee-right whitespace-nowrap mt-3">
                        {
                            dummyTestimonial?.map((testimo, index) => (
                                <Fragment key={index + "-set-2"}>
                                    <div key={index + "-copy-2"} className='max-w-[300px] md:max-w-[450px] h-[180px] md:h-[200px]  bg-white border border-amber-500/50 rounded-lg shadow-md p-2 md:p-5'>
                                        <div className='flex items-center justify-center gap-2 md:gap-4'>
                                            <FaQuoteLeft className=' text-cyan-500 w-15 h-15 md:w-20 md:h-20 ' />
                                            <p className='text-sm md:text-md font-light text-wrap'> {testimo.feedback} </p>
                                            {/* <FaQuoteRight /> */}
                                        </div>
                                        <div className='flex items-center justify-end gap-5 mt-5'>
                                            <div>
                                                <p className='text-sm md:text-md  text-end'>{testimo.name}</p>
                                                <p className='text-sm text-gray-500 text-end'>{testimo.role}</p>
                                            </div>
                                            <img src={testimo.image} alt="Profile" className='w-[50px] h-[50px] rounded-full' />
                                        </div>
                                    </div>
                                    <div key={index + "-copy-2-copy"} className='max-w-[300px] md:max-w-[450px] h-[180px] md:h-[200px]  bg-white border border-teal-700/50 rounded-lg shadow-md p-5'>
                                        <div className='flex items-center justify-start  gap-4'>
                                            <FaQuoteLeft className=' text-cyan-500 w-15 h-15 md:w-20 md:h-20' />
                                            <p className='text-sm md:text-md  font-light text-wrap'> {testimo.feedback} </p>
                                            {/* <FaQuoteRight /> */}
                                        </div>
                                        <div className='flex items-center justify-end gap-5 mt-5'>
                                            <div>
                                                <p className='text-sm md:text-md text-end'>{testimo.name}</p>
                                                <p className='text-sm text-gray-500 text-end'>{testimo.role}</p>
                                            </div>
                                            <img src={testimo.image} alt="Profile" className='w-[50px] h-[50px] rounded-full' />
                                        </div>
                                    </div>


                                </Fragment>

                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonial