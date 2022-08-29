import "./slider.css"
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate   } from "react-router-dom";

export const Slider = () => {
  const [imageNumberList,setImageNumberList] =useState(0)
  const navigate = useNavigate();
  
  const currentUser = useSelector
  ((state) => state.user.currentUser);
  const imageSlider = [
    "https://m.media-amazon.com/images/I/7102I1D+77L._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/61hIbVWqDiL._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/71i-6k8LoBL._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/619xcE1JVEL._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/71krlR65lnL._SX3000_.jpg"
  ]
  const handleClick = (d)=>{
    let number ;
    console.log(d)
    if(d ==="left"){
      number = imageNumberList === 0 ? 4 : imageNumberList - 1 ;
      setImageNumberList(number)
    }
    if(d ==="right"){
      number = imageNumberList === 4 ? 0 : imageNumberList + 1 ;
      setImageNumberList(number)
    }
  }

  const handleLogout = ()=>{
    localStorage.removeItem("persist:root");
    
    navigate('/login')
    window.location.reload();
    
  }

  return (
    <div className="slider">
       <div className="arrow" id="left" onClick={()=>handleClick("left")}>
        <ArrowBackOutlinedIcon />
        </div>
        <div className="Sliderwrapper">
        <div className="slide">
            <div className="imgContainer">
                <img src={imageSlider[imageNumberList]} alt="" className="imgAmazon"  />

            </div>
            <div className="infoContainer">
           
            </div>
        </div> 
        </div>
        <div className="arrow rightArrow" id="right"  onClick={()=>handleClick("right")}>
        <ArrowForwardOutlinedIcon />
        </div>

      
        {currentUser ? <button className="categoryItemBtnLogout" onClick={handleLogout}>Logout</button> 
        :<> <button className="categoryItemBtnLogout">Login</button></>}

    </div>
  )
}


