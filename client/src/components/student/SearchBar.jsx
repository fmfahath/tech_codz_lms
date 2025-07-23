import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {

    const navigate = useNavigate()
    const [searchInput, setSearchInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate('/course-list/' + searchInput)
    }

    return (
        <form className='my-2 p-2' onSubmit={handleSubmit}>
            <div className='md:max-w-[500px] flex items-center justify-between gap-2 border border-gray-300 rounded py-1 px-2 mx-auto bg-transparent'>
                <Search className='text-gray-400' />
                <input type="text" className='flex-1 outline-0 text-sm md:text-[16px] text-gray-600' placeholder='Search for Courses..' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                <button className='py-2 px-6 btn-bg text-white rounded-sm cursor-pointer' type='submit'>Search</button>
            </div>
        </form>
    )
}

export default SearchBar