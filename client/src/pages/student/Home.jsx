import React from 'react'
import Navbar from '../../components/student/Navbar'
import Hero from '../../components/student/Hero'
import SearchBar from '../../components/student/SearchBar'

const Home = () => {
    return (
        <div className='h-screen'>
            {/* <Navbar /> */}
            <Hero />
            <main className='px-10 md:px-30 py-10 mx-auto'>
                {/*find course-search bar */}
                <section className=''>
                    <div className='space-y-10'>
                        <div>
                            <h1 className='font-roboto text-2xl text-gray-700 md:text-3xl font-medium text-center'>Find Your Perfect Course</h1>
                            <p className='font-roboto text-lg md:text-xl font-light text-center md:max-w-[700px] mx-auto mt-4'>Find the right course to upgrade your skills, enhance your knowledge, and move closer to your personal or professional goals.</p>
                        </div>
                        <SearchBar />
                    </div>
                </section>

                {/* /popular courses */}
                <section>
                    <h2 className='text-xl md:text-2xl font-medium text-gray-700 mt-10'>Popular Courses</h2>
                    <hr className='border border-gray-100' />
                    <div>

                    </div>
                </section>
            </main>
        </div>
    )
}

export default Home