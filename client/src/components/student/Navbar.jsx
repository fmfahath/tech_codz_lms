import React from 'react'
import { logo, Menus } from '../../assets/assets.js'
import { ChevronDown } from 'lucide-react'

const Navbar = () => {
    return (
        <div>
            <header className='h-16 text-[15px] fixed inset-0 flex-center'>
                <nav className='px-3.5 flex items-center justify-between gap-5 w-full mx-auto bg-black/85 text-white '>
                    {/* logo */}
                    <div>
                        <img src={logo.white_logo} alt="logo-img" className='w-25 h-15' />
                    </div>

                    {/* menu */}
                    <ul className='hidden lg:flex items-center justify-between gap-5'>
                        {Menus.map((menu, index) => (
                            <li key={index} className='group/link'>
                                <span className='flex  gap-1 cursor-pointer px-3 py-1 rounded-xl hover:bg-white/10'>
                                    {menu.name}
                                    {menu?.subMenu && menu.subMenu.length > 0 && <ChevronDown className='mt-[0.6px] group-hover/link:rotate-180 duration-200' />}
                                </span>

                                {menu?.subMenu && (
                                    <div className='sub-menu'>
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
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* sign in button/ */}
                    <div className='flex items-center gap-x-5'>
                        <button className='bg-white/10 z-[999] relative px-3 py-1.5 shadow rounded-xl flex-center cursor-pointer hover:bg-white/20'>Sign In</button>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar