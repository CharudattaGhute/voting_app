const mongoose = require("mongoose");
const usermodel = require("../module/user");
const jwt = require("jsonwebtoken");

// ******* Register ****************
async function register(req, res) {
  console.log(req.body);
  const {
    name,
    dateOfBirth,
    fatherMotherName,
    email,
    mobileNo,
    password,
    reenterPassword,
    Aadhar_Number,
    role,
    age,
    address,
    eligible,
    verified,
  } = req.body;

  try {
    const user = await usermodel.findOne({ email });
    if (!user) {
      const image = req.file ? req.file.filename : null;
      const newUser = new usermodel({
        name,
        dateOfBirth,
        fatherMotherName,
        email,
        mobileNo,
        password,
        reenterPassword,
        Aadhar_Number,
        role,
        image,
        age,
        address,
        eligible,
        verified,
      });

      await newUser.save();

      res
        .status(201)
        .send({ message: "User registered successfully", success: true });
    } else {
      console.log(error);
      res.status(400).send({ error: "User already exists", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message, success: false });
  }
}

// ************* Login **************

async function login(req, res) {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });
    if (!user || !(await user.comparepassword(password))) {
      return res.status(400).send({ error: "Invalid Email or Password" });
    }
    console.log("User Role at Login:", user.role);
    const token = jwt.sign({ _id: user._id, role: user.role }, "key", {
      expiresIn: "24h",
    });
    res.status(200).send({ user: user, access: token, success: true });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
}

// ************ user info ***************

async function userinfo(req, res) {
  console.log("****", req.user);
  const id = req.user._id;
  try {
    const user = await usermodel.findById({ _id: id });
    console.log(user);
    if (!user) {
      res.status(404).send({ msg: "User does not found", success: false });
    } else {
      res.status(201).send({ user: user, success: true });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  register,
  login,
  userinfo,
};
