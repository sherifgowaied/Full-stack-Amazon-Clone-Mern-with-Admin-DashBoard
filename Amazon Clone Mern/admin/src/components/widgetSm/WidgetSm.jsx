import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { userRequest } from "../../requestMethods";

export default function WidgetSm() {
  const [users , setUsers]=useState([])

  useEffect(()=>{
    const getUser = async()=>{
      try {
        const res = await  userRequest('/users?new=true')
        
        setUsers(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  },[])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users && users.map((user)=>(
          <li className="widgetSmListItem" key={user._id}>
          <img
            src={user.img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg-Nc5MJcsdYveSsZGrrz0fq-7I_MEYppz1g&usqp=CAU"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
            <span className="widgetSmUserTitle">{user.email}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        ))}
        
    
      </ul>
    </div>
  );
}
