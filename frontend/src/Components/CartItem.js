import React from 'react'
import { IoMdClose } from "react-icons/io"
import { useDispatch } from 'react-redux'
import { updateCart } from '../State/Slice/cartSlice'
import { deleteCartItem, updateCartItem } from '../Api/cartApi'
import  { setToastify } from '../State/Slice/toastifySlice'
import { deleteCart } from '../State/Slice/cartSlice'
import { Link } from 'react-router-dom'

const CartItem = ({cartItem}) => {
    const dispatch=useDispatch();
    const handleDescrease=async()=>{
        console.log("descreses",cartItem.qty);
        if(cartItem.qty===1){
            dispatch(setToastify({show:true,msg:"You cannot set quantity to zero"}))
        }
        else{
            const res=await updateCartItem(cartItem._id,cartItem.qty-1);
            if(res.success){
                console.log("product decreased");
                dispatch(updateCart({qty:cartItem.qty-1,id:cartItem._id})); 
            }
            else{
                console.log("decrease");
            }

        }
       
    }

    const handleIncrease=async()=>{
        console.log("increase")
        const res=await updateCartItem(cartItem._id,cartItem.qty+1);
        if(res.success){
            console.log("product increased");
            dispatch(updateCart({qty:cartItem.qty+1,id:cartItem._id}));
             
        }
        else{
            console.log("increase");
        }
         
    }

    const handleDelete=async(id)=>{
        console.log("handleDelete")
        const res=await deleteCartItem(id);
        if(res.success){
            console.log("Product deleted from the cart");
            dispatch(deleteCart(id));
            dispatch(setToastify({show:true,msg:"Product deleted from the cart"}))
            
        }
        else{
            console.log("Error",res.error);
        }
    }
    
    return (
        <div className=' py-4 flex text-sm text-gray-400 hover:bg-gray-100 '>
            <div className='w-[65px] h-[65px] bg-gray-100 p-2'>
                <img src={cartItem.product.img.imgUrl} alt="" className="w-full h-full" />
            </div>
            <div className='w-[calc(100%-70px)] pl-2 flex flex-col'>
                <div className='flex justify-between items-center gap-2'>
                    <span className='text-ellipsis overflow-hidden whitespace-nowrap font-semibold text-base capitalize'><Link to={`/productdetails/${cartItem.product._id}`}>{cartItem.product.name}</Link></span>
                    <span onClick={()=>{handleDelete(cartItem._id)}}><IoMdClose  className="cursor-pointer hover:text-[#324d67]" /></span>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='space-x-1 my-3 '>
                        <span className='h-5 w-5 border-2 py-1 px-2 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white' onClick={handleDescrease}>-</span>
                        <span className='h-5 w-5 border-2 py-1 px-2 rounded-lg'>{cartItem.qty}</span>
                        <span className='h-5 w-5 border-2 py-1 px-2 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white' onClick={handleIncrease}>+</span>
                    </div>
                    <div className='  text-lg font-semibold'>
                        ₹ {cartItem.qty} * {cartItem.product.price}
                    </div>
                </div>


            </div>
        </div>
    )
}

export default CartItem
