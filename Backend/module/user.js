const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    dateOfBirth: {
      type: String,
    },
    fatherMotherName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNo: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    reenterPassword: {
      type: String,
      require: false,
    },
    Aadhar_Number: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    age: {
      type: Number,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    eligible: {
      type: Boolean,
      required: false,
    },
    verified: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
userSchema.methods.comparepassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
