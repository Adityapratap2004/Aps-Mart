const mongoose=require('mongoose');

const orderRequest=mongoose.Schema({
    product:{
        type:mongoose.Types.ObjectId,
        ref:'Product',
        required:true
    },
    qty:{
        type:Number,
        require:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        require:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})


const OrderRequest=mongoose.model('OrderRequest',orderRequest);
module.exports=OrderRequest;
