const express = require("express");

const electioncontroller = require("../controller/electioncontoller");
const authorise = require("../middleware/auth");

const router = express.Router();

router.post(
  "/create",
  authorise.auth,
  authorise.admin,

  electioncontroller.create
);
router.get(
  "/getallelcetion",
  authorise.auth,
  electioncontroller.getallelcetion
);
router.post(
  "/elctcandidate/:id",
  authorise.auth,
  electioncontroller.elctcandidate
);
router.put(
  "/updateelection/:id",
  authorise.auth,
  authorise.admin,
  electioncontroller.updateelection
);

router.delete(
  "/deleteelection/:id",
  authorise.auth,
  authorise.admin,
  electioncontroller.deleteelection
);

router.get(
  "/getallelcetionbyid/:id",
  authorise.auth,
  electioncontroller.getallelcetionbyid
);

router.get(
  "/getelctioncandidate/:id",
  authorise.auth,
  electioncontroller.getelctioncandidate
);

module.exports = router;
