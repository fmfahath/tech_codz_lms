import React, { useState } from 'react'
import { logo, Menus } from '../../assets/assets.js'
import { ChevronDown, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

const Navbar = () => {

    const [isHover, setIsHover] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [clicked, setClicked] = useState(null)

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
        setClicked(null);
    }

    //animation variants
    const subMenuAnimate = {
        enter: {
            opacity: 1,
            rotateX: 0,
            transition: {
                duration: 0.5,
            },
            display: "block",
        },
        exit: {
            opacity: 0,
            rotateX: -15,
            transition: {
                duration: 0.5,
            },
            display: "none",
        }
    }

    //mobile - subMenu variants
    const mobileSubMenuAnimate = {
        enter: {
            height: "auto",
            oveflow: "hidden"
        },
        exit: {
            height: 0,
            overflow: "hidden"
        }
    }



    return (
        <div className='relative z-999'>
            <header className='h-16 text-[15px] fixed inset-0 flex-center'>
                <nav className='px-3.5 flex items-center justify-between gap-5 w-full mx-auto bg-black/85 text-white '>
                    {/* logo */}
                    <div>
                        <img src={logo.white_logo} alt="logo-img" className='w-25 h-15 p-1' />
                    </div>

                    {/* menu */}
                    <ul className='hidden lg:flex items-center justify-between gap-5'>
                        {Menus.map((menu, index) => (
                            <motion.li key={index} className='group/link'
                                onHoverStart={() => setHoveredIndex(index)}
                                onHoverEnd={() => setHoveredIndex(null)}>
                                <span className='flex gap-1 cursor-pointer px-3 py-1 rounded-xl hover:bg-white/10'>
                                    {menu.name}
                                    {menu?.subMenu && menu.subMenu.length > 0 && <ChevronDown className='mt-[0.6px] group-hover/link:rotate-180 duration-200' />}
                                </span>

                                {menu?.subMenu && (
                                    <motion.div className='sub-menu'
                                        initial="exit"
                                        animate={hoveredIndex === index ? "enter" : "exit"}
                                        variants={subMenuAnimate}
                                    >
                                        <div className={`grid gap-7 ${menu.gridCols === 3 ? 'grid-cols-3' : menu.gridCols === 2 ? 'grid-cols-2' : 'grid-cols-1'} `}>
                                            {menu?.subMenu?.map((subMenu, index) => (
                                                <div key={index} className='relative cursor-pointer'>
                                                    <div className='flex items-center gap-x-4 group/menubox'>
                                                        <div className='bg-white/10 w-fit p-2 rounded-md group-hover/menubox:bg-white 
                                                        group-hover/menubox:text-gray-900 duration-200'>{subMenu?.icon && <subMenu.icon />}</div>
                                                        <div>
                                                            <h6 className='font-semibold'>{subMenu?.name}</h6>
                                                            <p className='text-sm text-gray-400'>{subMenu?.desc}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </motion.li>
                        ))}
                    </ul>

                    {/* sign in button/ */}
                    <div className='flex items-center gap-x-5'>
                        <button className='bg-white/10 z-[999] relative px-3 py-1.5 shadow rounded-xl flex-center cursor-pointer hover:bg-white/20'>Sign In</button>
                        {/* mobile menu */}
                        <div className='lg:hidden relative z-[999]'>
                            <button className='cursor-pointer ' onClick={toggleDrawer}>{isOpen ? <X /> : <Menu />}</button>
                            <motion.div
                                className='fixed left-0 right-0 top-15  overflow-y-auto h-full bg-[#18181A] backdrop-blur text-white p-6'
                                initial={{ x: "-100% " }}
                                animate={{ x: isOpen ? 0 : "-100%" }}
                            >
                                <ul>
                                    {Menus?.map(({ name, subMenu }, index) => {
                                        const hasSubMenu = subMenu && subMenu.length > 0;
                                        const isClicked = clicked === index;

                                        return (
                                            <li key={index}>
                                                <span className='flex items-center justify-between gap-2 cursor-pointer px-3 py-2 rounded-xl hover:bg-white/10 relative'
                                                    onClick={() => setClicked(isClicked ? null : index)}
                                                >
                                                    {name}
                                                    {hasSubMenu && <ChevronDown className={`ml-auto ${isClicked && "rotate-180"} duration-200`} />}
                                                </span>
                                                {hasSubMenu && (
                                                    <motion.ul
                                                        className='ml-5'
                                                        initial="exit"
                                                        animate={isClicked ? "enter" : "exit"}
                                                        variants={mobileSubMenuAnimate}
                                                    >
                                                        {subMenu?.map(({ name, icon: Icon }) => (
                                                            <li key={name} className='flex items-center gap-2 p-1 cursor-pointer hover:bg-white/10 rounded-md group/submenu'>
                                                                <Icon className='group-hover/submenu:text-black/80 group-hover/submenu:bg-white rounded ' size={17} />
                                                                <span className='group-hover/submenu:text-white/80'>{name}</span>
                                                            </li>
                                                        ))}
                                                    </motion.ul>
                                                )}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </motion.div>
                        </div>
                    </div>

                </nav>
            </header>
        </div>
    )
}

export default Navbar