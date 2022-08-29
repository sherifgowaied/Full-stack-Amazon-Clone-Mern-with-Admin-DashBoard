import { Footer } from "../components/footer/Footer"
import { Navbar } from "../components/navbar/Navbar"
import { NewLetter } from "../components/newLetter/NewLetter"
import "./cart.css"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useDispatch, useSelector} from "react-redux"
import StripeChekout from "react-stripe-checkout"
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import {  Link, useNavigate } from "react-router-dom";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { removeProduct } from "../redux/cartRedux";

export const Cart = () => {
    // const [products,setProducts]=useState([])
    const cart = useSelector(state=>state.cart)
    const [stripeToken,setStripeToken]=useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //const[stripeResponse,setStripeResponse]=useState(null)
    //console.log(cart)
    const KEY = "pk_test_51LMv0uDEV0xjcby7qkvxZexrsPY9pKJcdcPtZdB6EfmTYqEAIeS1Fl7xHSLyV9kcH5Iyjf2uxFcd3guA4SCAn4WL00aOlVj3KX"
    console.log(cart)
    const onToken = (token)=>{
        setStripeToken(token)
    }

    useEffect(()=>{
        const makeRequest= async()=>{
            try {
                const res =await userRequest.post("/checkout/payment",{
                    tokenId:stripeToken.id,
                    amount:cart.total *100
                })
                //console.log(res.data)
                navigate('/success',{state:{stripeData:res.data,cart:cart}})
            } catch (error) {
                console.log(error)
            }
        }
        stripeToken &&  makeRequest()
    },[stripeToken,cart.total,navigate,cart])

    // console.log(stripeToken)
    // console.log(KEY)
    const handleRemoveFromCart = (product)=>{
        dispatch(
            removeProduct({product:product}
             ))
    }
    
  return (
    <div className="cartCart" >
    <Navbar />
    <div className="wrapperCart">
        <div className="secondWrapperCart">
            <div className="topCart">
                <div className="cartTitle">Your cart</div>
                <div className="secondTopCart">
                    <Link to="/">
                    <button className="cotinueShop">Continue Shopping</button>
                    </Link>
                    <div className="middleSecondTopcart">
                        <span>Your Shopping Cart (2)</span>
                        <span>Your WishList (0)</span>
                    </div>
                    <button className="Checkout">Checkout</button>
                </div>
            </div>
            <div className='bottomCart'>
                <div className="CartAllProductsWrapper">
               
                    {cart && cart.products?.map((product,i)=>(
                        <div className="bottomImgNdetails" key={product._id+i}>
                        <div className="bottomImgContainer">
                            <img
                             src={product.img}
                             alt="" className="bottomImg" />
                        </div>
                        <div className="bottomDetailsContainer">
                            <div className="detailsleft">
                                <span><b>Product: </b>{product.title}</span>
                                <span><b>ID:  </b>{product._id}</span>
                                <div className="bcColor" style={{backgroundColor:`${product.color}`}}></div>
                                <span><b>Size:  </b>{product.size}</span>
                            </div>
                            <div className="detailsRight">
                                <div className="bcPlus">
                                    <AddIcon  />
                                        <span> {product.quaninty}</span> 
                                    <RemoveIcon />
                                </div>
                                <div className="removeFromCart" onClick={()=>handleRemoveFromCart(product)}>
                                <DeleteOutlinedIcon  />
                                </div>
                                <div className="bcAmount">
                                    $<span>{product.price * product.quaninty}</span>
                                </div>
                            </div>
                        </div>
                        </div>
                    )) }

                </div>
                
                    <div className="summary">
                        <div className="summaryWrapper">
                            <h1>ORDER SUMMARY</h1>
                            <div className="summaryElements"><span>Subtotal</span><span>$ {cart.total}</span></div>
                            <div className="summaryElements"><span>Estimated Shipping</span><span>$ 23.90</span></div>
                            <div className="summaryElements"><span>Shipping Discount</span><span>$ -35.90</span></div>
                            <div className="summaryElements"><span><b>Total</b></span><span><b>$  {cart.total}</b></span></div>
                            <StripeChekout 
                                name="Sherif Amazon"
                                image="http://res.cloudinary.com/dblcyya0x/image/upload/v1656223912/upload/c6seaoymm7gqsntpqtps.jpg"
                                billingAddress
                                shippingAddress
                                description={`Your Total is $ ${cart.total}`}
                                amount={cart.total*100}
                                token={onToken}
                                stripeKey={KEY}>
                                    <button className="summaryBtn" >Checkout now</button>
                                </StripeChekout>
                            
                        </div>
                    </div>
            </div>
        </div>
    </div>
    <NewLetter  />
    <Footer  />
    </div>
  )
}
