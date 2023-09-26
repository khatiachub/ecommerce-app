
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const cors = require("cors");
const bodyParser=require("express").json
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
// const stripeRoute = require("./routes/stripe");

dotenv.config();
const MONGODB_URI = process.env.MONGO_URL ||"mongodb+srv://chubinidzekhatia6:chubinidzekhatia@cluster0.jpfmufi.mongodb.net/shop?retryWrites=true&w=majority"
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });
app.use(bodyParser())
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
// app.use("/api/checkout", stripeRoute);




app.listen(process.env.PORT || 5001, () => {
  console.log("Backend server is running!");
});