const express = require('express');
const Router = express.Router();
const Razorpay = require('Razorpay');
const fetchUser = require('../Middleware/fetchUser')
const Cart = require('../Models/Cart')
const crypto = require("crypto");
const User =require('../Models/User');
const OrderRequest = require('../Models/OrderRequest');

const success=false;

const RAZARPAY_KEY_ID=process.env.RAZARPAY_KEY_ID;
const RAZARPAY_KEY_SECRET=process.env.RAZARPAY_KEY_SECRET;

//sending the razar pay key id to front end
Router.get('/getkey', fetchUser, async (req, res) => {
    try {
        res.json({ success: true, RAZARPAY_KEY_ID })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success, error: "Internal server error" })
    }
})


//creating order

Router.post('/createcheckoutsession', fetchUser, async (req, res) => {      
    try {
        const instance = new Razorpay({
            key_id: RAZARPAY_KEY_ID,
            key_secret: RAZARPAY_KEY_SECRET,
        });

        //calculating the price

        const cart = await Cart.find({ user: req.user.id }).populate('product', 'price');
        console.log(cart);
        let price = 0;
        if (cart.length !== 0) {
            for (var i in cart) {    // here i is the single product
                console.log(cart[i].product);
                price += cart[i].qty * cart[i].product.price
                console.log(price);
            }
        }

        // if cart have not any product
        else{
            return res.json({ success, error: "No items in the cart" })
        }

        const options = {
            amount: price * 100,
            currency: "INR"
        };

        //creating razarpay instance
        instance.orders.create(options, function (err, order) {

            res.status(200).json({
                success: true,
                order,
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" })
    }

});

//payment verififcaiton

Router.post('/paymentverification', fetchUser, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
       
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        // generated_signature = hmac_sha256(order_id + "|" + razorpay_payment_id, secret);
        const generated_signature = crypto
            .createHmac("sha256", RAZARPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        const isAuthentic = generated_signature === razorpay_signature;

        if (isAuthentic) {
            //adding data to user database and deleting it from the cart

            const cart=await Cart.find({ user: req.user.id })
            for(var i in cart){
                const deletedCartItem=await Cart.findByIdAndDelete(cart[i]._id);
                console.log(deletedCartItem);
                const orderrequest=await OrderRequest.create({
                    product:deletedCartItem.product,
                    qty:deletedCartItem.qty,
                    user:req.user.id                    
                })
                const updateUser=await User.findByIdAndUpdate(req.user.id,{
                    $push:{
                        orders:deletedCartItem.product
                    }
                },{new:true});
                console.log(updateUser);
            }

            return res.json({ success: true, url: "http://localhost:3000" })
        } else {
            res.status(400).json({
                success: false,
            });
        }

    } catch (error) {
            console.log(error);
            return res.status(500).json({error:"Internal server error"});
    }


})


module.exports=Router;