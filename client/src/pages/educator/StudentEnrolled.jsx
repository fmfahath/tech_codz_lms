import React from 'react'

const StudentEnrolled = () => {
    return (
        <div className='w-full min-h-screen px-4 py-2'>
            <h3 className='text-xl '>Enrolled Students</h3>
            <table className='w-auto min-w-[80%] mt-5 border border-gray-200 shadow rounded-lg'>
                <thead>
                    <tr className='text-left border-b border-gray-200'>
                        <th className='px-4 py-4  font-medium'>#</th>
                        <th className='px-4 py-4 font-medium'>Student Name</th>
                        <th className='px-4 py-4 font-medium'>Course Title</th>
                        <th className='px-4 py-4  font-medium'>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='text-left text-gray-600 border-b border-gray-200'>
                        <td className='px-4 py-2 '>1</td>
                        <td className='px-4 py-2 '>Fahath</td>
                        <td className='px-4 py-2 '>React for Beginners</td>
                        <td className='px-4 py-2 '>2023-10-01</td>
                    </tr>
                    <tr className='text-left text-gray-600 border-b border-gray-200'>
                        <td className='px-4 py-2 '>2</td>
                        <td className='px-4 py-2 '>David</td>
                        <td className='px-4 py-2 '>Python for Data SCience</td>
                        <td className='px-4 py-2 '>2023-10-06</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StudentEnrolled