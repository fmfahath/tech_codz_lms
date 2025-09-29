import React, { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import uniqid from 'uniqid'
import 'quill/dist/quill.snow.css'
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaWindowClose } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';

const AddCourses = () => {

    const quillRef = useRef(null)
    const editorRef = useRef(null)
    const [courseTitle, setCourseTitle] = useState("")
    const [coursePrice, setCoursePrice] = useState(0)
    const [courseDiscount, setCourseDiscount] = useState(0)
    const [image, setImage] = useState(null)
    const [chapterTitle, setChapterTitle] = useState("")
    const [chapters, setChapters] = useState([])
    const [lecturePopup, setLecturePopup] = useState(false)
    const [currentChapterId, setCurrentChapterId] = useState(null)
    const [lectureTitle, setLectureTitle] = useState("")
    const [lectureDuration, setLectureDuration] = useState(0)
    const [lectureUrl, setLectureUrl] = useState("")
    const [lecturePreviewFree, setLecturePreviewFree] = useState(false)
    const [openChapters, setOpenChapters] = useState({})
    const { backendUrl, getToken } = useContext(AppContext)
    const [courseAddingStatus, setCourseAddingStatus] = useState(false)

    //add chapter----------------
    const handlingChapter = (action, chapterId) => {
        if (action === 'add') {

            if (chapterTitle.trim() === "") {
                return 0;
            }

            const newChapter = {
                chapterId: uniqid(),
                // chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1  : 1,
                chapterOrder: chapters.length > 0 ? chapters[chapters.length - 1].chapterOrder + 1 : 1,
                chapterTitle: chapterTitle,
                chapterContent: []
            }

            setChapters([...chapters, newChapter])
            setChapterTitle("")

            //Automatically expand the chapter div
            setOpenChapters(prev => ({
                ...prev,
                [newChapter.chapterId]: true
            }))
        }

        else if (action === 'remove') {
            const filteredChapters = chapters.filter(chapter => chapter.chapterId !== chapterId)
            setChapters(filteredChapters)
        }
    }

    //add lecture----------------
    const handlingLecture = (action, chapterid, lectureId) => {
        if (action === 'add') {
            const newLecture = {
                lectureId: uniqid(),
                lectureTitle: lectureTitle,
                lectureDuration: lectureDuration,
                lectureUrl: lectureUrl,
                isPreviewFree: lecturePreviewFree
            }

            //update chapters with new lecture
            const updatedChapters = chapters.map(chapter => {
                if (chapter.chapterId === currentChapterId) {
                    return {
                        ...chapter,
                        chapterContent: [...chapter.chapterContent, newLecture]
                    }
                }
                return chapter
            })

            //set updated chaters
            setChapters(updatedChapters)

            //reset lecture form
            setLectureTitle("")
            setLectureDuration(0)
            setLectureUrl("")
            setLecturePreviewFree(false)
            setLecturePopup(prev => !prev)
        }

        else if (action === 'remove') {
            const updatedChapters = chapters.map(chapter => {
                if (chapter.chapterId === chapterid) {
                    return {
                        ...chapter,
                        chapterContent: chapter.chapterContent.filter(lecture => lecture.lectureId !== lectureId)
                    }
                }

                return chapter;
            })

            setChapters(updatedChapters)
        }
    }

    //lecture popup----------------
    const toggleLecturePopup = (chapterId) => {
        setCurrentChapterId(chapterId)
        setLecturePopup(prev => !prev)
    }

    // chapter div - arrow toggle--------
    const toggleChapterbox = (chapterId) => {
        setOpenChapters(prev => (
            { ...prev, [chapterId]: !prev[chapterId] }
        ))
    }

    //form submit handler----------------
    const submitHandler = async (e) => {
        try {
            e.preventDefault()

            //disbale add button after clicked
            setCourseAddingStatus(true)

            if (!image) {
                toast.error('Thumbnail not selected')
                setCourseAddingStatus(false)
                return;
            }

            const courseData = {
                courseTitle,
                courseDescription: quillRef.current.root.innerHTML,
                coursePrice: Number(coursePrice),
                discount: Number(courseDiscount),
                courseContent: chapters,
            }

            const formData = new FormData()
            formData.append('courseData', JSON.stringify(courseData))
            formData.append('image', image)

            const token = await getToken()
            const { data } = await axios.post(`${backendUrl}/educator/add-course`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                toast.success(data.message)
                setCourseTitle("")
                quillRef.current.root.innerHTML = ""
                setCoursePrice(0)
                setCourseDiscount(0)
                setImage(null)
                setChapters([])
                setCourseAddingStatus(false)
            }
            else {
                toast.error(data.message)
                setCourseAddingStatus(false)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
        }
    }, [])


    return (
        <div className='w-full '>
            <form className='flex flex-col gap-4 w-full md:max-w-[50%]' onSubmit={submitHandler}>

                {/* course title */}
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="courseTitle">Course Title</label>
                    <input className='border border-gray-500 py-2 px-4 rounded outline-0' type="text" id='courseTitle' required onChange={(e) => setCourseTitle(e.target.value)} value={courseTitle} />
                </div>

                {/* course description  - quill Editor */}
                <div className='flex flex-col gap-2 '>
                    <label htmlFor="courseDesc">Course Description</label>
                    <div ref={editorRef} className=' h-[300px] border border-gray-300'>

                    </div>
                </div>

                {/* course price */}
                <div className='flex gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="coursePrice">Course Price</label>
                        <input className='w-28 border border-gray-400 py-2 px-4 rounded outline-0' type="number" id='coursePrice' placeholder='0' required onChange={(e) => setCoursePrice(e.target.value)} value={coursePrice} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="courseDisc">Discount %</label>
                        <input className='w-28 border border-gray-400 py-2 px-4 rounded outline-0' type="number" id='courseDisc' min={0} max={100} placeholder='0' required onChange={(e) => setCourseDiscount(e.target.value)} value={courseDiscount} />
                    </div>
                </div>

                {/* add thubmnail */}
                <div className='mb-5'>
                    <div className='flex items-center gap-2'>
                        <p>Upload Thumbnail Image</p>
                        <label htmlFor="courseThumImg" className='cursor-pointer'>
                            <FaCloudUploadAlt className='text-4xl text-blue-500' />
                        </label>
                    </div>
                    <div className='flex items-center  gap-5 mt-2 '>
                        <img src={image ? URL.createObjectURL(image) : null} alt="" className='w-15 h-15' />
                        <input type="file" id='courseThumImg' accept='image/*' className='text-sm text-gray-400 cursor-pointer' onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                </div>

                {/* add chapter */}
                <div className='flex flex-col gap-2'>
                    <p>Add Chapters</p>
                    <div className='flex flex-col md:flex-row gap-2 mb-5'>
                        <input type='text' className='flex-1 border border-gray-400 py-2 px-4 rounded outline-0' value={chapterTitle} placeholder='Enter chapter heading' required onChange={(e) => setChapterTitle(e.target.value)} />
                        <button className='w-30 py-2 px-3 bg-black/80 text-sm text-white rounded cursor-pointer' onClick={() => handlingChapter('add')}>Add Chapter</button>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {chapters && chapters.map((chapter, index) => (
                            <div key={index} className='bg-gray-300/30  overflow-hidden rounded'>
                                <div className='flex items-center justify-between px-2 py-2 bg-gray-300/50' onClick={() => toggleChapterbox(chapter.chapterId)}>
                                    <div className='flex items-center gap-2 cursor-pointer'>
                                        <IoIosArrowDown className={`transition-transform duration-300 ${openChapters[chapter.chapterId] ? "rotate-[-90deg]" : "rotate-0"
                                            }`} />
                                        <p className='w-50 md:w-100 truncate'>{chapter.chapterOrder + ". " + chapter.chapterTitle}</p>
                                    </div>
                                    <FaWindowClose className='text-red-500 cursor-pointer' onClick={() => handlingChapter('remove', chapter.chapterId)} />
                                </div>

                                {/* add lecture */}
                                <div className={`flex flex-col transition-all duration-500 overflow-hidden ${openChapters[chapter.chapterId] ? "p-2 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                    }`}>
                                    {chapter.chapterContent && chapter.chapterContent.map((lecture, i) => (
                                        <div key={lecture.lectureId + "-" + i} className='flex  justify-between gap-2'>
                                            <div className=' '>
                                                <p className='text-[15px] text-gray-700 '>{i + 1 + ". " + lecture.lectureTitle}</p>
                                            </div>
                                            <div className='flex items-center  gap-2 text-gray-500 '>
                                                <p className='hidden md:block text-sm'>{lecture.lectureDuration} Minutes</p>
                                                <Link to={lecture.lectureUrl} target='_blank' className='text-sm text-blue-400'>{lecture.isPreviewFree ? "Free Preview" : "Paid"}</Link>
                                                <IoClose className='text-lg text-red-500 cursor-pointer' onClick={() => handlingLecture('remove', chapter.chapterId, lecture.lectureId)} />
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

                <button className={`w-full md:max-w-40 py-3 px-4 btn-bg text-sm md:text-default text-white rounded cursor-pointer ${courseAddingStatus ? "cursor-not-allowed opacity-50" : ""}`} onClick={submitHandler} >{courseAddingStatus ? "Loading.." : "Add"} </button>


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
                                <input className='border border-gray-500 py-2 px-4 rounded outline-0' type="number" id='lectDur' min={0} placeholder='0' onChange={(e) => setLectureDuration(e.target.value)} value={lectureDuration} required />
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