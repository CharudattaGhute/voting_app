const mongoose = require("mongoose");
const ElectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    candidates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
        required: true,
      },
    ],
    start_date: {
      type: String,
      default: Date.now,
    },
    end_date: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Election", ElectionSchema);
