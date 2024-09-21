const mongoose = require("mongoose");
const imagemodel = require("../module/image");

async function addimage(req, res) {
  try {
    const userid = req.user._id;

    const imagefile = req.file ? `/uploads/${req.file.filename}` : null;

    if (!imagefile) {
      return res.status(400).send({ message: "No image file uploaded" });
    }

    const newImage = await imagemodel.create({
      userid,
      image: imagefile,
    });

    res.status(201).send({
      message: "Image added successfully",
      image: newImage,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function getallimage(req, res) {
  try {
    const image = await imagemodel.find();
    res.status(201).send({ image: image });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  addimage,
  getallimage,
};
