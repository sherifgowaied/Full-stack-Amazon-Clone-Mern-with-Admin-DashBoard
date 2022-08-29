import "./categories.css"
import {categories} from "../../data"
import { CategoryItem } from "../categortItem/CategoryItem"


export const Categories = () => {
  return (
    <div className="categoriesContainer">
        {categories.map((item)=>(
            <CategoryItem item={item} key={item.id} />
        ))}
       
    </div>
  )
}
