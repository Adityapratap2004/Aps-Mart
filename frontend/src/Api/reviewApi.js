const host=process.env.REACT_APP_HOST;
export const getreviews=async(id)=>{
    const response=await fetch(`${host}/reviews/${id}`,{
        method:"GET",
        mode:"cors",
        credentials:"include"
    })

    const res=await response.json();
    return res;
}

export const postreview=async(id,review)=>{
    const response=await fetch(`${host}/reviews/givereview/${id}`,{
        method:"POST",
        mode:"cors",
        credentials:"include",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({review:review.review,rating:review.rating})

    })
    const res=await response.json();
    return res;

}

