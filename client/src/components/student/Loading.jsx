import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Loading = () => {

    const { path } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (path) {
            const timer = setTimeout(() => {
                navigate(`/${path}`)
            }, 5000);

            return () => clearTimeout(timer)
        }
    }, [])

    return (
        <div className='min-h-screen flex flex-col items-center justify-center gap-10'>
            <div className='flex items-center justify-center w-16 h-16 aspect-square border-2 border-blue-300  rounded-full animate-ping'>
                <div className='flex items-center justify-center w-13 h-13 aspect-square border-3 border-yellow-400  rounded-full animate-pulse'>
                    <div className='w-10 h-10 aspect-square border-2  border-blue-300 rounded-full animate-pulse'>

                    </div>
                </div>
            </div>
            <p className='text-gray-400 animate-pulse'>Processing...</p>
        </div>
    )
}

export default Loading