import React, { useState } from 'react'

import { BsFacebook, BsTwitter, BsLinkedin } from "react-icons/bs"
import { FaInstagramSquare } from "react-icons/fa"
import { AiOutlineShoppingCart } from "react-icons/ai"
import {BsStarFill} from "react-icons/bs"
import { useDispatch } from 'react-redux'
import { setToastify } from '../State/Slice/toastifySlice'
import { addtocart } from '../Api/cartApi'
import Cookies from 'js-cookie'
import { addCart } from '../State/Slice/cartSlice'


const ProductDetail = ({product}) => {
    

    const [count,setCount]=useState(1);
    
    const dispatch=useDispatch();
    const descreaseCount=()=>{
        if(count!==1){
            setCount(count-1);
        }
    }
    const increaseCount=()=>{
        setCount(count+1);
    }

    const addTocart=async(id,qty)=>{
        console.log("Add to cart")
        if(!Cookies.get('authToken'))
        {
            console.log("User not logged in");
            dispatch(setToastify({show:true,msg:"You need to be logged in to access thie feature"}));

        }
        else{
            const res=await addtocart(id,qty);
            if(res.success){
                console.log("Product added");
                dispatch(addCart(res.cart))
                dispatch(setToastify({show:true,msg:"Product added to cart"}))            
            }
            else{
                console.log("Error",res.error);
                dispatch(setToastify({show:true,msg:res.error})) 
            }   

        }
       
    }
    let i=0 ;  //key
    
    return (
        <div className=' w-full px-7 sm:px-10 lg:px-24 text-lg pt-14'>
            <div className='flex flex-col sm:flex-row w-[calc(100%-20px)]  py-6 mx-auto'>
                <div className='flex w-full flex-shrink-0 py-8 rounded-lg bg-gray-100 sm:w-[calc(50vw)]  lg:w-[calc(30vw)] lg:h-[calc(65vh)] items-center overflow-hidden'>
                    <img src={product.img.imgUrl} alt="product img" className='transform translate duration-1000 hover:scale-125 overflow-hidden' />
                </div>
                <div className=' my-2 sm:my-0 sm:mx-6 '>
                    <div className=''>
                        <h1 className='text-2xl sm:text-4xl font-semibold mb-1 capitalize'>
                            {product.name}
                        </h1>
                        <p className='text-xl sm:text-2xl font-semibold'>₹{product.price}</p>
                        <div className='text-xl flex gap-2 items-center'> <span className='font-semibold cursor-pointer hover:text-gray-500 '>Rating: </span><p className='flex gap-2 text-[#FFDF00]'>{[...Array(Math.round(product.rating))].map(()=><BsStarFill key={i++}/>)}</p><p className='flex gap-2 text-gray-200'>{[...Array(5-Math.round(product.rating))].map(()=><BsStarFill key={i++}/>)}</p></div>
                    </div>
                    <div className='my-4 sm:my-8 '>
                        <p className='text-sm sm:text-md sm:w-[calc(50vw)]  max-w-[900px] '>
                           {product.description}
                        </p>
                    </div>
                    <div className='flex items-center my-2 sm:my-6 gap-x-5'>
                        <div className='space-x-1 '>
                            <span className='h-6 w-6 border-2 py-2 px-3 rounded-lg cursor-pointer' onClick={()=>{descreaseCount()}}>-</span>
                            <span className='h-6 w-7 border-2 py-2 px-3 rounded-lg'>{count}</span>
                            <span className='h-6 w-6 border-2 py-2 px-3 rounded-lg cursor-pointer' onClick={()=>{increaseCount()}}>+</span>
                        </div>
                        <button className=' bg-red-500 text-white py-1 px-2 rounded-lg' onClick={()=>{addTocart(product._id,count)} }>
                            <AiOutlineShoppingCart className='h-6 w-6 inline ' /> Add to Cart
                        </button>
                    </div>
                    <hr className='mt-4' />
                    <div className='my-4 sm:my-6 ' >
                        <div className='flex gap-2'> <span className='font-semibold '>Category: </span><p>{product.category}</p></div>
                       
                        <div className='flex items-center gap-2'><span className='font-semibold'>Share: </span>
                            <div className='flex gap-3'>
                                <BsFacebook className='w-5' />
                                <BsTwitter className='w-5' />
                                <FaInstagramSquare className='w-5' />
                                <BsLinkedin className='w-5' />

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductDetail
