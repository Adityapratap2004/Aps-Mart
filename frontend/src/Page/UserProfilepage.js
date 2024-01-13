import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Profile from '../Components/Profile'
import { useDispatch } from 'react-redux';
import { setNavbar } from '../State/Slice/navbarSlice';
import Cookies from 'js-cookie';
import { setToastify } from '../State/Slice/toastifySlice';
import { useNavigate } from 'react-router-dom';

const UserProfilepage = () => {
  const dispatch = useDispatch();
  const nav=useNavigate();
  useEffect(() => {
      if(!Cookies.get('authToken')){
        dispatch(setToastify({show:true,msg:"You need to login to see you profile"}))
        nav("/");
      }
      window.scrollTo({top:0,behavior: "smooth",});
      dispatch(setNavbar(true))
  }, [dispatch,nav])
  return (
    <div className='sm:bg-gray-300 w-full min-h-[100vh]'>
    <img src={require('../Images/profilebg.jpg')} alt="" className='mix-blend-multiply sm:flex  hidden md:block absolute  right-12 top-20 h-[calc(100vh-6rem)]'/>
    <Navbar />
    <Profile/>
      
    </div>
  )
}

export default UserProfilepage
