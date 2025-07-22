import React, { useEffect, useState } from 'react'
import { heroSliderData } from '../../assets/assets'
import { motion, AnimatePresence } from 'framer-motion'

const Hero = () => {

    const [slideIndex, setSlideIndex] = useState(0)



    useEffect(() => {

        const nextSlide = () => {
            setSlideIndex(prevIndex =>
                prevIndex < heroSliderData.length - 1 ? prevIndex + 1 : 0
            )
        }
        const interval = setInterval(nextSlide, 4000)
        return () => clearInterval(interval)

    }, [])


    return (
        <div className={`w-full h-[550px] md:h-[500px] flex flex-col md:flex-row items-center justify-between gap-4 md:px-50  px-10 shadow overflow-hidden  relative   ${heroSliderData[slideIndex].bgColor}`}>

            <div className='h-full flex flex-col items-center md:items-start justify-center gap-2  md:pt-15 relative z-10'>
                <AnimatePresence mode='wait'>
                    <motion.h1
                        className='text-3xl md:text-4xl font-bold font-roboto text-white text-center md:text-start'
                        key={heroSliderData[slideIndex].title}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >{heroSliderData[slideIndex].title}
                    </motion.h1>
                </AnimatePresence>

                <AnimatePresence mode='wait'>
                    <motion.p
                        className='font-roboto text-center md:text-start text-lg md:text-xl text-white md:max-w-[600px]'
                        key={heroSliderData[slideIndex].subTitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >{heroSliderData[slideIndex].subTitle}</motion.p>
                </AnimatePresence>
                <AnimatePresence mode='wait'>
                    <motion.p
                        className='block md:hidden text-sm text-gray-200 mt-5'
                        key={slideIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >*14 Days Free Trial & Money Back Guarantee</motion.p>
                </AnimatePresence>
                <AnimatePresence mode='wait'>
                    <motion.button
                        className='py-2 px-5 bg-blue-500 border-1 hover:border-2 border-white text-white mt-5 md:mt-10 mb-1 rounded-md shadow hover:shadow-lg cursor-pointer'
                        key={slideIndex}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >Enroll Now</motion.button>
                </AnimatePresence>
                <AnimatePresence mode='wait'>
                    <motion.p
                        className='hidden md:block text-sm text-gray-200 mt-5'
                        key={slideIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >*14 Days Free Trial & Money Back Guarantee</motion.p>
                </AnimatePresence>
                <div className='flex items-center justify-center mt-5 gap-2 absolute bottom-5 md:left-0 left-[50%] translate-x-[-50%] md:translate-x-0'>
                    {heroSliderData.map((slide, index) => (
                        <span key={index} className={`w-3 h-3 rounded-full cursor-pointer ${slideIndex === index ? 'bg-white' : 'bg-white/20'}`}
                            onClick={() => setSlideIndex(index)}></span>
                    ))}
                </div>
            </div>
            <div className='w-full md:max-w-[550px] h-[300px]  md:h-full overflow-hidden absolute bottom-0 right-0 z-5 md:relative'>
                <AnimatePresence mode='wait'>
                    <motion.img
                        className='w-full h-full object-contain' src={heroSliderData[slideIndex].image} alt=""
                        key={slideIndex}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    />
                </AnimatePresence>
            </div>
        </div >
    )
}

export default Hero