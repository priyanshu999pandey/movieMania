import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoHomeSharp } from "react-icons/io5";
import { PiTelevisionFill } from "react-icons/pi";
import { MdMovie } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const MobileNavigation = () => {
  const navigate = useNavigate()
  return (
    <div className='fixed bottom-0  h-14 w-full flex items-center justify-between gap-5 p-2 mt-10 bg-neutral-950 opacity-100 backdrop-blur-xl  z-40 px-5'>
        <NavLink to="/" className={({isActive})=> ` hover:text-amber-200 ${isActive && 'font-bold text-amber-600'}`} ><div className='flex-col justify-center items-center '><IoHomeSharp className='w-5 h-5 ml-1' /><p>Home</p></div></NavLink>
        <NavLink to="/tv" className={({isActive})=> ` hover:text-amber-200 ${isActive && 'font-bold text-amber-600'}`} ><div  className='flex-col justify-center items-center' ><PiTelevisionFill className='w-5 h-5 ml-2' /><p>Tv Shows</p></div></NavLink>
        <NavLink to="/movie"className={({isActive})=> ` hover:text-amber-200 ${isActive && 'font-bold text-amber-600'}`}  ><div  className='flex-col justify-center items-center' ><MdMovie className='w-5 h-5 ml-2' /><p> Movies</p></div></NavLink>
          <GoSearch onClick={()=>navigate(`/search`)} className='w-9 h-9 mb-2' />
    </div>
  )
}

export default MobileNavigation