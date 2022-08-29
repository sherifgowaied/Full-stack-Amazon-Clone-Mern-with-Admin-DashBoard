import "./products.css"
import {popularProducts} from "../../data"
import { Product } from "../product/Product"
import { useEffect, useState } from "react"
import axios from "axios"

export const Products = ({home,filters,category,sort}) => {
  const [products , setProducts] =useState([])
  const [filteredProducts,setFiltersProducted]=useState([])

  useEffect(() => {
    const getProducts = async()=>{
      try{
        const res = await axios.get(category?`http://localhost:5000/api/products?category=${category}`:"http://localhost:5000/api/products");
        setProducts(res.data)
      }catch(err){
        console.log(err);
      }
    }
  
    getProducts()
  }, [category])
  
  useEffect(()=>{
    category && setFiltersProducted(
   products.filter((item)=>
   Object.entries(filters).every(([key,value])=>
   
   item[key].includes(value)
   )
   )
    )
  },[products,category,filters])



  useEffect(()=>{
    if(sort==="newest"){
      setFiltersProducted(
        (prev)=>[...prev].sort((a,b)=>a.createdAt - b.createdAt)
      )
    }
    else if(sort==="asc"){
      setFiltersProducted(
        (prev)=>[...prev].sort((a,b)=>a.price - b.price)
      )
    }else{
      setFiltersProducted((prev)=>[...prev].sort((a,b)=>b.price - a.price))
    }
  },[sort])

  //console.log(filters,category,sort)
  return (
    <div className={home?"productsHome":"products"}>
        {category ? filteredProducts.map((item)=>(
        <Product item={item} key={item.id}  />
        ))
        :
        products.slice(0,8).map((item)=>(
          <Product item={item} key={item._id}  />
          ))
            
        }
    </div>
  )
}
