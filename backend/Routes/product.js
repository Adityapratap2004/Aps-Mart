const express = require("express");
const Router = express.Router();
const Product = require("../Models/Product");
const fetchUser = require("../Middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const singleUpload = require("../Middleware/multer");
const getDataUri = require("../Utils/dataUri");
const cloudinary = require("cloudinary");
const isAuthorised = require("../Middleware/isAuthorised");

const Category = require("../Models/Category");

const success = false;

//All products
Router.get("/", async (req, res) => {
  try {
    const page=parseInt(req.query.page)-1 || 0;
    const limit=parseInt(req.query.limit)||8;  //0 bhi kr sakta agr limit nahi deni to
    const search=req.query.search||"";

    
    const products = await Product.find(
      {
        "$or":[
          {name:{$regex:search,$options:"i"}},
          {description:{$regex:search,$options:"i"}},
        ]         
      }
    ).sort("rating").skip(page*limit).limit(limit);

    const total=await Product.find(
      {
        "$or":[
          {name:{$regex:search,$options:"i"}},
          {description:{$regex:search,$options:"i"}},
        ]         
      }
    )
    const productsCount=total.length;



    return res.json({ success: true, products,productsCount,limit,page:page+1});
  } catch (error) {
    console.log(error);
    return res.json({ success, error });
  }
});

//Create product

Router.post(
  "/addProduct",
  fetchUser,
  isAuthorised,
  singleUpload,
  [
    body("name", "Name can not be null").notEmpty(),
    body("price", "Price can not be null").notEmpty(),
    body("description", "Description can not be null").notEmpty(),
  ],
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.json({ success, error });
      }
      //checking wether product name is same or not
      const checkProduct = await Product.findOne({ name: req.body.name });
      if (checkProduct) {
        console.log(checkProduct);
        return res.json({ success, error: "Product already exist" });
      }

      const file = req.file;
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        img: {
          imgUrl: mycloud.secure_url,
          publicId: mycloud.public_id,
        },

        // img.imgUrl: mycloud.secure_url,
      });
      return res.json({ success: true, product });
    } catch (error) {
      return res.status(500).json({ success, error });
    }
  }
);

//specific product details  (details product) NO LOGIN REQUIRED

Router.get("/details/:id", async (req, res) => {
  try {
    const productdetails = await Product.findById(req.params.id);
    if (!productdetails) {
      return res.json({ success, error: "Product doesn't exist" });
    }
    return res.json({ success: true, productdetails });

  } catch (error) {
    return res.status(500).json({ success, error: "Internal server error" });
  }
})

//delete product

Router.delete(
  "/deleteProduct/:id",
  fetchUser,
  isAuthorised,
  async (req, res) => {
    try {
      //check product exist or not
      console.log("Product delete called");
      const checkProduct = await Product.findById(req.params.id);
      console.log(checkProduct);
      if (!checkProduct) {
        return res.json({ success, error: "Product doesn't exist" });
      }

      //deleting the img from cloudinary
      console.log(checkProduct.img.publicId);
      const imgdeleteResult = await cloudinary.uploader.destroy(
        checkProduct.img.publicId
      );

      //deleting the product

      const deletedProduct = await Product.findByIdAndDelete(req.params.id);

      return res.json({ success: true, deletedProduct });
    } catch (error) {
      return res.status(500).json({ success, error });
    }
  }
);

//releated products    access categories wise product  not including the product
Router.post("/releated", async (req, res) => {
  try {
   
    const products = await Product.find({ category: req.body.category, name: { $ne: req.body.name } }).limit(4)

    return res.json({ success: true, products });
  } catch (error) {
    return res.status(500).json({ success, error });
  }
});



//access categories wise product

Router.post("/category", async (req, res) => {
  try {
    // const checkCategory=await Category.findOne({name:req.body.category});
    // if(!checkCategory){
    //   return res.json({success,"error":"Category not exists"});
    // }
    console.log("req dbk", req.body.category);

    const products = await Product.find({ category: req.body.category })
    return res.json({ success: true, products });
  } catch (error) {
    return res.status(500).json({ success, error });
  }
});

//popular products  no login required

Router.get("/topproducts", async (req, res) => {
  try {
    console.log("yaha tk to chal gaya")
    const products = await Product.aggregate([
      {
        $setWindowFields: {
          partitionBy: "$category",
          sortBy: { rating: -1 },
          output: {
            rank: { $rank: {} }
          }
        }
      },
      { $match: { rank: { $lte: 5 } } }
    ])

    console.log(products);

    return res.json({ success: true, products });
  } catch (error) {
    return res.json({ success, error })
  }
})






module.exports = Router;





