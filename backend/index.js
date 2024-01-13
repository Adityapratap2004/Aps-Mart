const express=require('express');
const connectToMongo=require('./db');
const cookie=require('cookie-parser');
const cors=require('cors');
const cloudinary=require('cloudinary');
require('dotenv').config()


const PORT=process.env.PORT;
const app=express();
connectToMongo();

cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME ,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
})

app.use(cookie());
app.use(express.json());
app.use(cors({credentials: true, origin:['http://localhost:3000','http://192.168.3.87:3000']}));
app.use("/product",require('./Routes/product'))
app.use("/auth",require("./Routes/auth"))
app.use("/product",require("./Routes/product"))
app.use("/category",require('./Routes/category'))
app.use("/cart",require('./Routes/cart'))
app.use("/reviews",require('./Routes/reviews'))
app.use("/user",require('./Routes/user'))
app.use("/payment",require('./Routes/payment'))
app.use("/orders",require('./Routes/orders'))

app.listen(PORT,()=>{
    console.log("App is running on port no:",PORT);
})