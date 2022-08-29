import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { useState ,useEffect } from 'react';
import axios from"axios";
import { useNavigate } from "react-router"

export const Pay = () => {
  const KEY = "pk_test_51LMv0uDEV0xjcby7qkvxZexrsPY9pKJcdcPtZdB6EfmTYqEAIeS1Fl7xHSLyV9kcH5Iyjf2uxFcd3guA4SCAn4WL00aOlVj3KX";
  const TEST_KEY="pk_test_51LMv0uDEV0xjcby7qkvxZexrsPY9pKJcdcPtZdB6EfmTYqEAIeS1Fl7xHSLyV9kcH5Iyjf2uxFcd3guA4SCAn4WL00aOlVj3KX"
  const [stripeToken,setStripeToken] = useState(null)
  const navigate = useNavigate()

  const onToken = (token)=>{
    
    setStripeToken(token)
  }
  useEffect(()=>{
    const makeRequest = async()=>{
      try {
        const res = await axios.post("http://localhost:5000/api/checkout/payment",{
        tokenId: stripeToken.id,
        amount: 2000  
        })
        console.log(res.data)
        navigate("/success")
      } catch (error) {
        console.log(error);
      }
    }

    stripeToken &&  makeRequest();

  },[stripeToken,navigate ])
  
  

  return (
    <div style={{
      height:"100vh",
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
    }}>
      {stripeToken ? (<span>Processing... Please Wait !</span>) :(

      
      <StripeCheckout
      name="Sherif Gowaied Shop"
      description="Your Total us $20"
      image="http://res.cloudinary.com/dblcyya0x/image/upload/v1656223912/upload/c6seaoymm7gqsntpqtps.jpg"
      amount={2000}
      stripeKey={KEY}
      token={onToken}
      billingAddress
      shippingAddress
      >

      <button style={{
        border:"none",
        backgroundColor:"black",
        width:"120px",
        color:"white",
        borderRadius:"5px",
        fontWeight:"600",
        pointer:"cursor"
      }} >Pay now</button>
        </StripeCheckout>
        )}
    </div>
  )
}
