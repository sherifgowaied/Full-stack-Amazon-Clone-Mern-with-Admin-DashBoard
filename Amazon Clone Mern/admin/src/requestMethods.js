import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

// //const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user || "")?.currentUser?.accessToken


let TOKEN ;
let tokenTmp;

if(localStorage.getItem("persist:root")){
  tokenTmp= JSON.parse(localStorage.getItem("persist:root"))
  
  if (tokenTmp?.user === undefined || null ){
    
   
    TOKEN = null;
   
  }else{
    const tokenTmp1 = JSON.parse(tokenTmp.user)
    
    tokenTmp = tokenTmp1?.currentUser
    TOKEN = tokenTmp?.accessToken
  }
}else{
  TOKEN = null;
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});


// const TOKEN2 =
//    ( JSON.parse((localStorage.getItem("persist:root") === undefined ? "null" : localStorage.getItem("persist:root") )).currentUser === undefined)