const mongoose = require("mongoose");

const category = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    img_url: { type: String, required: true },
    productId:{type:String,required:true},
  },
});

const Category = mongoose.model("Category", category);
module.exports = Category;
