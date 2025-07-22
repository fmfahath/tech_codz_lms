import React, { useEffect, useState } from 'react'
import { heroSliderData } from '../../assets/assets'

const Hero = () => {

    const [slideIndex, setSlideIndex] = useState(0)



    useEffect(() => {

        const nextSlide = () => {
            setSlideIndex(prevIndex =>
                prevIndex < heroSliderData.length - 1 ? prevIndex + 1 : 0
            )
        }
        const interval = setInterval(nextSlide, 3500)
        return () => clearInterval(interval)

    }, [])


    return (
        <div className={`w-full h-[450px] flex flex-col md:flex-row items-center justify-between gap-4 md:px-50  px-10 shadow overflow-hidden  relative  ${heroSliderData[slideIndex].bgColor}`}>
            <div className='h-full flex flex-col items-start justify-center gap-2 pt-15'>
                <h1 className='text-4xl font-bold font-roboto text-white'>{heroSliderData[slideIndex].title}</h1>
                <p className='font-roboto text-xl text-white max-w-[600px]'>{heroSliderData[slideIndex].subTitle}</p>
                <button className='py-2 px-5 bg-blue-500 border-1 hover:border-2 border-white text-white mt-10 mb-1 rounded-md shadow hover:shadow-lg cursor-pointer'>Enroll Now</button>
                <p className='text-sm text-gray-200'>*14 Days Free Trial & Money Back Guarantee</p>
                <div className='flex items-center justify-center mt-5 gap-2 absolute bottom-10 left-[50%]'>
                    {heroSliderData.map((slide, index) => (
                        <span key={index} className={`w-3 h-3 rounded-full cursor-pointer ${slideIndex === index ? 'bg-white' : 'bg-white/20'}`}
                            onClick={() => setSlideIndex(index)}></span>
                    ))}
                </div>
            </div>
            <div className='w-full md:max-w-[550px] h-[450px] overflow-hidden'>
                <img className='w-full h-full object-contain' src={heroSliderData[slideIndex].image} alt="" />
            </div>
        </div>
    )
}

export default Hero