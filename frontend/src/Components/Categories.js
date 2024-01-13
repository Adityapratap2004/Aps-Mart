import React ,{useEffect} from 'react'
import { Link } from 'react-router-dom';
import { getCategory } from '../Api/categoryApi';
import { setCategory } from '../State/Slice/categorySlice';
import { useDispatch, useSelector } from 'react-redux';




const Categories = () => {
    const categories=useSelector(state=>state.category);
    const dispatch=useDispatch();

    useEffect(() => {
        const getcategory = async () => {
            const res = await getCategory();
            if (res.success) {
                console.log("Category is here", res.category);
                dispatch(setCategory(res.category))
            }
            else {
                console.log("error", res.error);
            }
        }
        getcategory();

    }, [dispatch]);
    console.log(categories);

    return (
        <div className=' px-7 pt-8 lg:px-24 lg:pt-16 '  id="category">
            <div className='flex flex-col items-center'>
                <h1 className=' text-[#324d67] text-4xl sm:text-6xl font-bold uppercase drop-shadow-lg'>
                    Categories
                </h1>
                <p className='text-gray-400 text-center'>Stay Linked to Your Digital Universe with Top-Tier Electronics</p>
 
            </div>
            <div className=' flex w-[100%] mx-auto gap-y-2 gap-x-2 mt-6 sm:mt-12 flex-wrap'>
                {categories && categories.map((item)=>{
                    return<div key={item._id} className='w-[calc(50%-4px)] sm:w-[calc(25%-7px)] bg-black overflow-hidden rounded-lg'>
                            
                          <Link to={`/category/${item.name}`} >  <img src={item.img.img_url} alt="" className='transform
                                        transition duration-1000 hover:scale-125 w-full cursor-pointer'/></Link>

                    </div>
                })}


            </div>


        </div>
    )
}

export default Categories
