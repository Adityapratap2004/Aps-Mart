const mongoose=require('mongoose');

const cart=mongoose.Schema({
    product:{
        type:mongoose.Types.ObjectId,
        ref:'Product',
        required:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
    },
    qty:{
        type:Number,
        default:1,
    }
})

const Cart=mongoose.model("Cart",cart);
module.exports=Cart;