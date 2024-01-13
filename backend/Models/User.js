const mongoose=require('mongoose');

const user=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
    },
    phoneno:{
        type:Number,
        length:10,
    },
    profileImg:{
        publicId:{
            type:String,
            
        },
        imgUrl:{
            type:String,
            
        }   
        
    },
    role:{
        type:String,
        default:"user"
    },
    orders:{
        type:[mongoose.Schema.ObjectId],
        ref:'Product',
        default:undefined
    }
})

const User=mongoose.model("User",user);
module.exports=User;