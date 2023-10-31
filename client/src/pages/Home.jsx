import React from "react";
// import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { Outlet } from "react-router-dom";


const Home = () => {
  return (
    <div>
      <Slider/>
      <Categories/>
      <Products/>
      <Newsletter/>
    </div>
  );
};

export default Home;