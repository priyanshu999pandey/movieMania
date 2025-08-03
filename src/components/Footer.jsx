import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-neutral-800 opacity-50 mb-16 h-20 pt-3  '>
        <div className='flex justify-center items-center gap-8 ' >
            <Link to="/" >About</Link>
            <Link to="/" >Contact</Link>
            <Link to="/" >Help</Link>
        </div>
        <div className='text-center  text-sm'>Created by Priyanshu pandey</div>
    </div>
  )
}

export default Footer