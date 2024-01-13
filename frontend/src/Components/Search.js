import React, { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io"
import SearchItem from './SearchItem'
import { searchresult } from '../Api/productsApi';

const Search = ({ setSearch, search }) => {
    const [product,setproduct] = useState([]);           
    const [searchquery,setsearchquery]=useState({search:''});
    const [page,setpage]=useState(1);
    const [totalresult,setTotalresult]=useState(0);
    const limit=8;

    const handleChange=(e)=>{
        setsearchquery({...searchquery,[e.target.name]:e.target.value})
    }
    
    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const searchResut=async()=>{
            const res=await searchresult(searchquery.search,page);
            if(res.success){
                setproduct(res.products);
                setTotalresult(res.productsCount);
            }
            else{
                console.log("error");
            }
        }
        console.log("USE EFFECT SESRCH")
        if(searchquery.search!==""){
            searchResut();
        }
        

    },[searchquery,page])   
    
   
    
    return (
        <div className={`w-full h-[100vh] absolute top-0 right-0 z-50 bg-white text-black  ${search && 'search'}`}>
            <div className='w-full border-b-2 '>
                <div className='max-w-[1200px] mx-auto h-20 text-4xl  flex items-center justify-center'>
                    <input
                        type='text'
                        autoFocus
                        placeholder='Search'
                        className='w-full h-16 text-center focus:outline-none'
                        onChange={handleChange}
                        name="search"
                        value={searchquery.search}
                    />
                    <div className='text-[#324d67]'>
                        <IoMdClose onClick={() => { setSearch(false) }} className=' cursor-pointer hover:text-gray-300' />
                    </div>
                </div>


            </div>
            {product.length!==0 ? <div className='my-2 h-[calc(100vh-150px)] '>
                {product.map((p)=>{
                    return <SearchItem key={p._id} product={p} setSearch={setSearch}/>
                })}
            </div> :

                <div className='flex justify-center w-full text-gray-300 my-32 h-[calc(100vh-400px)] '>
                    Sorry! product is not is not in the inventory
                </div>

            }
            {/* pagination */}
           
           {totalresult>limit && <div className='flex gap-1 justify-center items-baseline'>Pages:
            {[...Array(Math.ceil(totalresult/limit))].map((o,i)=>{
                return <p className='w-[50px] h-7 border-2 border-gray-600 flex items-center justify-center cursor-pointer' value={i+1} onClick={()=>{setpage(i+1)}}>{i+1}</p>
            })
            }

            </div>}

        </div>
    )
}

export default Search
