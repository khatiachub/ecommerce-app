import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {BrowserRouter as Router,Route,Switch,Navigate} from "react-router-dom";
import Success from "./pages/Success";

function App() {
  const user=true
  return (
      <Router>
        <Switch>
        <Route path="/success" element={<Success/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/products/:category" element={<ProductList/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/register" element={user?<Navigate to='/'/>:<Register/>}/>
        <Route path="/login" element={user?<Navigate to='/'/>:<Login/>}/>
        <Route path="/cart" element={<Cart/>}/>
        </Switch>
      </Router>
  );
}

export default App;
