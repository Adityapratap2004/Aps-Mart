import React from 'react'
import { Link } from "react-router-dom"

const SearchItem = ({product,setSearch}) => {

    return (

        <div className='max-w-[800px] py-2 mx-auto px-2 hover:bg-gray-100'>
            <div className='flex w-full'>
                <div className='w-[65px] h-[65px] flex-shrink-0 bg-gray-200 p-2'>
                    <img src={product.img.imgUrl} alt="" />
                </div>

                <Link to={`/productdetails/${product._id}`}><div className='flex flex-col w-[calc(100%-70px)] sm:px-2 max-w-[700px] mx-auto' onClick={()=>{setSearch(false)}}>
                        <span className='text-[#324d67] font-semibold text-ellipsis overflow-hidden whitespace-nowrap capitalize'>{product.name}</span>
                        <span className='text-sm text-ellipsis overflow-hidden whitespace-nowrap'>{product.description}</span>
                   
                </div>
                </Link>

            </div>

        </div>
    )
}

export default SearchItem
