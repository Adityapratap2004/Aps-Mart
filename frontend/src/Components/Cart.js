import React, { useEffect } from 'react'
import { IoMdClose } from "react-icons/io"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { BsCartX } from "react-icons/bs"
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../Api/cartApi'
import { setCart } from '../State/Slice/cartSlice'
import Cookies from 'js-cookie'
import { setToastify } from '../State/Slice/toastifySlice'
import { handlecheckout } from '../Api/paymentApi'
import { useNavigate } from 'react-router-dom'


const Cart = (props) => {

    const dispatch = useDispatch();
    let total = 0;
    const nav = useNavigate();

    const cart = useSelector(state => state.cart);
    for (var i in cart) {
        total += cart[i].qty * cart[i].product.price
    }
    const handleClose = () => {
        console.log("Clicked close")
        props.setCart(false);
    }
    const propo=(e)=>{
        e.stopPropagation();
      }

    const handleCheckout = async () => {
        if (Cookies.get('authToken')) {
            console.log("cart._id", cart);
             await handlecheckout(cart._id);
            dispatch(setCart([]));
                
            
            
        }
        else {
            dispatch(setToastify({show:true,msg:"You need to logged in"}))
            nav("/login")
            
        }
    }

    useEffect(() => {
        if (!Cookies.get('authToken')) {
            console.log("User not logged in");
            dispatch(setToastify({ show: true, msg: "You need to be logged in to access thie feature" }));
        }

        const getcart = async () => {
            const res = await getCart();
            if (res.success) {
                console.log("cart item arrived", res.cart);
                dispatch(setCart(res.cart));

            }
            else {
                console.log("some error have occured", res.error);
            }
        }
        getcart();


    }, [dispatch]);


    return (
        <div className='h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] z-50 absolute top-0 text-[#324d67]' onClick={() => { handleClose() }} >
            <div className='flex flex-col w-[calc(100%-60px)] h-full sm:w-[400px] bg-white px-4 py-2 cart' onClick={(e)=>{propo(e)}}>
                <div className="flex w-full justify-between text-xl items-center font-bold border-b-2 py-2">
                    <div className='flex items-center uppercase gap-x-2'>
                        <span>Shopping Cart</span> <AiOutlineShoppingCart className='w-6 h-6' />
                    </div>
                    <div onClick={() => { handleClose() }}>
                        <IoMdClose className='w-6 h-6 cursor-pointer' />
                    </div>
                </div>
                <div className='my-4'>
                    {(cart.length === 0) ? <div className='flex flex-col items-center my-10 text-gray-200'>
                        <BsCartX className='w-32 h-32' />
                        <span className='text-gray-400'>No product in the cart</span>
                        <span className='text-violet-400 cursor-pointer' onClick={() => { handleClose() }}>Return to Shop</span>
                    </div> :
                        <div>

                            {cart.map((cartItem) => {
                                return <CartItem key={cartItem._id} cartItem={cartItem} />
                            })

                            }
                        </div>
                    }

                </div>
                <div className="text-xl font-bold w-full absolute bottom-0 right-0 p-4 ">
                    <div className='flex w-full justify-between py-3  border-y-2 '>
                        <span className='uppercase'>
                            Subtotal
                        </span>
                        <span>
                            ₹{total}
                        </span>
                    </div>
                    <div className='w-full bg-[#324d67] text-white text-center py-2 mt-4 rounded-lg cursor-pointer' onClick={handleCheckout}>
                        Checkout
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Cart
