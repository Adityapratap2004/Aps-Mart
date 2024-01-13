import React from 'react'
import { BsFacebook, BsTwitter, BsLinkedin } from "react-icons/bs"
import { FaInstagramSquare } from "react-icons/fa"


const NewsLetter = () => {
    return (
        <div className="newsletter h-[300px] bg-cover px-6 w-[100vw]  mx-auto rounded-lg mt-4">
            <div className='flex flex-col items-center h-[100%] justify-center gap-3'>
                <p className='uppercase text-gray-400'>News Letter</p>
                <p className='uppercase text-2xl font-semibold text-center'>Sign up for the latest updates and offers</p>
                <div>
                    <form className='flex flex-col items-center gap-y-2 sm:flex-row'>
                        <input placeholder='Email Address' type='email' className='py-1 px-2 mx-2 rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2  '></input>
                        <button type="submit" className='bg-red-600 w-32 py-1 rounded-md text-md font-semibold shadow-lg text-white'>Subscribe</button>
                    </form>
                </div>
                <p className='text-gray-400 text-center'>Will be used in accordance with our privacy Policy</p>
                <div className='flex gap-3'>
                    <BsFacebook className='w-6 h-6' />
                    <BsTwitter className='w-6 h-6' />
                    <FaInstagramSquare className='w-6 h-6' />
                    <BsLinkedin className='w-6 h-6' />

                </div>


            </div>

        </div>
    )
}

export default NewsLetter
