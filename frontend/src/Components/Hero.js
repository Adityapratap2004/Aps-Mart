import React, { useEffect } from 'react'
import forntImg from "../Images/frontImg.webp"
import { BsChevronDown } from "react-icons/bs"
import { Link, useLocation } from 'react-router-dom'

const Hero = () => {
  const location=useLocation();
  useEffect(() => {
    if(location.hash){
      const elm=document.getElementById(location.hash.slice(1));
      if(elm){
        elm.scrollIntoView({behavior:'smooth'})
        
      }
    }

  }, [location.hash])
  return (
    <div className='w-[100vw] min-h-[calc(100vh-55px)] sm:h-[100vh] bg-gray-300 flex  '>
      <div className='flex flex-col-reverse justify-center sm:flex-row mx-auto px-2 pt-10 sm:pt-20 '>
        <div className='flex flex-col mx-auto sm:items-start sm:justify-center text-white gap-2 drop-shadow-lg sm:pl-6 pb-6'>
          <div>
            <h1 className=' text-5xl md:text-7xl uppercase font-semibold'>cancel noise</h1>
            <h1 className='text-5xl md:text-7xl uppercase font-semibold mb-5'>stay inspired</h1>
          </div>
          <p className='text-lg w-80 sm:w-96 text-black'>
            Featuring Active noise cancelling that gives you the space to create fully imersive sound.
          </p>
          <button className='bg-red-600 w-32 py-1 rounded-md text-md font-semibold shadow-lg'>
            Shop now
          </button>

        </div>
        <img src={forntImg} alt="frontImg" className='' />

      </div>
      <div className='hidden sm:block  absolute bottom-4 left-[50%] -translate-x-[50%] text-white  cursor-pointer'>
        <Link to="/#category"> <BsChevronDown className='w-6 h-6 animate-bounce' /></Link>
      </div>

    </div>
  )
}

export default Hero
