import React, { useEffect, useState } from 'react'
import { updatedetails } from '../Api/profileApi';
import { useDispatch } from 'react-redux';
import { setToastify } from '../State/Slice/toastifySlice';

const ProfileUpdate = ({ profile, handleUpdate,setUpdateprofile }) => {
  const [userDetails, setUserDetails] = useState({});
  const dispatch=useDispatch();
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  }

  const closeUpdate=()=>{
    handleUpdate(false);
  }
  const propo=(e)=>{
    e.stopPropagation();
  }
       
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handlesubmot")
    handleUpdate(false);
    const res = await updatedetails(userDetails);
    if(res.success){
      console.log("Your details are updated");
      dispatch(setToastify({show:true,msg:"Your details are updated"}));
      setUpdateprofile(res.updatedUser);
    }
    else{
      console.log("Some error have occured",res.error);
    }

  }
  useEffect(() => {
    setUserDetails(profile);
    window.scrollTo({top:0,behaviour:'smooth'})
    document.body.style.overflowY = 'hidden'

    return () => {
      document.body.style.overflowY = "visible"
    }
  }, [profile])

  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center absolute top-0 right-0 bg-[rgba(0,0,0,0.5)]' onClick={closeUpdate}>
      <div className=' w-[300px] sm:w-[325px] h-[350px] bg-gray-200 flex items-center justify-center p-5 rounded-lg' onClick={(e)=>{propo(e)}} >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2 text-gray-500 w-[275px] ">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" minLength="3" required name="name" onChange={handleChange} value={userDetails.name} className="border-2 h-8 rounded-md focus:border-violet-500 focus:bg-violet-50 shadow-sm outline-none p-2" />
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" onChange={handleChange} value={userDetails.address} className="border-2 h-8 rounded-md focus:border-violet-500 focus:bg-violet-50 shadow-sm outline-none p-2" />
            <label htmlFor="phoneno">Phone No</label>
            <input type="number" minLength="8" id="phoneno" name="phoneno" onChange={handleChange} value={userDetails.phoneno} className="border-2 h-8 rounded-md focus:border-violet-500 focus:bg-violet-50 shadow-sm outline-none p-2" />
          </div>
          <button type='submit' className="w-full  justify-center items-center flex cursor-pointer border my-9 h-9 rounded-md p-1  bg-red-500 drop-shadow-lg text-white font-semibold" > Update Details </button>
        </form>
      </div>


    </div>
  )
}

export default ProfileUpdate
