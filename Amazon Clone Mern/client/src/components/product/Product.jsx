import './product.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';


export const Product = ({item}) => {
  
  return (
    <div className="product">
        <img alt="" src={item.img} className="productImg" />
        <div className="circle" ></div>
        <div className="productInfo">
            <div className='pIcon'>
            <Link to={`/product/${item._id}`}>
              <SearchOutlinedIcon  />
            </Link>
            </div>
            <div className='pIcon'>
              <Link to={`/product/${item._id}`}>
            <FavoriteBorderOutlinedIcon />
            </Link>
            </div>
            <div className='pIcon'>
            <Link to={`/product/${item._id}`}>
            <ShoppingCartOutlinedIcon />
            </Link>
            </div>
            
           
        </div>
    </div>
  )
}
