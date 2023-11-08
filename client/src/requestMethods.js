import axios from "axios";



const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

const BASE_URL = "http://ecommerce-ap41m4css-khatias-projects-fe7650f5.vercel.app/api";
console.log(TOKEN);

export const publicRequest = axios.create({
    baseURL: BASE_URL,
    headers:{
      "Content-Type": 'application/json',
      Accept:"application/json",
      "Access-Control-Allow-Origin":"*"
    }
  });
  
  export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` ,
    "Content-Type": 'application/json',
    Accept:"application/json",
  },
  });

  

