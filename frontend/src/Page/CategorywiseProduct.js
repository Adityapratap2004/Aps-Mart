import React, { useEffect } from 'react'
import Products from '../Components/Products'
import { useDispatch } from 'react-redux'
import { setNavbar } from '../State/Slice/navbarSlice';
import Navbar from '../Components/Navbar';

const CategorywiseProduct = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo({top:0,behavior: "smooth",});
        dispatch(setNavbar(true))
    }, [dispatch])

   
    return (
        <div>
            <Navbar />
            <Products  />
        </div>
    )
}

export default CategorywiseProduct
