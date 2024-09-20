const mongoose = require("mongoose");
const CandidateSchema = new mongoose.Schema(
  {
    candidatename: {
      type: String,
      required: false,
    },
    age: {
      type: String,
      required: false,
    },
    Party: {
      type: String,
      required: false,
    },

    education: {
      type: String,
      required: false,
    },
    Partyimage: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate", CandidateSchema);
