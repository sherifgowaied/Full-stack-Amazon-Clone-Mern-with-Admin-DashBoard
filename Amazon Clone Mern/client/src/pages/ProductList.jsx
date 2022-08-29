import React, { useState } from 'react'
import { Navbar } from '../components/navbar/Navbar'
import { NewLetter } from '../components/newLetter/NewLetter'
import { Products } from '../components/products/Products'
import { Footer } from '../components/footer/Footer'
import "./productList.css"
import { useLocation } from 'react-router-dom'

export const ProductList = ({home}) => {
    const location = useLocation()
    const category = location.pathname.split("/")[2]
    const [filters,setFilters]=useState({});
    const [sort,setSort]=useState("newest")

    const handleFilters = (e)=>{
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]:value
        })
    }
    console.log(sort)
  return (
    <div className="AllproductListwindow">    <Navbar  />
    <div className="ProductListAllBody">
    <div className={'productListContainer'}>
        
        <h1 className="pHeader">{category}</h1>
        <div className="filterContainer">
            <div className="filter">
                <span className="filterText">Filter Products:</span>
                <select name="color"  onChange={handleFilters} className='filterSelect'>
                    <option disabled >Color</option>
                    <option value="white">White</option>
                    <option value="black">Black</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                </select>

              
                <select name="size" onChange={handleFilters} className='filterSelect'>
                    <option disabled >Size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
            </div>
            <div className="filter">
                <span className="filterText">Sort Products:</span>
                <select onChange={e=>setSort(e.target.value)} className='filterSelect'>
                    <option value="newest" >Newest</option>
                    <option value="asc">Price (asc)</option>
                    <option value="desc">Price (desc)</option>
                    
                </select>
            </div>
            
            
        </div>
        
        
        

    </div>
    <Products id="productsinhertID" filters={filters} category={category} sort={sort} />
    </div>
    <NewLetter  />
            <Footer  />
    </div>

  )
}
