import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {BrowserRouter,Route,Navigate,Routes,HashRouter} from "react-router-dom";
import Success from './pages/Success'
import { useSelector } from "react-redux";
import Userprofile from "./components/Userprofile";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./Emailverify/VerifyEmail";
import Root from "./Root";
import Wishlist from "./pages/Wishlist";

function App() {
  const loginUser = useSelector((state) => state.user.currentUser);
  return(
    <HashRouter>
    <Routes>
     <Route path="/" element={<Root/>}>
        <Route index={true} element={<Home/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/products/:category" element={<ProductList/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={loginUser?<Navigate to='/'/>:<Login/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/userprofile/:id" element={<Userprofile/>}/>
        <Route path="/updatepassword/:id" element={<UpdatePassword/>}/>
        <Route path="/users/:id/verify/:token" element={<VerifyEmail/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
      </Route>
      </Routes>
    </HashRouter>
  )
}

export default App;
