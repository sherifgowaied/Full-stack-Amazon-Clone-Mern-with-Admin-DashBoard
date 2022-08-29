import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { userRequest } from "../requestMethods";
import "./success.css"

const Success = () => {
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
//   console.log(data)
//   console.log(cart)
//   console.log(currentUser)
//  console.log(location)
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch(err) {console.log(err)}
    };
    data && createOrder();
  }, [cart, data, currentUser]);
  console.log(orderId)
  return(
    <>
    <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      gap:"20px",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <img src="https://thumbs.dreamstime.com/b/amazon-155631949.jpg" alt="" className="successImg" />
    {orderId
      ? `Order has been created successfully. Your order number is ${orderId}`
      : `Successfull. Your order is being prepared...`}
      <Link to="/">
        <button className="goToHome">Go to Homepage</button>
      </Link>
  </div>
   
   </>
       
  )
}
export default Success;
