const host = process.env.REACT_APP_HOST;

export const login = async (cridential) => {
  const response = await fetch(`${host}/auth/login`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: cridential.Email,
      password: cridential.Password,
    }),
  });

  const res = await response.json();
  return res;
};

export const signup = async (cridential) => {
    console.log(cridential)
    const response=await fetch(`${host}/auth/signup`,{
        method:'POST',
        mode:'cors',
        credentials:'include',
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify({
            email:cridential.Email,
            password:cridential.Password,
            name:cridential.Name
        })
    })
    

    const res=await response.json();
    return res;
};
