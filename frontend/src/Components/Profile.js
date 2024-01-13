import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { VscAccount } from "react-icons/vsc"
import { getdetails, updateImg } from '../Api/profileApi'
import ProfileUpdate from './ProfileUpdate'
const Profile = () => {  

  const [profile, setProfile] = useState({});
  const [update, setUpdate] = useState(false);
  const [img,setImg]=useState();
  const handleUpdate = () => {
    setUpdate(!update);
  }
  const setUpdateprofile = (p) => {
    setProfile(p)
  }

  const handleImg = async(e) => {
    // setProfile({ ...profile, profileImg: e.target.files[0] });
    if(e.target.files.length!==0){
        setImg(URL.createObjectURL(e.target.files[0]))
        console.log("handleIMg",e.target.files[0])

        const res=await updateImg(e.target.files[0]);
        if(res.success){
          console.log("Image updated");
          setProfile(res.updatedUser);
        }
        else{
          console.log("some error have occured",res.error);
        }
      }
    else{
        setImg(null);
    }
    
}
  useEffect(() => {

    const getProfile = async () => {
      const res = await getdetails();
      if (res.success) {
        console.log("Proile is here", res.user);
        setProfile(res.user);
      }
      else {
        console.log("error", res.error);
      }
    }
    getProfile();


  }, [])
  return (
    <div className='w-full min-h-[100vh] px-6 sm:px-10 lg:px-24  pt-14  ' >
      <div className='w-full max-w-[1200px]  h-full  '>
        <h1 className='text-[#324d67] sm:text-white my-3 sm:pt-8 text-4xl sm:text-6xl font-bold uppercase drop-shadow-lg '>Profile</h1>
        <div className='flex flex-col-reverse sm:flex-row gap-y-4 sm:gap-x-2'>
          <div className='sm:w-[calc(70%-4px)]  p-5 rounded-lg drop-shadow-lg '>
            <h1 className='text-2xl mb-2 font-bold drop-shadow-lg text-[#324d67]'>User Details</h1>
            <div className='h-[50px] w-[50px] rounded-full bg-gray-200 drop-shadow-lg overflow-hidden'>
          <label htmlFor='file' className=' cursor-pointer'>

            {profile.profileImg ? <> {profile.profileImg.imgUrl ? <img src={profile.profileImg.imgUrl} alt="" className="h-[50px] w-[50px] contain rounded-full" />:<img src={img} alt="" className="w-[100%] h-[100%]" /> }</>
              :
              <>
                <VscAccount className="h-[50px] w-[50px] mx-auto text-gray-400 " />
                {/* <span className="  absolute  text-gray-400 bottom-4 text-center left-[50%] -translate-x-[50%] ">
                  Add profile image
                  
                </span> */}
              </>
            }
            </label>
            <input type='file' id="file" name="img" onChange={handleImg} className='hidden'/>
          </div>

            <p><span className='text-lg font-semibold mr-2'>Name: </span>{profile.name}</p>
            <p><span className='text-lg font-semibold mr-2'>Email: </span>{profile.email}</p>
            <p><span className='text-lg font-semibold mr-2'>Address: </span>{profile.address}</p>
            <p><span className='text-lg font-semibold mr-2'>Phone No: </span>{profile.phoneno}</p>
            <div className=' bg-red-500 text-white w-40 cursor-pointer h-9 flex items-center justify-center font-bold text-lg rounded-lg drop-shadow-lg  mt-4' onClick={handleUpdate}>Update Details</div>
          </div>
          
        </div>
        <div>
          <h1 className='text-[#324d67] sm:text-white my-3 sm:pt-8 text-4xl sm:text-6xl font-bold uppercase drop-shadow-lg '>orders</h1>
          <div>
            {
              !profile.orders ? <div className='ml-8 mt-8 text-gray-400'>
                We are waiting for you to order
              </div>
                :
                <div className='pt-4'>
                  {
                    profile.orders.map((o) => {
                      return <div className='max-w-[800px] rounded-lg py-2 px-2 hover:bg-gray-100'>
                      <Link to={`/productdetails/${o._id}`}>
                        <div className='flex w-full'>
                          <div className='w-[65px] h-[65px] flex-shrink-0 bg-gray-200 p-2'>
                            <img src={o.img.imgUrl} alt="" />
                          </div>
                          <div className='flex flex-col w-[calc(100%-70px)] px-2 max-w-[700px] mx-auto'>
                            <span className='text-[#324d67] font-semibold text-ellipsis overflow-hidden whitespace-nowrap uppercase'>{o.name}</span>
                            <span className='text-sm text-ellipsis overflow-hidden whitespace-nowrap'>{o.description}</span>
                            <span className='sm:text-red-500 font-xl font-semibold'> ₹{o.price}</span>
                          </div>
                          
                        </div>
                        </Link>
                      </div>
                    })
                  }
                </div>
            }
          </div>
        </div>

      </div>
      {update && <ProfileUpdate profile={profile} handleUpdate={handleUpdate} setUpdateprofile={setUpdateprofile} />}

    </div>
  )
}

export default Profile
