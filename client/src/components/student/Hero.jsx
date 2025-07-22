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
        <div className={`w-full h-[550px] md:h-[500px] flex flex-col md:flex-row items-center justify-between gap-4 md:px-50  px-10 shadow overflow-hidden  relative  ${heroSliderData[slideIndex].bgColor}`}>
            <div className='h-full flex flex-col items-center md:items-start justify-center gap-2  md:pt-15 relative z-10'>
                <h1 className='text-3xl md:text-4xl font-bold font-roboto text-white text-center md:text-start'>{heroSliderData[slideIndex].title}</h1>
                <p className='font-roboto text-center md:text-start text-lg md:text-xl text-white md:max-w-[600px]'>{heroSliderData[slideIndex].subTitle}</p>
                <p className='block md:hidden text-sm text-gray-200 mt-5'>*14 Days Free Trial & Money Back Guarantee</p>
                <button className='py-2 px-5 bg-blue-500 border-1 hover:border-2 border-white text-white mt-5 md:mt-10 mb-1 rounded-md shadow hover:shadow-lg cursor-pointer'>Enroll Now</button>
                <p className='hidden md:block text-sm text-gray-200'>*14 Days Free Trial & Money Back Guarantee</p>
                <div className='flex items-center justify-center mt-5 gap-2 absolute bottom-5 md:left-0 left-[50%] translate-x-[-50%] md:translate-x-0'>
                    {heroSliderData.map((slide, index) => (
                        <span key={index} className={`w-3 h-3 rounded-full cursor-pointer ${slideIndex === index ? 'bg-white' : 'bg-white/20'}`}
                            onClick={() => setSlideIndex(index)}></span>
                    ))}
                </div>
            </div>
            <div className='w-full md:max-w-[550px] h-[300px]  md:h-full overflow-hidden absolute bottom-0 right-0 z-5 md:relative'>
                <img className='w-full h-full object-contain' src={heroSliderData[slideIndex].image} alt="" />
            </div>
        </div>
    )
}

export default Hero