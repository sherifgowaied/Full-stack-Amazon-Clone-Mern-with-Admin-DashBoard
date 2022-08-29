import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useMemo } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { useState } from "react";
import {getProducts} from "../../redux/apiCalls"
import {useDispatch} from "react-redux"

export default function Home() {
  const dispatch = useDispatch()
  const [userStats,setUserStats] =useState([])
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(()=>{
    const getStats = async()=>{
      try {
        const res = await userRequest.get('/users/stats')
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch (error) {
        console.log(error)
      }
    }
    getStats()
  },[MONTHS])

  //test
  
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
