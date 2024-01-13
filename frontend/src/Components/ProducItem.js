import React from 'react'
import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import { deleteProduct } from '../State/Slice/productSlice';
import { deleteproduct } from '../Api/productsApi';


const ProductsItem = ({admin,product}) => {
  const dispatch=useDispatch();
  const handleDelete=async(id)=>{
    const res=await deleteproduct(id);
    if(res.success){
      console.log("Product deleted");
      dispatch(deleteProduct(id));     

    }else{
      console.log("error",res.error);
    }

  }
 
  
  return (
    <div className='w-[calc(50%-10px)] sm:w-[calc(25%-10px)] mx-auto flex flex-col gap-x-2 gap-y-2 my-2 '>
      <div className='bg-gray-100 py-4 overflow-hidden rounded-md sm:rounded-lg'> <img src={product.img.imgUrl} alt="" className='transform transition duration-1000 hover:scale-125 cursor-pointer' /></div>
      <div className='flex flex-col px-1'>
        <Link to={`/productdetails/${product._id}`}>
          <p className='text-ellipsis overflow-hidden whitespace-nowrap text-lg font-semibold capitalize '>{product.name}</p>
          <p>₹{product.price}</p>
        </Link>
        {
          admin && <div className='h-9 mt-4 bg-[#324d67] rounded-lg text-white flex items-center justify-center cursor-pointer' onClick={()=>{handleDelete(product._id)}}>Delete Product</div>
        }
      </div>
    </div>
  )
}

export default ProductsItem
