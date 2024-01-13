import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { orderComplted } from '../Api/ordersApi'
import { useDispatch } from 'react-redux'
import { setToastify } from '../State/Slice/toastifySlice'

const OrderItem = ({order,removeOrder}) => {
    console.log("order orders item",order)
    const dipatch=useDispatch();
    const nav=useNavigate();
    const handleOrderComplete=async()=>{
        if(Cookies.get('authToken')){
            const res=await orderComplted(order._id);
            if(res.success){
                console.log("Order completed");
                removeOrder(order._id)
                dipatch(setToastify({show:true,msg:"Product removed from the order list"}))   
                         
            }
            else{
                console.log("Error",res.error);
            }
        }else{
            console.log("You need to login");
            nav("/");
        }
    }
    return (
        <div className='flex flex-col my-3'>
            <div className='flex'>
                <div className='w-[100px] h-[100px] flex-shrink-0 items-center justify-center bg-gray-200 p-2'>
                    <img src={order.product.img.imgUrl} alt="" />
                </div>

                <div className='flex flex-col w-[calc(100%-80px)] px-2 max-w-[700px] mx-auto'>
                    <span className='text-[#324d67] font-semibold text-ellipsis overflow-hidden whitespace-nowrap'><Link to={`/productdetails/${order.product._id}`}>{order.product.name}</Link></span>
                    <span className='text-sm text-ellipsis overflow-hidden whitespace-nowrap'>{order.product.description}</span>
                    <span>{order.user.name}</span>
                    <span>{order.user.address}</span>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='my-2 sm:w-[200px] px-2 bg-green-500 h-9 rounded-xl text-white text-lg  flex items-center justify-center cursor-pointer' onClick={handleOrderComplete}>Order Completed</div>


            </div>

        </div>
    )
}

export default OrderItem
