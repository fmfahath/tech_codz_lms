import React from 'react'
import Navbar from '../../components/student/Navbar'
import Hero from '../../components/student/Hero'
import SearchBar from '../../components/student/SearchBar'

const Home = () => {
    return (
        <div className='h-screen'>
            <Navbar />
            <Hero />
            <main className='px-10 md:px-30 py-10 mx-auto'>
                {/*find course-search bar */}
                <section className=''>
                    <div className=''>
                        <h1 className='font-roboto text-2xl text-gray-700 md:text-3xl font-medium text-center'>Find Your Perfect Course</h1>
                        <p className='font-roboto text-lg md:text-2xl font-light text-center md:max-w-[900px] mx-auto mt-4'>Find the right course to upgrade your skills, enhance your knowledge, and move closer to your personal or professional goals.</p>
                        <SearchBar />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Home