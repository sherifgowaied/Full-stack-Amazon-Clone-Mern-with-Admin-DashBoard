import axios from "axios"


const BASE_URL = "http://localhost:5000/api"
let TOKEN ;
let tokenTmp;
// console.log(TOKEN)
if(localStorage.getItem("persist:root")){
    tokenTmp= JSON.parse(localStorage.getItem("persist:root"))
    // console.log(tokenTmp)
    // console.log(tokenTmp.user)
    if (tokenTmp?.user === undefined || null ){
      
    //   console.log(tokenTmp.user)
      TOKEN = null;
     
    }else{
      const tokenTmp1 = JSON.parse(tokenTmp.user)
    //   console.log(tokenTmp1)
      tokenTmp = tokenTmp1?.currentUser
      TOKEN = tokenTmp?.accessToken
    }
  }else{
    TOKEN = null;
  }
  console.log(TOKEN)
//   console.log(TOKEN)
//const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDUyMWFhOTI5OTYzNDU2NTVjZGM1MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1ODU0Nzc0NCwiZXhwIjoxNjU4ODA2OTQ0fQ.Q3lcOFv83DmNNTNDQRfDqGds479FTh2gCF0FcN4TvAA"

export const publicRequest= axios.create({
     baseURL:BASE_URL
    })

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{token:`Bearer ${TOKEN}`}
})