import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Product } from "./pages/Product";
import { ProductList } from "./pages/ProductList";
import { Register } from "./pages/Register.jsx";
import { Cart } from "./pages/Cart";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import  Success  from "./pages/Success";
import { Pay } from "./pages/Pay";
import {useSelector} from "react-redux";
require('dotenv').config()


const App = () => {
  const user = useSelector((state)=>state.user.currentUser)  ;
  //console.log(user)
  return(
    <Router>
    <Routes>
    <Route exact path="/login" element={user ? <Navigate to="/" />: <Login  />}/>
    <Route exact path="/register" element={user ? <Navigate to="/" />: <Register  />}/>
    <Route exact path="/" element={!user ? <Navigate to="/login" />:<Home  />}/>
    <Route  path="/products/:category" element={!user ? <Navigate to="/login" />: <ProductList  />}/>
    <Route  path="/product/:id" element={!user ? <Navigate to="/login" />:<Product  />}/>
    <Route  path="/cart" element={!user ? <Navigate to="/login" />:<Cart  />}/>   
    <Route  path="/pay" element={!user ? <Navigate to="/login" />:<Pay  />}/>
    <Route  path="/success" element={!user ? <Navigate to="/login" />:<Success />}/>
    
    </Routes> 
  </Router> 
  ) ;
};


export default App;