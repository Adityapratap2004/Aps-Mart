const express = require('express');
const Router = express.Router();
const fetchUser = require('../Middleware/fetchUser')
const User = require('../Models/User');
const singleUpload = require('../Middleware/multer');
const getDataUri = require('../Utils/dataUri');
const cloudinary = require("cloudinary");

const success = false;
Router.get("/", fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('orders');
        if (!user) {
            return res.json({ success, error: "user doesn't exits" });
        }

        return res.json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success, error: "Internal server error" })
    }

})

//user details 
Router.patch("/", fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.json({ success, error: "user doesn't exits" });
        }

        let updatedUser = await User.findByIdAndUpdate(req.user.id, { name: req.body.name, address: req.body.address, phoneno: req.body.phoneno }, { new: true })
         updatedUser =await User.findById(req.user.id).populate('orders');
        return res.json({ success: true, updatedUser });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success, error})

    }
})

//updating profile Img

Router.patch("/profileImg", fetchUser, singleUpload, async (req, res) => {
    try {

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.json({ success, error: "user doesn't exits" });
        }
        if(user.profileImg.publicId){
            await cloudinary.uploader.destroy(user.profileImg.publicId);
        }
        const file = req.file;
        const fileUri = getDataUri(file);
        const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
        let updatedUser=await User.findByIdAndUpdate(req.user.id, { profileImg: { publicId: mycloud.public_id, imgUrl: mycloud.secure_url } }, { new: true })
        updatedUser=await User.findById(req.user.id).populate('orders');
        return res.json({ success: true, updatedUser });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success, error: "Internal server error" })
    }
})

module.exports = Router;