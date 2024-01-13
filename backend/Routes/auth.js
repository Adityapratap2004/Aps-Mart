const User = require("../Models/User");
const express = require("express");
const Router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fetchUser = require("../Middleware/fetchUser");

const success = false;

// signup  no login required

Router.post(
  "/signup",
  [
    body("name", "Enter the valid name").isLength({ min: 1 }),
    body("email", "Enter the valid email").isEmail(),
    body("password", "Password connot be null").notEmpty(),
  ],
  async (req, res) => {
    try {
      console.log(req.body);
      //checking wether input is valid
      const error = validationResult(req);

      if (!error.isEmpty()) {
        return res.json({ success, error: error });
      }

      //checking wether user already exist or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.json({ success, error: "User already exist" });
      }
      const salt = 10;
      const securePassword = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      });

      const data = {
        user: {
          id: user._id,
        },
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET);

      return res.cookie("authToken", authToken,{maxAge:1000*60*60,httpOnly:false,sameSite: true}).json({ success: true, user });
    } catch (error) {
      console.log(error);
      return res.json({ success, Error: "Internal Server error" });
    }
  }
);

//login no singin required

Router.post(
  "/login",
  [
    body("email", "Enter the valid email").isEmail(),
    body("password", "password can not be null").notEmpty(),
  ],
  async (req, res) => {
    try {
      console.log(req.body);
      const error = validationResult(req.body);
      if (!error.isEmpty()) {
        console.log("Error", error);
        return res.json({ Error: error });
      }

      //checking wether emial exisit

      const user = await User.findOne({ email: req.body.email });
      console.log("user", user);

      if (!user) {
        return res.json({ error: "Enter the correct cridential" });
      }

      const checkpassword = bcrypt.compare(req.body.password, user.password);

      if (!checkpassword) {
        return res.json({ Error: "Enter the correct cridential" });
      }

      const data = {
        user: {
          id: user._id,
        },
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET);

      return res.cookie("authToken", authToken,{maxAge:1000*60*60,httpOnly:false,sameSite: true}).json({ success: true, user });
    } catch (error) {
      console.log(error);
      return res.json({ success, Error: "Internal Server error" });
    }
  }
);

//logout login required

Router.get("/logout", fetchUser, async (req, res) => {
  try {
    res.cookie("authToken", " ", { maxAge: 1 });
    res.json({ success: true, msg: "You have successfully logout" });
  } catch (error) {
    res.status(500).json({ success, error: "Internal server error" });
  }
});

module.exports = Router;
