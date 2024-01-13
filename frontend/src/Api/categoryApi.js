 const host=process.env.REACT_APP_HOST
 export const getCategory =async()=>{
    const response=await fetch(`${host}/category/getcategory`,{
        
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