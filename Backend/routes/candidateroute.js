const express = require("express");

const candidatecontroller = require("../controller/candidatecontroller");
const authorise = require("../middleware/auth");

const router = express.Router();

router.post(
  "/addcandidate",
  authorise.auth,
  authorise.admin,
  candidatecontroller.addcandidate
);
router.get(
  "/getallcandidate",
  authorise.auth,
  candidatecontroller.getallcandidate
);

router.put(
  "/updatecandidate/:id",
  authorise.auth,
  authorise.admin,
  candidatecontroller.updatecandidate
);
router.delete(
  "/deletecandidate/:id",
  authorise.auth,
  authorise.admin,
  candidatecontroller.deletecandidate
);

router.get(
  "/getcandidatinfo/:id",
  authorise.auth,
  candidatecontroller.getcandidatinfo
);

module.exports = router;
