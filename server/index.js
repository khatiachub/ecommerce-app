
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const cors = require("cors");
const bodyParser = require('body-parser');
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripe=require("stripe")("sk_test_51Ns2YUF4BbozQhllNVAvgMjxWXCMGUPYsYeJ7w0HG6t9iTkyue48mHg7ezOoptPvupFlouF7f5jdQVbsZ5R4RUQG00Vx89CC1J")
dotenv.config();
// const bodyParser=require("express").json
// app.use(bodyParser())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));


const MONGODB_URI = process.env.MONGO_URL ||"mongodb+srv://chubinidzekhatia6:chubinidzekhatia@cluster0.jpfmufi.mongodb.net/shop?retryWrites=true&w=majority"
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).send("get request")
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use(express.static('public'));


app.get('/favicon.ico', (req, res) => {
  res.send("get favicon")
});




app.post("/api/payment",async(req,res)=>{
  const {cart}=req.body
  const lineItems=cart?.products&&cart?.products.map((product)=>({
    price_data:{
      currency:"USD",
      product_data:{
        name:product.title
      },
      unit_amount:product.price*100
    },
    quantity:product.quantity
  }))
  const session=await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:lineItems,
    mode:"payment",
    success_url:"https://ecommerce-app-8ymq-client.vercel.app/#/success",
    cancel_url:"https://ecommerce-app-8ymq-client.vercel.app/#/cancel"
  })
  res.json({id:session.id})
})

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});