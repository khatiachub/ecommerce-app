import axios from "axios";



const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

const BASE_URL = "http://localhost:50010/api/";
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

  // axios.interceptors.response.use(resp=>resp, async error=>{
  //   if(error.response.status===401){
  //     const response=await axios.post('refresh',{},{withCredentials:true})
  //     if(response.status===200){
  //       axios.defaults.headers.common["Authorization"]=`Bearer ${response.data.accessToken['token']}`
  //       return axios((error.config))
  //     }
  //   }
  //   return error
  // })

