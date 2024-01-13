import React, { useEffect, useState } from 'react'
import ProductsItem from './ProducItem'
import {categoryWiseProduct, topproducts} from '../Api/productsApi'
import { useParams } from "react-router-dom";


const Products = () => {
    let { id } = useParams();
    console.log("id",id);
   
    const [products,setProducts]=useState([])
    useEffect(()=>{
        console.log("use effect of Products")
        const getProduct=async()=>{
            console.log("top");
            const res=await topproducts();
            if(res.success){
                console.log("Top products are here",res.products);
                setProducts(res.products);
            }
            else{
                console.log("Error",res.error);
            }
        }
        

        const getCategoryWisePorduct=async(category)=>{
            console.log("dd",category);
            const res=await categoryWiseProduct(category);
            if(res.success){
                console.log("Top products are here",res.products);
                setProducts(res.products);
            }
            else{
                console.log("Error",res.error);
            } 
        }
        if(id===undefined){
            console.log('home')
           getProduct();
        }
        else{
            getCategoryWisePorduct(id);
        }
    },[id])
    console.log(products);
    return (
        <div className='w-full  px-6 sm:px-10 lg:px-24 pt-14'>
            <h1 className='text-[#324d67] text-4xl sm:text-6xl font-bold uppercase drop-shadow-lg text-center'>{id? id:"Our popular products"}</h1>
            <p className='text-center text-gray-400 mb-6 sm:mb-10'>Little bit discription</p>
            <div className='flex flex-wrap'>
               {products && products.map((product)=>{
                    return  <ProductsItem key={products._id} product={product} />  
               })
                       
               }
            </div>

        </div>
    )
}

export default Products
