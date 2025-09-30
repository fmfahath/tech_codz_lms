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
        <form className='w-full md:w-auto my-2 bg-green-200' onSubmit={handleSubmit}>
            <div className='w-full md:max-w-[500px] flex items-center md:justify-between gap-2 border border-gray-300 rounded py-1 px-2 mx-auto bg-transparent'>
                <Search className='text-gray-400 shrink-0' />
                <input type="text" className='w-full flex-1 outline-0 text-sm md:text-[16px] text-gray-600' placeholder='Search for Courses..' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                <button className='py-2 px-4 md:px-6 btn-bg text-white rounded-sm cursor-pointer shrink-0' type='submit'>Search</button>
            </div>
        </form>
    )
}

export default SearchBar