const host=process.env.REACT_APP_HOST

export const getdetails=async()=>{
    const response=await fetch(`${host}/user`,{
        method:"GET",
        mode:"cors",
        credentials:"include",
    });
    const res=await response.json();
    return res;
}

export const updatedetails=async(userDetails)=>{
    const response=await fetch(`${host}/user`,{
        method:"PATCH",
        mode:"cors",
        credentials:"include",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({name:userDetails.name,address:userDetails.address,phoneno:userDetails.phoneno})

    });
    const res=await response.json();
    return res;

}
export const updateImg=async(img)=>{
    
    const formData=new FormData();
    formData.append('file',img);
    const response=await fetch(`${host}/user/profileImg`,{
        method:"PATCH",
        mode:"cors",
        credentials:"include",
        body:formData
    });
    const res=await response.json();
    return res;
}

