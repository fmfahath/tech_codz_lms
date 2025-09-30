import React, { Fragment, useContext, useEffect, useRef } from 'react'
import Hero from '../../components/student/Hero'
import SearchBar from '../../components/student/SearchBar'
import { AppContext } from '../../context/AppContext'
import CourseCard from '../../components/student/CourseCard'
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { RiArrowLeftDoubleLine } from "react-icons/ri";
import { Link } from 'react-router-dom'
import Testimonial from '../../components/student/Testimonial'
import Footer from '../../components/student/Footer'
import Loading from '../../components/student/Loading'

const Home = () => {

    const scrollRef = useRef(null);
    const { allCourses } = useContext(AppContext)

    const scrollRight = () => {

        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 300,
                behavior: 'smooth'
            })
        }
    }

    const scrollLeft = () => {

        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -300,
                behavior: 'smooth'
            })
        }
    }

    return (
        <main className='min-h-screen'>
            {/* hero banner */}
            <Hero />

            {/*find course-search bar */}
            <section className='px-10 md:px-30 py-4 md:py-10'>
                <div className='flex flex-col md:flex-row items-center justify-start gap-5'>
                    <div className='md:max-w-[600px] '>
                        <h1 className='font-roboto text-2xl text-gray-700 md:text-3xl font-medium text-center md:text-start'>Find Your Perfect Course</h1>
                        <p className='font-roboto text-lg md:text-xl font-light text-center md:text-start mx-auto mt-4'>Find the right course to upgrade your skills, enhance your knowledge, and move closer to your personal or professional goals.</p>
                    </div>

                    <div className='flex-1 block bg-red-200'>
                        <SearchBar />
                    </div>
                </div>
            </section>

            {/* popular courses */}
            <section className='px-7 md:px-30 '>
                <div className='bg-gray-50 p-5 rounded-md shadow-lg'>
                    <h2 className='text-xl md:text-2xl font-medium text-gray-700 mt-5'>Popular Courses</h2>
                    {/* <hr className='border border-gray-100' /> */}
                    {allCourses && allCourses.length > 0 ? (
                        <div className='flex items-center justify-center gap-5 relative'>
                            <RiArrowLeftDoubleLine
                                onClick={scrollLeft}
                                className='rounded-full font-light w-[30px] h-[30px] md:w-[50px] md:h-[50px]  text-black/20 hover:text-black/60  hover:shadow-md cursor-pointer absolute bottom-[50%] translate-[50%] -left-15 md:-left-28' />
                            <div ref={scrollRef} className='w-max flex gap-x-2 mt-5 overflow-x-auto scrollbar-hide'>
                                {allCourses.map(course => <CourseCard key={course._id} courseData={course} />)}
                            </div>
                            <RiArrowRightDoubleLine
                                onClick={scrollRight}
                                className='rounded-full font-light w-[30px] h-[30px] md:w-[50px] md:h-[50px]   text-black/20 hover:text-black/60  hover:shadow-md cursor-pointer absolute bottom-[50%] translate-[50%] -right-8 md:-right-15' />
                            {/* left shade gradient */}
                            {/* <div className="absolute top-0 left-0 h-full w-30 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" /> */}
                            {/* right shade gradient */}
                            {/* <div className="absolute top-0 right-0 h-full w-30 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" /> */}
                        </div>
                    ) : (<Loading />)}
                </div>
            </section>

            {/* latest courses */}
            <section className='px-10 md:px-30 mt-5 md:mt-10'>
                <h2 className='text-xl md:text-2xl font-medium text-gray-700 mt-5'>Latest Courses</h2>
                <hr className='border border-gray-100' />
                {allCourses && allCourses.length > 0 ? (
                    <div className=''>
                        <div className='grid grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] md:grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-2 md:gap-2 mt-5'>
                            {allCourses.slice(0, 8).map(course => <CourseCard key={course._id} courseData={course} />).reverse()}
                        </div>
                    </div>
                ) : (<Loading />)}
                {/* expolre button */}
                <div className=' mt-2 md:mt-10 relative '>
                    <div className='w-full h-[200px] absolute -top-50 left-0 bg-gradient-to-t from-white via-white/80 to-transparent z-10'></div>
                    <Link to='/course-list' className='w-max mx-auto flex items-center justify-between gap-2 btn-bg py-2 px-4  md:text-lg scroll-smooth'>Explore More <RiArrowRightDoubleLine /></Link>
                </div>
            </section>

            {/* testimonials */}
            <section>
                <Testimonial />
            </section>

            {/* <Footer /> */}
        </main>
    )
}

export default Home