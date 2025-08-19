import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import uniqid from 'uniqid'
import 'quill/dist/quill.snow.css'
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaWindowClose } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { logo } from '../../assets/assets';

const AddCourses = () => {

    const quillRef = useRef(null)
    const editorRef = useRef(null)
    const [image, setImage] = useState(null)
    const [chapterTitle, setChapterTitle] = useState("")
    const [chapters, setChapters] = useState([])
    const [lecturePopup, setLecturePopup] = useState(false)
    const [currentChapterId, setCurrentChapterId] = useState(null)
    const [lectureTitle, setLectureTitle] = useState("")
    const [lectureDuration, setLectureDuration] = useState(0)
    const [lectureUrl, setLectureUrl] = useState("")
    const [lecturePreviewFree, setLecturePreviewFree] = useState(false)

    //add chapter----------------
    const handlingChapter = (action, chapterId) => {

    }

    //add lecture----------------
    const handlingLecture = (action) => {

    }

    //lecture popup----------------
    const toggleLecturePopup = (chapterId) => {
        setCurrentChapterId(chapterId)
        setLecturePopup(prev => !prev)
    }

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
        }
    }, [])


    return (
        <div className='w-full '>
            <form className='flex flex-col gap-4 max-w-[50%]'>

                {/* course title */}
                <div className='flex flex-col gap-2'>
                    <label htmlFor="courseTitle">Course Title</label>
                    <input className='border border-gray-500 py-2 px-4 rounded outline-0' type="text" id='courseTitle' required />
                </div>

                {/* course description  - quill Editor */}
                <div className='flex flex-col gap-2 '>
                    <label htmlFor="courseDesc">Course Description</label>
                    <div ref={editorRef} className=' h-[250px] border border-gray-300'>

                    </div>
                </div>

                {/* course price */}
                <div className='flex gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="coursePrice">Course Price</label>
                        <input className='w-28 border border-gray-400 py-2 px-4 rounded outline-0' type="number" id='coursePrice' placeholder='0' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="courseDisc">Discount %</label>
                        <input className='w-28 border border-gray-400 py-2 px-4 rounded outline-0' type="number" id='courseDisc' min={0} max={100} placeholder='0' required />
                    </div>
                </div>

                {/* add thubmnail */}
                <div className='mb-5'>
                    <div className='flex items-center gap-2'>
                        <p>Upload Thumbnail Image</p>
                        <label htmlFor="courseThumImg">
                            <FaCloudUploadAlt className='text-4xl text-blue-500' />
                        </label>
                    </div>
                    <div className='flex items-center  gap-5 mt-2'>
                        <img src={image ? URL.createObjectURL(image) : null} alt="" className='w-15 h-15' />
                        <input type="file" id='courseThumImg' accept='image/*' className='text-sm text-gray-400' onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                </div>

                {/* add chapter */}
                <div className='flex flex-col gap-2'>
                    <p>Add Chapters</p>
                    <div className='flex gap-2 mb-5'>
                        <input type='text' className='flex-1 border border-gray-400 py-2 px-4 rounded outline-0' value={chapterTitle} placeholder='Enter chapter heading' required onChange={(e) => setChapterTitle(e.target.value)} />
                        <button className='py-2 px-3 bg-black text-sm text-white rounded cursor-pointer' onClick={() => handlingChapter('add')}>Add Chapter</button>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {chapters && chapters.map((chapter, index) => (
                            <div key={index} className='bg-gray-300/30  overflow-hidden rounded'>
                                <div className='flex items-center justify-between px-2 py-2 bg-gray-300/50  '>
                                    <div className='flex items-center gap-2 cursor-pointer'>
                                        <IoIosArrowDown />
                                        <p className='w-100 truncate'>{chapter.chapterOrder + ". " + chapter.chapterTitle}</p>
                                    </div>
                                    <FaWindowClose className='text-red-500 cursor-pointer' onClick={() => handlingChapter('remove', chapter.chapterId)} />
                                </div>
                                {/* add lecture */}
                                <div className='flex flex-col p-2'>
                                    {chapter.chapterContent && chapter.chapterContent.map((lecture, i) => (
                                        <div key={lecture.lectureId + "-" + i} className='flex  justify-between gap-2'>
                                            <div className=' '>
                                                <p className='text-[15px] text-gray-700 '>{i + 1 + ". " + lecture.lectureTitle}</p>
                                            </div>
                                            <div className='flex items-center  gap-2 text-gray-500 '>
                                                <p className='text-sm'>{lecture.lectureDuration} Minutes</p>
                                                <Link to={lecture.lectureUrl} target='_blank' className='text-sm text-blue-400'>{lecture.isPreviewFree ? "Free Preview" : "Paid"}</Link>
                                                <IoClose className='text-lg text-red-500 cursor-pointer' />
                                            </div>
                                        </div>
                                    ))}

                                    <button className='py-2 px-3 mt-4 ml-auto bg-gray-500/50 text-sm text-white rounded cursor-pointer' onClick={() => toggleLecturePopup(chapter.chapterId)}>+ Add Lecture</button>
                                </div>


                            </div>
                        )
                        )}
                    </div>
                </div>

            </form>
            {/* add lecture popup */}
            {lecturePopup && (
                <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
                    <div className='w-full max-w-80 bg-white p-4 relative rounded'>
                        <div className='flex items-center justify-between mb-4'>
                            <h2 className='text-lg font-medium'>Add Lecture</h2>
                            <FaWindowClose className='text-xl text-red-500 cursor-pointer' onClick={() => setLecturePopup(prev => !prev)} />
                        </div>
                        <form className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="lectTitle">Title</label>
                                <input className='border border-gray-500 py-2 px-4 rounded outline-0' type="text" id='lectTitle' onChange={(e) => setLectureTitle(e.target.value)} value={lectureTitle} required />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="lectDur">Duration (Min)</label>
                                <input className='border border-gray-500 py-2 px-4 rounded outline-0' type="number" id='lectDur' onChange={(e) => setLectureDuration(e.target.value)} value={lectureDuration} required />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="lectUrl">Lecture Url</label>
                                <input className='border border-gray-500 py-2 px-4 rounded outline-0' type="text" id='lectUrl' onChange={(e) => setLectureUrl(e.target.value)} value={lectureUrl} required />
                            </div>
                            <div className='flex gap-2'>
                                <label htmlFor="lectPreview">is Preview vailable?</label>
                                <input className='border border-gray-500 py-2 px-4 rounded outline-0' type="checkbox" id='lectPreview' onChange={(e) => setLecturePreviewFree(e.target.checked)} value={lecturePreviewFree} required />
                            </div>
                            <button className='py-2 px-3 mt-4  bg-gray-500 text-sm text-white rounded cursor-pointer' onClick={() => handlingLecture('add')}>Add Lecture</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddCourses