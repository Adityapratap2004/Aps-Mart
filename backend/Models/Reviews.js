const mongoose=require('mongoose');

const review=mongoose.Schema({
    user:{
       type:mongoose.Schema.ObjectId,
       ref:'User',
       required:true
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5,
    },
    review:{
        type:String,
        required:true
    },
    createdate:{
        type:Date,
        default:Date.now()
    }


})

const Review=mongoose.model('Review',review);
module.exports=Review