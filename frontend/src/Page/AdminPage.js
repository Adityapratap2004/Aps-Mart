import React, { useEffect } from 'react'

import Navbar from '../Components/Navbar'
import AddProduct from '../Components/AddProduct'
import AdminProducts from '../Components/AdminProducts'
import AdminOrder from '../Components/AdminOrder'
import { useDispatch} from 'react-redux'
import { getProduct } from '../Api/productsApi';
import { setProduct } from '../State/Slice/productSlice';

const AdminPage = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        window.scrollTo({top:0,behavior:'smooth'})
        const getproducts=async()=>{
            const res=await getProduct();
            if(res.success){
                dispatch(setProduct(res.products));
                console.log('Products are here');
            }
            else{
                console.log("Error",res.error);
            }
        }
        getproducts();      

    },[dispatch])

    
    
  return (
    <div>
        <Navbar/>
        <AddProduct/>
        <AdminProducts/>
        <AdminOrder/>
      
    </div>
  )
}

export default AdminPage
