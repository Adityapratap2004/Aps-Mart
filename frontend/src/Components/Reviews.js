import React, { useEffect, useState } from 'react'

import ReviewCard from './ReviewCard';
import { getreviews, postreview } from '../Api/reviewApi';
import { useDispatch } from 'react-redux';
import { setToastify } from '../State/Slice/toastifySlice';

const Reviews = ({product}) => {    // here product is the product id
   
    const [openR,setR]=useState(false);
    const [reviews,setReviews]=useState([]);
    const initialReview={review:"",rating:"5"};
    const [review,setReview]=useState(initialReview);
    const dispatch=useDispatch();
    const handleChange=(e)=>{
        setReview({...review,[e.target.name]:e.target.value})
    }

    const handleReview=async(e,id)=>{
        e.preventDefault();
        const res=await postreview(id,review);
        if(res.success){
            console.log("Review added");
            setReviews([...reviews,res.review])
            dispatch(setToastify({show:true,msg:"Review added successfully"}));
            
        }
        else{
            dispatch(setToastify({show:true,msg:res.error}))
            console.log("Some error have occured",res.error)
        }
        setReview(initialReview);
        setR(false)
    }

    useEffect(()=>{

        const getReview=async(id)=>{
            const res=await getreviews(id);
            if(res.success){
                console.log("Reviews arrived");
                setReviews(res.reviews);
                
            }
            else{
                console.log("Error");
            }
        }

        getReview(product);
        

    },[product])
    
    
    return (
        <div className='my-5 w-full px-7 sm:px-10  lg:px-24 '>
            <h1 className='text-3xl sm:text-4xl  capitalize font-semibold text-[#324d67] drop-shadow-lg mb-4'>
                Reviews
                
            </h1>
            <button className=' bg-[#324d67] font-semibold text-lg text-white h-9 w-full sm:w-[200px] my-4 rounded-lg' onClick={()=>{setR(true)}}>Add a review</button>
            {openR && <div className='bg-white rounded-lg my-2'>
                <form onSubmit={(e)=>{handleReview(e,product)}} className='flex flex-col sm:space-x-5 space-y-5 py-3  items-center' >
                    <textarea onChange={handleChange} required rows="4" name="review" placeholder="Review" maxLength="450" className='outline-none text-center bg-gray-100 rounded-lg p-3 w-full' value={review.review} style={{ overflow: "auto" }} />
                    <div className='flex flex-col space-y-2 sm:space-y-0 sm:flex-row justify-around items-center w-full'>
                        <select onChange={handleChange} name="rating" value={review.rating} className='w-full sm:w-[380px] p-2 bg-gray-100 rounded-lg outline-none' >
                            <option value="5">I loved it</option>
                          <option value="4">I liked it</option>
                            <option value="3">It was OK</option>
                            <option value="2">Mediocre Tastes</option>
                            <option value="1">I hated it</option>
                        </select>
                        <div className='flex w-full justify-between sm:justify-end gap-5 px-2'>
                            <button type="submit" className='w-32 h-9 bg-[#324d67] text-white rounded-lg py-1 font-semibold'>Post</button>
                            <button className='w-32 h-9 bg-[#324d67] text-white rounded-lg py-1 font-semibold' onClick={(e) => {
                                e.preventDefault();
                                setR(false)
                            }}>Close</button>
                        </div>
                    </div>
                </form>

            </div>}
            {

                reviews.length!==0 ? <div className='space-y-2 sm:space-y-4'>
                {reviews.map((review)=>{return<ReviewCard key={review._id} review={review} />}) }</div>
                 :
                    <div className='text-center my-4 text-gray-400'>No reviews present</div>
            }

        </div>
    )
}

export default Reviews



