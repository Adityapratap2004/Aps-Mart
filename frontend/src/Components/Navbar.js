import React, { useEffect, useState } from 'react'
import { TbSearch } from "react-icons/tb";
import { AiOutlineShoppingCart } from "react-icons/ai"
import { HiMenuAlt3 } from "react-icons/hi"
import { IoMdClose } from "react-icons/io"
import { VscAccount } from "react-icons/vsc"
import { useDispatch, useSelector } from 'react-redux';
import { setNavbar } from '../State/Slice/navbarSlice';
import { Link, useLocation, useNavigate } from "react-router-dom"
import Cart from './Cart';
import Search from './Search';
import Cookies from 'js-cookie'
import { setToastify } from '../State/Slice/toastifySlice';

const Navbar = ({ home }) => {
    // const [navbar, setNavbar] = useState(false);
    const nav=useNavigate();
    const [cart, setCart] = useState(false);
    const [search, setSearch] = useState(false);
    const dispatch = useDispatch();
    const navbar = useSelector(state => state.navbarbg);
    const [menu, setMenu] = useState(false);
    const [account,setAccunt]=useState(false);
    const cartItem=useSelector(state=>state.cart);
    const location=useLocation();
    const handleMenu = () => {
        setMenu(!menu);       
    }
    const handleLogout=()=>{
        console.log("handle logout")
        Cookies.remove('authToken');
        localStorage.removeItem('role');
        setAccunt(false);
        nav("/");
    }
    const handleCart=()=>{
        if(Cookies.get('authToken')){
            setCart(true)            
        }
        else{
            dispatch(setToastify({show:true,msg:"You need to login to access this feature"}))
        }
    }
    useEffect(() => {
        //it will add backgorund to the navbar when scroll reaches 64 
        if(!Cookies.get('authToken')){
            localStorage.removeItem('role');
            setAccunt(false);
        }

        if(location.hash){
            const elm=document.getElementById(location.hash.slice(1));
            if(elm){
              elm.scrollIntoView({behavior:'smooth'})
              
            }
          }

        const handleNavbar = () => {
            if (window.scrollY >= 120) {
                dispatch(setNavbar(true))
            }
            else {
                if (home) {
                    dispatch(setNavbar(false))
                }
            }
        }
        window.addEventListener('scroll', handleNavbar);
        return () => {
            window.removeEventListener('scroll', handleNavbar);
        }
    }, [home, dispatch,location.hash])

    return (
        <div>
            <div className={` ${navbar ? 'nav-bg-color ' : ''}    w-full px-7  sm:px-12 text-lg text-white fixed z-10`}>  {/* will make initial bg transparent */}
                <div className='flex relative justify-between  items-center h-12'>
                    <div className='hidden sm:block'>
                        <ul className='flex gap-5 capitalize cursor-pointer'>
                            <li><Link to="/">Home</Link></li>
                            <li>About</li>
                            <li><Link to="/#category">Categories</Link></li>
                            {localStorage.getItem('role')==='admin' && <li><Link to="/dashboard">Admin</Link></li>}
                        </ul>

                    </div>
                    <div className='lg:absolute md:left-[50%] md:-translate-x-[50%]'>  {/* done this inorder to make the logo appear in center */}
                        <h1 className='font-bold text-lg cursor-pointer uppercase '><Link to="/">ApsMart</Link></h1>
                    </div>
                    <div className='flex gap-5 '>
                        <TbSearch className='h-6 w-6 cursor-pointer' onClick={() => { setSearch(true) }} />

                        <div className='relative text-sm' onClick={handleCart} >
                            <AiOutlineShoppingCart className='h-6 w-6 cursor-pointer '  />
                            {cartItem.length!==0 && <p className='absolute  ml-3 -mt-7 bg-red-600 text-white rounded-2xl  w-4 h-4 flex items-center justify-center text-[10px]'>{cartItem.length}</p>}
                        </div>
                        {Cookies.get('authToken') ?<><VscAccount className='h-6 w-6 cursor-pointer' onClick={()=>{setAccunt(!account)}}/></> : <Link to="/login"><VscAccount className='h-6 w-6 cursor-pointer' onClick={() => { document.body.style.overflowY = 'hidden' }} /></Link>}
                        <div className={`absolute rounded-lg z-20 nav-bg-color p-4 mt-9 translate-x-[60%] ${account?'account':'hidden'}`}>
                            <ul>
                                <li className=' cursor-pointer'><Link to="/profile">Profile</Link></li>
                                <li className=' cursor-pointer' onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                        {!menu ? <HiMenuAlt3 className='h-6 w-6 opacity-100 cursor-pointer sm:hidden' onClick={() => { handleMenu(menu) }} /> : <IoMdClose className='h-6 w-6 opacity-100 cursor-pointer sm:hidden' onClick={() => { handleMenu(menu) }} />}
                        
                        <div className={`absolute rounded-lg sm:hidden z-20 nav-bg-color p-4 ${menu ? 'menu' : 'hidden bg-transparent'} mt-9 translate-x-[100%] `}>
                            <ul className='flex gap-2 flex-col text-[17px] capitalize cursor-pointer'>
                                <li><Link to="/">Home</Link></li>
                                <li>About</li>
                                <li><Link to="/#category">Categories</Link></li>
                                {localStorage.getItem('role')==='admin' &&<li><Link to="/dashboard">Admin</Link></li>}
                            </ul>

                        </div>
                    </div>

                </div>
                {cart && <Cart setCart={setCart} />}
                {search && <Search setSearch={setSearch} search={search} />}
            </div>

        </div>


    )
}

export default Navbar