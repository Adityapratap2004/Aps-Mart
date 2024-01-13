const express=require('express');
const fetchUser = require('../Middleware/fetchUser');
const Router=express.Router();
const isAuthorised=require('../Middleware/isAuthorised');
const OrderRequest = require('../Models/OrderRequest');

const success=false
Router.get("/",fetchUser,isAuthorised,async(req,res)=>{
    try {
        const ordersList=await OrderRequest.find().populate('product').populate('user');
        return res.json({success:true,ordersList});
        
    } catch (error) {
        return res.status(500).json({success,error});        
    }
})


Router.delete("/:id",fetchUser,isAuthorised,async(req,res)=>{
    try {
        //check wether order exists or not
        const order=await OrderRequest.findById(req.params.id);
        if(!order){
            return res.json({success,error:"Order doesn't exists"})
        }
        const deleteOrder=await OrderRequest.findByIdAndDelete(req.params.id);
        return res.json({success:true,order});    
        
    } catch (error) {
        return res.status(500).json({success,error});        
    }
})

module.exports=Router