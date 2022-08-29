import { Navbar } from "../components/navbar/Navbar"
import "./Sproduct.css"
import { NewLetter } from '../components/newLetter/NewLetter'
import { Footer } from '../components/footer/Footer'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from "react";
import {  useLocation } from 'react-router-dom';
import { useState } from 'react';
import {publicRequest} from "../requestMethods"
import { addProduct } from "../redux/cartRedux";
import {useDispatch} from "react-redux"
export const Product = () => {
    const [product,setProduct]=useState ({})
  const location = useLocation()
  const productId = location.pathname.split("/")[2]
  const[quaninty,setQuaninty]=useState(1)
  const [color,setColor]=useState(null);
  const [size,setSize]=useState(null);
  const dispatch = useDispatch()

    useEffect(()=>{
        const getProduct = async()=>{
            try {
                const res = await publicRequest.get('/products/find/'+productId);
                setProduct(res.data)
            } catch (error) {
             console.log(error)   
            }
        }
        getProduct()
    },[productId])

    const handleQuantity = (method)=>{
        if(method ==="dec"){
            setQuaninty(quaninty === 1 ? quaninty : quaninty - 1)
        }else{
            setQuaninty( quaninty + 1)
        }
    }
    const handleSubmit = ()=>{
        //update cart
        dispatch(
            addProduct({...product,quaninty,color,size}
             ))
    }

  return (
    <div  className="spBody">
     <>
    <div>
    <Navbar />
    <div className="singleProduct">
        <div className="spImgContainer">
            <img src={product.img} alt="" className="spImg"  />
        </div>
        <div className="spInfoContainer">
            <h1>{product.title}</h1>
            <div className="spDesc">
            {product.desc}
            </div>
            <span className="spPrice">$ {product.price}</span>
            <div className="spFilterContainer">
                <div className="spFilter">
                    <span className="spFilteTitle">Color</span>
                    {product && product.color?.map((c)=>(
                        <div className="spFilterColor" onClick={()=>setColor(c)} style={{backgroundColor:`${c}`}} key={c}></div>
                    ))}
                   
                </div>
                <div className="spFilter">
                    <span className="spFilteTitle">Size</span>
                    <select className="spSelect" onChange={(e)=>setSize(e.target.value )}>
                        {product && product.size?.map((s,i)=>(
                            <option className="spOption" value={s} key={`${s}${i}`} >{s}</option>
                        ))}
                        
                       
                    </select>
                </div>
            </div>
            <div className="spFilterContainer">
                <div className="addAmountContainer">
                    <RemoveIcon className="spIcon" onClick={()=>handleQuantity("dec")} />
                    <span className="spAmount">{quaninty}</span>
                    <AddIcon  className="spIcon"  onClick={()=>handleQuantity("inc")}/>
                </div>
                <button className="addToCartBtn" onClick={handleSubmit}>Add to Cart</button>
            </div>


        </div>

    </div>
   
    </div>
   </>
     <NewLetter  />
     <Footer  />
     </div>
  )
}
