import { Link } from "react-router-dom"
import "./categoryItem.css"

export const CategoryItem = ({item}) => {
  return (
    <div className="categoryItemContainer">
        <Link to={`products/${item.cat}`}>
            <img src={item.img} alt="" className="categoryItemImg"  />
       
        <div className="categoryItemInfo">
            <span className="categoryItemTitle">{item.title}</span>
            <button className="categoryItemBtn">Shop Now</button>
        </div>
        </Link>
    </div>
  )
}
