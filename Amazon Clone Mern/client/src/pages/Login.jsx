import "./login.css"
import {useState}from "react"
import {useDispatch,useSelector} from "react-redux";
import {login} from "../redux/apiCalls"
export const Login = () => {
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const dispatch = useDispatch()

    const {isFetching,error}=useSelector((state)=> state.user)
    const handleClick = (e)=>{
        e.preventDefault()
        
        login(dispatch,{username,password})
    }
  return (
    <div className="window">
    <div className="LoginContainer">
        <img src="https://www.synointcdn.com/wp-content/uploads/2019/04/Amazon-Logo-PNG.png" className="amazonLogoL" alt=""  />
        <div className="loginWrapper inhertRegister">
            <h2 className="crAcc">Sign-In</h2>
            
            <div className='loginInputContainer ' >
                <span>Your Username</span>
                <input placeholder="Username" onChange={(e)=>setUsername(e.target.value)}  />
            </div>
            <div className='loginInputContainer'>
                <span>Password</span>
                <input placeholder="Password" type="password"  onChange={(e)=>setPassword(e.target.value)} />
                <span className="reEnterPass">Passwords must be at least 6 characters.</span>
            </div>
            
            <div className='loginInputContainer'>
            <button className='LoginButton' disabled={isFetching} onClick={handleClick}>Login</button>
            </div>
            <div className='loginInputContainer'>
                <span className='loginDesc'>
                By creating an account, you agree to<span className="blueNbold">Amazon's 
                Conditions</span> of Use and <span className="blueNbold">Privacy Notice</span>.</span>    
            </div>
            <hr></hr>
            <div className='loginInputContainer'>
                {/* {error && <span style={{color:'red',textAlign:"center"}} >Something went wrong...</span>} */}
                <span className='loginDescs'>Don't have an account?<span className="blueNbold"> Sign Up</span></span>    
            </div>
        </div>
    </div>
    </div>
  )
}
