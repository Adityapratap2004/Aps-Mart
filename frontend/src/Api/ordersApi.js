const host=process.env.REACT_APP_HOST;

export const ordersList=async()=>{
    const response=await fetch(`${host}/orders`,{
        method:"GET",
        mode:"cors",
        credentials:"include",
    })

    const res=await response.json();
    return res;
}

export const orderComplted=async(id)=>{
    const response=await fetch(`${host}/orders/${id}`,{
        method:"DELETE",
        mode:'cors',
        credentials:'include',
    })

    const res=await response.json();
    return res;

}