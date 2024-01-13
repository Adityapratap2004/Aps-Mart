const host=process.env.REACT_APP_HOST;
export const getCart=async()=>{
    const response=await fetch(`${host}/cart`,{
        method:"GET",
        mode:"cors",
        credentials:"include",
    })

    const res=await response.json();
    return res;
}

export const updateCartItem=async(id,qty)=>{
    const response=await fetch(`${host}/cart/updatecart/${id}`,{
        method:"PATCH",
        mode:"cors",
        credentials:"include",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({qty:qty})
    })

    const res=await response.json();
    return res;
}

export const deleteCartItem=async(id)=>{
    const response=await fetch(`${host}/cart/deletecart/${id}`,{
        method:"DELETE",
        mode:'cors',
        credentials:'include',
    })

    const res=await response.json();
    return res;
}

export const addtocart=async(id,qty)=>{
    
    const response=await fetch(`${host}/cart/addtocart/${id}`,{
        method:"POST",
        mode:"cors",
        credentials:"include",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({qty:qty})
    })

    const res=await response.json();
    return res;
}