import React, { useEffect, useState } from 'react'

import OrderItem from './OrderItem'
import Cookies from 'js-cookie';
import { ordersList } from '../Api/ordersApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToastify } from '../State/Slice/toastifySlice';



const AdminOrder = () => {
    const [orders,setOrders]=useState([]);
    const nav=useNavigate();
    const dispatch=useDispatch();

    //removing order form order list   // here i am just updating the state i hane already deleted the 
    const removeOrder=(id)=>{
        const neworder=orders.filter((i)=> i._id !== id);
        setOrders(neworder);
    }

    useEffect(()=>{
        if(Cookies.get('authToken')){
            const getOrders=async()=>{
                const res=await ordersList();
                if(res.success){
                    console.log("Orders Arrived",res.ordersList);
                    
                    setOrders(res.ordersList);
                    
                }
                else{
                    console.log("Some error have occured");
                   
                }
            }
            getOrders();
        }
        else{
            console.log("Error") 
            dispatch(setToastify({show:true,msg:"You need to login to access this page"}));
            nav("/");   
        
        }

    },[dispatch,nav]);
    
    return (
        <div className='w-full px-6 py-4 sm:px-10 mx-auto max-w-[1200px] lg:px-24 border-b-2'>
            <div className='w-full  '>
            <h1 className='uppercase text-[#324d67] text-4xl font-bold drop-shadow-lg text-center my-2'>You Orders</h1>
            <div className='flex flex-col w-full'>
               {orders.length===0 ? <div className='text-center my-5 text-gray-400'>No order for you</div>:
                orders.map((order)=>{
                   return <OrderItem key={order._id} order={order} removeOrder={removeOrder}/>
                })
                }
                
            </div>

            </div>

        </div>
    )
}

export default AdminOrder
