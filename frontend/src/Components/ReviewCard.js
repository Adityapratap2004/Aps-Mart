import React from 'react'
import { VscAccount } from "react-icons/vsc"
import { BsStarFill } from "react-icons/bs"

const ReviewCard = ({review}) => {
    let i=0;  //key    
    return (
        <div>
            <div className='flex flex-col bg-gray-100 rounded-lg  px-4 py-2 gap-2'>
                <div className='flex items-center justify-between px-2 gap-2 text-base sm:text-xl font-semibold'>
                    <span className='flex items-center '>
                        <VscAccount className='mr-2' />
                        <p>{review.user.name}</p>
                    </span>
                    <span className='flex gap-2'>
                        <p className='flex gap-2 text-[#FFDF00]'>{[...Array(review.rating)].map(() => <BsStarFill key={i++} />)}</p><p className='flex gap-2 text-gray-200'>{[...Array(5-review.rating)].map(() => <BsStarFill key={i++}/>)}</p>
                    </span>

                </div>
                <div className='bg-white h-[calc(100%-10px)] p-4 rounded-lg text-sm'>
                   {review.review}
                </div>
            </div>

        </div>
    )
}

export default ReviewCard
