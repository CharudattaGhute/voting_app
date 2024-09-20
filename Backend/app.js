const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userrouter = require("./routes/userroute");
const electionrouter = require("./routes/electionroute");
const candidaterouter = require("./routes/candidateroute");
const voterrouter = require("./routes/voterouter");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/voting");

const database = mongoose.connection;
database.on("error", (error) => {
  console.log("Error", error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
app.use("/api/user", userrouter);
app.use("/api/elections", electionrouter);
app.use("/api/candidate", candidaterouter);
app.use("/api/voter", voterrouter);

app.use("/uploads", express.static("uploads"));

app.listen(5012, () => {
  console.log("http://localhost:5012");
});
