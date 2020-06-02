const {
    ValidationRegister,
    ValidationLogin,
    ValidationUpdate,
    ValidationPassword,
  } = require("../controller/validation");

const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv");


/*------------------------------------------ Getting All users -----------------------------------------------*/

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});



/*-------------------------------------------- Register a new user -------------------------------------------*/



router.post("/registre_user", async (req, res) => {
  // Validate Data before create a new user
  const { error } = ValidationRegister(req.body);
  if (error) res.status(400).send(error.details[0].message);
  else {
    //check if email is already Exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) res.status(400).send("email is already exist");
    else {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      try {
        const savedUser = await user.save();
        const token = jwt.sign({ _id: savedUser._id }, process.env.SECRET_KEY);
        res.header("auth-token", token).status(200).send({ user, token });
      } catch (err) {
        res.status(400).send({ msg: err });
      }
    }
  }
});

/*--------------------------------------------- Login Validation ---------------------------------------------*/

router.post("/login", async (req, res) => {
  // Validation
  const { error } = ValidationLogin(req.body);
  if (error) res.status(400).send("invalid email or password");
  else {
    // Check if email is found
    const user = await User.findOne({ email: req.body.email });
    if (!user) res.status(400).send("Invalid email or password");
    else {
      // Check password
      const passwordVerify = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordVerify) res.status(400).send("Invalid email or password");
      // Create and assgin a token
      try {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
        res.header("auth-token", token).status(200).send({ user, token });
      } catch (err) {
        res.status(400).send({ msg: err });
      }
    }
  }
});


/* ------------------------------------------- Update a specific user ----------------------------------------*/

router.patch("/update_user/:id", async (req, res) => {
  // validation
  const { error } = ValidationUpdate(req.body);
  if (error) res.status(400).send(error.details[0].message);
  // if email changed : validate if email changed is exist or not
  else {
    const user = await User.findOne({ _id: req.params.id });
    if (user.email !== req.body.email) {
      const emailExist = await User.findOne({ email: req.body.email });
      if (emailExist) res.status(400).send("email is already exist");
    }
    // update user
    try {
        await User.updateOne(
        { _id: req.params.id },
        { $set: { name: req.body.name, email: req.body.email } }
      );
      const user = await User.findOne({ _id: req.params.id });
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json("Error : ", err);
    }
  }
});

/* ------------------------------------------Delete a specific User------------------------------------------*/

router.delete("/delete_user/:id", async (req, res) => {
  try {
    const userDeleted = await User.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send("user deleted successfully");
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});


/*--------------------------------------------- Update Password ----------------------------------------------*/


router.patch("/update_password/:id", async (req, res) => {
  // Check password
  const user = await User.findOne({ _id: req.params.id });
  const passwordVerify = await bcrypt.compare(req.body.password, user.password);
  if (!passwordVerify) res.status(400).send("Invalid password");
  else {
     // Validate Password 
     const { error } = ValidationPassword(req.body);
     if (error) res.status(400).send(error.details[0].message);
     else{
    try {
       
      // hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.repeatPassword, salt);

      await User.updateOne(
        { _id: req.params.id },
        { $set: { password: hashedPassword } }
      );
      res.status(200).json("password updated...");

    } catch (err) {
      res.status(400).send({ msg: err });
    }
  }
  }
});

module.exports = router;
