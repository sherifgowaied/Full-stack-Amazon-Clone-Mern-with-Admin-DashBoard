import React from 'react'
import "./navbar.css"
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SecondNavbar from '../secondNavbar/SecondNavbar';
import {useSelector} from "react-redux"
import { cardActionAreaClasses } from '@mui/material';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const quantity = useSelector(state=>state.cart.quantity)
    const cart = useSelector(state=>state.cart)
    //console.log(cart)
    const currentUser = useSelector((state) => state.user.currentUser);
    
    


  return (
    <>
    <div className="container inherNavbar">
        <div className="wrapper">
            <div className="left">
                <Link to="/" style={{textDecoration:"none",color:"white"}}>
                <div className="logo">
                    <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" className="amazonLogo" alt=""  />
                    <span className='eg'>.eg</span>
                </div>
                </Link>
                <div className="deliver">
                    <div className="toEgypt">
                        <span className="deliverText">Delvier to</span>
                    </div>
                    <div className="Egypt">
                    <LocationOnOutlinedIcon  className="locationIcon" />
                        <span className='EgyptText'>Egypt</span>
                    </div>
                </div>
            </div>
            <div className="center">
                <div class="searchBox">
                <div className="All">All <ArrowDropDownOutlinedIcon className="dropDownIcon" /></div>
                <input className="inputSearch" type="text"  />
                <div className="seachIconDiv"><SearchOutlinedIcon font-size="50px" className="searchIcon"/></div>
                </div>
            </div>
            <div className="Right" >
                <div className="EgyptFlagDiv" id="RightR">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/2560px-Flag_of_Egypt.svg.png"
                     alt=""
                     height="18px"  />
                     <ArrowDropDownOutlinedIcon className="dropDownEgypt" />
                </div>
                <div className="MostRight" id="mostRight">
                   
                   <Link to="/login" style={{textDecoration:"none",color:"white"}}>
                   <>
                    <span className="hello">Hello sigin in</span>
                    <span className="accounts">Accounts & Lists </span>
                    </>
                    </Link> 
                </div>
                <div className='order' id="orderR">
                    Orders
                </div>
                <Link to="/cart">
                <div className="cart">
                    <div className="chatDiv">
                       <ShoppingCartOutlinedIcon id="cartIconR"  className="cartIcon" />
                       <span className='zero' id="zeroR">{quantity}</span>
                    </div>
                    <span className="cartText" id="cartTextR">Items Cart</span>
                </div>
                </Link>
                
            </div>
        </div>
    </div>
    <SecondNavbar />
    </>
  )
}
