const host = process.env.REACT_APP_HOST;
export const getProduct=async()=>{
    const response=await fetch(`${host}/product`,{
        method:"GET",
        mode:"cors",
        credentials:"include",
        headers:{
            "content-type":"application/json"
        }
    })

    const res=await response.json();
    return res;
}

export const relatedProduct=async(category,name)=>{
    console.log("category in api",category);
    const response=await fetch(`${host}/product/releated`,{
        method:"POST",
        mode:"cors",
        credentials:"include",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({category:category,name:name})
    })

    const res=await response.json();
    console.log("api",res.products);
    return res;
}

export const addproduct=async({name,price,category,description,img})=>{
    console.log(name);
    const formData=new FormData();
    formData.append('name',name);
    formData.append('price',price);
    formData.append('category',category);
    formData.append('description',description);
    formData.append('file',img);
    const response=await fetch(`${host}/product/addProduct`,{
        method:"POST",
        mode:"cors",
        credentials:"include",
        body:formData
    })

    const res=await response.json();
    return res;

}

export const deleteproduct=async(id)=>{
    const response=await fetch(`${host}/product/deleteProduct/${id}`,{
        method:"DELETE",
        mode:"cors",
        credentials:"include"
       
    })

    const res=await response.json();
    return res;

}

export const topproducts=async()=>{
    const response=await fetch(`${host}/product/topproducts`,{
        method:"GET",
        mode:"cors",
        credentials:"include",
    });

    const res=await response.json();
    return res;
}

export const categoryWiseProduct=async(category)=>{
    const response=await fetch(`${host}/product/category`,{
        method:"POST",
        mode:"cors",
        credentials:"include",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({category:category})
    });

    const res=await response.json();
    
    return res;

}

export const productdetails=async(id)=>{
    const response=await fetch(`${host}/product/details/${id}`,{
        method:"GET",
        mode:"cors",
        credentials:"include",
    });
    const res=await response.json();
    return res;


}

export const searchresult=async(search,page)=>{
    console.log(search);
    
    
    const response=await fetch(`${host}/product?search=${encodeURIComponent(search)}&page=${encodeURIComponent(page)}`,{
        method:"GET",
        mode:"cors",
        credentials:"include",
        headers:{
            "content-type":"application/json"
        }
    });
    const res=await response.json();
    return res;  
  
}