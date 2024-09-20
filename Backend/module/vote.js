const mongoose = require("mongoose");
const VoterSchema = new mongoose.Schema(
  {
    voterId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: false,
    },
    electionId: {
      type: mongoose.Schema.ObjectId,
      ref: "Election",
      required: false,
    },
    candidateId: {
      type: mongoose.Schema.ObjectId,
      ref: "Candidate",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vote", VoterSchema);
