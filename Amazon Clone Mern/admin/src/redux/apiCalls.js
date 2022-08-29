import {loginStart,loginFailure,loginSuccess} from "./userRedux"
import { publicRequest, userRequest } from "../requestMethods.js";
import { getProductFailure,
        getProductStart,
        getProductSuccess
        ,deleteProductStart,
        deleteProductSuccess,
        deleteProductFailure,
        updateProductStart,
        updateProductSuccess,
        updateProductFailure,
        addProductStart,
        addProductSuccess,
        addProductFailure,
} from "./productRedux";


export const login = async(dispatch,user)=>{
    dispatch(loginStart())
    try{
        const res = await publicRequest.post('/auth/login',user)
        //console.log(res.data)
        dispatch(loginSuccess(res.data))
    }catch(err){
        //console.log(err)
        
        dispatch(loginFailure())
    }
}

export const getProducts = async(dispatch)=>{
    dispatch(getProductStart())
    try{
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data));
    }catch(error){
        dispatch(getProductFailure())
    }
}

export const deleteProduct = async(dispatch,id)=>{
    dispatch(deleteProductStart())
    try{
        const res = await userRequest.delete(`/products/${id}`)
        dispatch(deleteProductSuccess(id))
    }catch(error){
        dispatch(deleteProductFailure())
    }
}
export const updateProduct = async(dispatch,id,product)=>{
    dispatch(updateProductStart())
    try{
        //update need todo the one bellow is working i think
        // const res = await userRequest.put(`/products/${id}`,product)
        // console.log(res.data)
        dispatch(updateProductSuccess({id,product}))
    }catch(err){
        dispatch(updateProductFailure())
    }
}

export const addProduct = async(dispatch,product)=>{
    dispatch(addProductStart())
    try{
        // NEED TO TRY 
        const res = await userRequest.post('/products',product)
        dispatch(addProductSuccess(res.data))
    }catch(error){
        dispatch(addProductFailure)
    }
}