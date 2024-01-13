import { configureStore } from '@reduxjs/toolkit'
import navbarSlice from './Slice/navbarSlice';
import toastifySlice from './Slice/toastifySlice';
import productSlice from './Slice/productSlice';
import categorySlice from './Slice/categorySlice';
import cartSlice from './Slice/cartSlice';


const store = configureStore({
    reducer: {
        navbarbg: navbarSlice ,
        toastify:toastifySlice,
        product:productSlice,
        category:categorySlice,
        cart:cartSlice,       
    }

})

export default store;