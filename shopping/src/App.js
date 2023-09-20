import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Success from "../payment/success";


function App() {
  return (
    <>
    <Navbar/>
    <Success/>
    </>
  );
}

export default App;
