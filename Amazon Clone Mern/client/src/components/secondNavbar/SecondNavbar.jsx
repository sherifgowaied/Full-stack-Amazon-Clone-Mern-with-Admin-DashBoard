import React from 'react'
import './secondNavbar.css'
import DensitySmallOutlinedIcon from '@mui/icons-material/DensitySmallOutlined';
const SecondNavbar = () => {
  return (
    <div className="secondNavbarcontainer">
           <div className="secondWrapper">
           
           <div className="secondNavDiv lineIcon"><DensitySmallOutlinedIcon  /></div>
                <div className="secondNavDiv">All</div>
                <div className="secondNavDiv">Today's deals</div>
                <div className="secondNavDiv">Mobile phones</div>
                <div className="secondNavDiv">Electronics</div>
                <div className="secondNavDiv">Help</div>
                <div className="secondNavDiv">Prime</div>
                <div className="secondNavDiv">Appliances</div>
                <div className="secondNavDiv">Fashion</div>
                <div className="secondNavDiv">Home</div>
                <div className="secondNavDiv">Vedio Game</div>
                <div className="secondNavDiv">Toys&Games</div>
                <div className="secondNavDiv">Grocery</div>
                
           </div>
           <img 
           src="https://images-eu.ssl-images-amazon.com/images/G/42/Sunrise/Events/2022/PD22/GW/XCM_Manual_1443555_4810454_400x39_2X._CB632499316_.jpg" 
           alt=""
            className="imgPrime"  />
    </div>
  )
}

export default SecondNavbar