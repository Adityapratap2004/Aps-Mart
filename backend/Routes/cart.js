const express=require('express');
const Router=express.Router();
const fetchUser=require('../Middleware/fetchUser');
const Cart = require('../Models/Cart');
const Product = require('../Models/Product');

const success=false;

//fetching the cart login required
Router.get('/',fetchUser,async(req,res)=>{
    try {
        const cart=await Cart.find({user:req.user.id}).populate('product','_id name price img');
        return res.json({success:true,cart});
        
    } catch (error) {
        return res.json({success,'error':error});        
    }

})


//adding data to cart

Router.post('/addtocart/:id',fetchUser,async(req,res)=>{
    try {
        //checking wether product exists or not
        
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.json({success,'error':"Product doesn't exists" })
        }

        //checking wether product exists in cart or not

        const cartItem=await Cart.findOne({user:req.user.id,product:req.params.id});
        if(cartItem){
            return res.json({success,'error':"Product already exists in the cart"});
        }

        const cart=await Cart.create({
            product:req.params.id,
            user:req.user.id,
            qty:req.body.qty
        }).populate('product','_id name price img')

        return res.json({success:true,cart});
        
    } catch (error) {
        return res.json({success,'error':error});                
    }
})


//deleting cart item

Router.delete('/deletecart/:id',fetchUser,async(req,res)=>{
    try {
        //check wether item exists in cart
        const cartItem=await Cart.findById(req.params.id);
        if(!cartItem){
            return res.json({success,'error':"Product doesn't exist in the cart"})
        }

        const deletedCartItem=await Cart.findByIdAndDelete(req.params.id);
        return res.json({success:true,deletedCartItem});
        
    } catch (error) {
        return res.json({success,'error':error});             
    }

})

//updating cart item

Router.patch('/updatecart/:id',fetchUser,async(req,res)=>{
    try {

         //check wether item exists in cart
         const cartItem=await Cart.findById(req.params.id);
         if(!cartItem){
             return res.json({success,'error':"Product doesn't exist in the cart"})
         }
 
         const updatedCartItem=await Cart.findByIdAndUpdate(req.params.id,{qty:req.body.qty});
         return res.json({success:true,updatedCartItem});
        
    } catch (error) {
        return res.json({success,'error':error});          
    }
})


module.exports=Router;