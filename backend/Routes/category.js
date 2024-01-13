const express=require('express');
const isAuthorised = require('../Middleware/isAuthorised');
const fetchUser = require('../Middleware/fetchUser');
const Category = require('../Models/Category');
const getDataUri = require('../Utils/dataUri');
const cloudinary=require('cloudinary');
const singleUpload = require('../Middleware/multer');
const Router=express.Router();

const success=false;

//adding category
Router.post("/addcategory",fetchUser,isAuthorised,singleUpload,async(req,res)=>{
    try {
        //check wether category exist or not
        // const cat=req.body.name.toLowerCase();
        // console.log(cat);
        console.log("hello")
        const checkCategory=await Category.findOne({name:req.body.name});
        if(checkCategory){
            return res.json({success,error:"Category already exists"})
        }

        const file=req.file;

        //getting img uri
        const fileUri=getDataUri(file);
        const mycloud=await cloudinary.v2.uploader.upload(fileUri.content);

        //adding data
        const category=await Category.create({
            name:req.body.name,
            img:{
                img_url:mycloud.secure_url,
                productId:mycloud.public_id
            }
        })

        return res.json({success:true,category});
        
    } catch (error) {
        return res.status(500).json({success,error})
        
    }
})


//getting category

Router.get('/getcategory',async(req,res)=>{
    try {

        const category=await Category.find();
        return res.json({success:true,category});
        
    } catch (error) {
        return res.status(500).json({success,error});        
    }
})

module.exports=Router;