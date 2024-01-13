import React, { useEffect, useState } from "react";
import { BsCartX } from "react-icons/bs";
import { addproduct } from "../Api/productsApi";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../State/Slice/productSlice";
import { getCategory } from "../Api/categoryApi";
import { setCategory } from "../State/Slice/categorySlice";
import { setToastify } from "../State/Slice/toastifySlice";

const AddProduct = () => {
    const dispatch = useDispatch();
    const category = useSelector(state => state.category);
    const initialState={ name: "", price: "", img: "", category: "", description: "" }
    const [productDetails, setProductDetails] = useState(initialState);
    const [img,setImg]=useState();
    const handleChange = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };
    const handleImg = (e) => {
        setProductDetails({ ...productDetails, img: e.target.files[0] });
        if(e.target.files.length!==0){
            setImg(URL.createObjectURL(e.target.files[0]))
        }
        else{
            setImg(null);
        }
        
    }

    const handleCategory=(e)=>{
        console.log("fg")
        setProductDetails({...productDetails,category:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await addproduct(productDetails);
        if (res.success) {
            console.log("Product added", res.product);
            dispatch(addProduct(res.product))
            setProductDetails(initialState);
            dispatch(setToastify({show:true,msg:"Order added succesfully"}))
        }
        else {
            console.log("eror", res.error);
        }

    }
    console.log(productDetails)

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


    
    return (
        <div className="w-full pb-4  pt-14 border-b-2 max-w-[1200px] mx-auto">
            <div className="w-full ">
                <h1 className="text-4xl text-[#324d67] uppercase my-2 drop-shadow-lg font-bold text-center">
                    Add Product
                </h1>
                <div className="flex flex-col-reverse sm:flex-row sm:items-center">
                    <div className="bg-gray-200 w-[calc(100%-8px)] mx-1 my-4 rounded-lg">
                        <form
                            className="flex flex-col gap-4 px-1 sm:mx-auto py-2 my-4 sm:w-[calc(100%-20px)]"
                            id="product"
                            onSubmit={handleSubmit}
                        >
                            <span className="flex items-center">
                                <label htmlFor="pname" className="w-[32%]">
                                    Product name
                                </label>
                                <input
                                    name="name"
                                    value={productDetails.name}
                                    id="pname"
                                    type="text"
                                    required
                                    className="w-[65%] border-2 h-8 rounded-md focus:border-violet-500 focus:bg-violet-50 shadow-sm outline-none p-2"
                                    onChange={handleChange}
                                />
                            </span>
                            <span className="flex items-center">
                                <label htmlFor="price" className="w-[32%]">
                                    Price
                                </label>
                                <input
                                    name="price"
                                    value={productDetails.price}
                                    onChange={handleChange}
                                    id="price"
                                    type="number"
                                    required
                                    className="w-[65%] border-2 h-8 rounded-md focus:border-violet-500 focus:bg-violet-50 shadow-sm outline-none p-2"
                                />
                            </span>
                            <span className="flex items-center">
                                <label htmlFor="category" className="w-[32%]">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    onChange={handleCategory}
                                    id="category"
                                    required
                                    value={productDetails.category}
                                    className="w-[65%] border-2 h-8 rounded-md focus:border-violet-500 focus:bg-violet-50 shadow-sm outline-none "
                                >   
                                <option value="N/A">N/A</option>
                                {
                                    category.map((c)=>{
                                        return <option key={c._id} value={c.name}>{c.name}</option>
                                        
                                    })
                                }
                                    


                                </select>
                            </span>
                            <span className="flex items-center">
                                <label htmlFor="description" className="w-[32%]">
                                    Description
                                </label>
                                <input
                                    name="description"
                                    value={productDetails.description}
                                    onChange={handleChange}
                                    id="description"
                                    type="text"
                                    required
                                    className="w-[65%] border-2 h-8 rounded-md focus:border-violet-500 focus:bg-violet-50 shadow-sm outline-none p-2"
                                />
                            </span>
                            <span className=" flex items-center">
                                <label htmlFor="pimg" className="w-[31%] flex flex-shrink-0">
                                    Product Image
                                </label>
                                <input id="pimg" type="file" required name="img" onChange={handleImg} />
                            </span>
                        </form>
                    </div>
                    <div className="flex rounded-lg relative p-3 w-[calc(100%-20px)] sm:w-[40%] mx-[10px] h-[270px]  my-2 bg-gray-100 overflow-hidden">
                        {img ? (
                            <img
                                src={img}
                                alt=""
                                className="w-[100%] h-[100%]"
                            />
                        ) : (
                            <>
                                <BsCartX className="w-32 h-32 mx-auto text-gray-400" />
                                <span className="  absolute w-[270px] text-gray-400 bottom-4 left-[50%] -translate-x-[50%] ">
                                    No Product Image have been added
                                </span>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        form="product"
                        className="w-[calc(100%-20px)] sm:w-[200px] bg-[#324d67] h-9 font-semibold text-lg  rounded-lg text-white"
                    >
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
