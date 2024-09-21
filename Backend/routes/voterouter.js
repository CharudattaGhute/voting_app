const express = require("express");

const votercontroller = require("../controller/votecontroller");
const authorise = require("../middleware/auth");

const router = express.Router();

router.post("/addvote", authorise.auth, votercontroller.addvote);
router.get("/hasvoted/:electionId", authorise.auth, votercontroller.hasvoted);

router.get(
  "/getVotesPerElection",
  authorise.auth,
  votercontroller.getVotesPerElection
);

module.exports = router;
