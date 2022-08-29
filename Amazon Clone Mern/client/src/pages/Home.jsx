import React from 'react'
import { Navbar } from '../components/navbar/Navbar'
import { Slider } from '../components/slider/Slider'
import {Body} from "../components/body/Body"
import {Products} from "../components/products/Products"
import {Footer} from "../components/footer/Footer"
import "./home.css"
import { NewLetter } from '../components/newLetter/NewLetter'

export const Home = () => {
   const home =true
  return (
   <div className="allPage">
    <div className="navbarBlock">
        <Navbar />
    </div>
     <>  
        <Slider  /> 
        <Body  />
      
     </>
     <Products home={home} />
        <NewLetter  home={home}  />
        <Footer  home={home}  />
     </div>
  )
}
