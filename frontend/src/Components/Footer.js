import React from 'react'
import payment from "../Images/payment.png"
import {IoLocationSharp} from "react-icons/io5"
import {BsPhoneFill} from "react-icons/bs"
import {MdEmail} from "react-icons/md"

const Footer = () => {
    return (
        <div className=' text-sm px-8 w-[100vw]  mx-auto py-6 text-gray-500 bg-gray-100 sm:rounded-lg '>
           
                <div className="flex  gap-y-2 justify-between pb-4 flex-wrap">
                    <div className="max-w-[250px]">
                        <h1 className='text-lg font-semibold text-gray-700 '>About</h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat eius sunt illum quia cumque itaque ipsum aliquid.</p>
                    </div>
                    <div className="max-w-[250px]">
                        <h1 className='text-lg font-semibold text-gray-700'>Contact</h1>
                       <div className='flex'> <IoLocationSharp className='w-7 h-7 mr-1'/> <p> Address: 797/G Samrat nagar Raeberali,Uttar Pradesh 229001 India</p></div>
                       <div className='flex items-center'> <BsPhoneFill className='mr-1' /> <p>Phone: 9821090099</p></div>
                       <div className='flex items-center'> <MdEmail className='mr-1'/> <p>Email: store@apsmart.com</p></div>
                    </div>
                    <div className="max-w-[250px]">
                        <h1 className='text-lg font-semibold text-gray-700'>Categories</h1>
                        <p className="t">HeadPhone</p>
                        <p className="t">Smart Watch</p>
                        <p className="t">Bluetooth Speakers</p>
                        <p className="t">Wireless Earbuds</p>
                    </div>

                    <div className="max-w-[250px]">
                        <h1 className='text-lg font-semibold text-gray-700'>Pages</h1>
                        <p>Home</p>
                        <p>About</p>
                        <p>Privacy Policy</p>
                        <p>Terms & Conditions</p>
                        <p>Contact Us</p>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-y-1 ">
                    <div>
                        ApsMart © 2023 created by Aditya Pratap Singh
                    </div>
                    <img src={payment} alt={payment} className='max-w-[270px] max-h-[40px]' />
                </div>
            
        </div>
    )
}

export default Footer
