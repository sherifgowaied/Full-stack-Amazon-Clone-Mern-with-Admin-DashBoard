import React from 'react'
import "./login.css"

export const Register = () => {
  return (
    <div className="window">
    <div className="LoginContainer">
        <img src="https://www.synointcdn.com/wp-content/uploads/2019/04/Amazon-Logo-PNG.png" className="amazonLogoL" alt=""  />
        <div className="loginWrapper">
            <h2 className="crAcc">Create account</h2>
            <div className='loginInputContainer'>
                <span>Your Username</span>
                <input placeholder="First name and Second name"  />
            </div>
            <div className='loginInputContainer'>
                <span>Your Email</span>
                <input placeholder="Email"  />
            </div>
            <div className='loginInputContainer'>
                <span>Password</span>
                <input placeholder="Password"  />
                <span className="reEnterPass">Passwords must be at least 6 characters.</span>
            </div>
            <div className='loginInputContainer'>
                <span>Confirm Password</span>
                <input placeholder="Confirm Password"  />
            </div>
            <div className='loginInputContainer'>
            <button className='LoginButton'>Register</button>
            </div>
            <div className='loginInputContainer'>
                <span className='loginDesc'>
                By creating an account, you agree to<span className="blueNbold">Amazon's 
                Conditions</span> of Use and <span className="blueNbold">Privacy Notice</span>.</span>    
            </div>
            <hr></hr>
            <div className='loginInputContainer'>
                <span className='loginDescs'>Already have an account?<span className="blueNbold"> Sign in</span></span>    
            </div>
        </div>
    </div>
    </div>
  )
}
