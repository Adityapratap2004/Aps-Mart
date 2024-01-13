const mongoose=require('mongoose');

const product= mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        require:true,
    },

    rating:{
        type:Number,
        default:0,
    },
    noOfRating:{
        type:Number,
        default:0,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
        
    },
    img:{
        publicId:{
            type:String,
            required:true,
        },
        imgUrl:{
            type:String,
            required:true,
        }       
        
    },
    

})

const Product=mongoose.model("Product",product);
module.exports=Product;

 