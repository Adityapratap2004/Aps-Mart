const express = require('express');
const Product = require('../Models/Product');
const fetchUser = require('../Middleware/fetchUser');
const Router = express.Router();
const Reviews = require('../Models/Reviews')
const { body, validationResult } = require('express-validator')


const success = false
//Specific product reviews

Router.get('/:id', async (req, res) => {  //yaha product ki id hai
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(400).json({ error: "Product doesn't exist" })  //plan hi nahi exist karta tum review kaha se laaoge
        }

        const reviews = await Reviews.find({ product: req.params.id }).populate("user", "_id name img");
        console.log(reviews);



        return res.json({ success: true, reviews });

    } catch (error) {
        return res.status(500).json({ success, error: "Internal server error" });
    }
})

//give Product review by user login required

Router.post('/givereview/:id', [
    body('review', 'Review can not be null').notEmpty(),
    body('rating', 'Rating can not be null').notEmpty().isInt({ min: 1, max: 5 })
], fetchUser, async (req, res) => {  //:id id for product id
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ success, error: error.array() });
    }
    try {
        //check wether product exists
        const product = await Product.findById(req.params.id);
        console.log(product);
        if (!product) {
            return res.status(400).json({ success, error: "Product doesn't exist" });
        }
        //check wether you have reviewed it or not if you have reviwed it you can not review it

        const userReview = await Reviews.findOne({ user: req.user.id, product: req.params.id });
        console.log("user Review:", userReview);
        if (userReview) {
            return res.json({ success, error: "You have already reviewed" });
        }
        //now add the review
        let review = await Reviews.create({ ...req.body, ...{ user: req.user.id }, ...{ product: req.params.id } })
        review = await Reviews.findById(review._id).populate('user', '_id name img')
        console.log("review", review);

        //hume plan ke ander average rating ko bhi change karna padega
        const newRating = ((product.rating * product.noOfRating) + Number(req.body.rating)) / (product.noOfRating + 1);
        console.log(newRating);

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { noOfRating: product.noOfRating + 1, rating: newRating }, { new: true });
        console.log(updatedProduct)
        return res.json({ success: true, review, updatedProduct })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success, error: "Internal server error" });
    }

});


module.exports = Router