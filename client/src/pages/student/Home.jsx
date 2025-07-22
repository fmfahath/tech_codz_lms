import React from 'react'
import Navbar from '../../components/student/Navbar'
import Hero from '../../components/student/Hero'
import SearchBar from '../../components/student/SearchBar'

const Home = () => {
    return (
        <div className='h-screen'>
            <Navbar />
            <Hero />
        </div>
    )
}

export default Home