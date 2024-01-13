import React from 'react'
import ProductsItem from './ProducItem'
import { useSelector } from 'react-redux'

const AdminProducts = () => {
    const products=useSelector(state=>state.product);
    return (
        <div className='w-full px-6 max-w-[1200px] mx-auto sm:px-10 py-4 border-b-2 '>
            <div className='w-full '>
                <h1 className='uppercase text-[#324d67] text-4xl font-bold drop-shadow-lg text-center my-2'>Admin Products</h1>
                <div className='flex flex-wrap sm:gap-3'>
                    {
                        products && products.map((p)=>{
                            return <ProductsItem key={p._id} product={p} admin={true}/>
                        })
                    }
                </div>

            </div>


        </div>
    )
}

export default AdminProducts
