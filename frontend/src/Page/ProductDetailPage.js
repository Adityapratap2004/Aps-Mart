import React, { useEffect, useState} from 'react'
import Navbar from '../Components/Navbar'
import ProductDetail from '../Components/ProductDetail'
import { setNavbar } from '../State/Slice/navbarSlice'
import { useDispatch } from 'react-redux'
import RelatedProduct from '../Components/RelatedProduct'
import Reviews from '../Components/Reviews'
import { useParams } from 'react-router-dom'
import { productdetails } from '../Api/productsApi'


const ProductDetailPage = () => {
    const {id}=useParams();
    const dispatch=useDispatch();
    const [product,setProduct]=useState();
    
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        dispatch(setNavbar(true));
        console.log("Use effect product details")
        const productDetails=async(id)=>{
            const res=await productdetails(id);
            if(res.success){
                console.log("Product arrived",res.productdetails);
                setProduct(res.productdetails);
            }else{
                console.log("some error have occured",res.error);
            }
        }

        productDetails(id);
        
        
    },[dispatch,id])
    return (
        <div className='lg:mb-8'>
            <Navbar />
           {product && <><ProductDetail product={product} />
            <RelatedProduct category={product.category} name={product.name} />
            <Reviews product={product._id}/>
            </>
           }
            
        </div>
    )
}

export default ProductDetailPage
