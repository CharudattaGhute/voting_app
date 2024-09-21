const express = require("express");
const authorise = require("../middleware/auth");
const router = express.Router();
const imagecontroller = require("../controller/imagecontroller");
const upload = require("../middleware/multer");

router.post("/addimage", authorise.auth, upload, imagecontroller.addimage);
router.get("/getallimage", authorise.auth, imagecontroller.getallimage);

module.exports = router;
