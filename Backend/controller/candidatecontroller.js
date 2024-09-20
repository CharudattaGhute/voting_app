const mongoose = require("mongoose");
const candidatemodel = require("../module/candidate");

async function addcandidate(req, res) {
  console.log(req.body);
  console.log(req.file);

  const { candidatename, age, Party, education } = req.body;
  const Partyimage = req.file ? req.file.path : "";

  try {
    const existingcandidate = await candidatemodel.findOne({
      candidatename,
    });
    if (existingcandidate) {
      return res.status(400).json({ message: "Candidate Already Exists" });
    } else {
      const newcandidate = new candidatemodel({
        candidatename,
        age,
        Party,
        education,
        Partyimage,
      });
      await newcandidate.save();
      res.status(201).send({ message: "Candidate Added Successfully" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Assuming you're using Express and have a `candidatemodel` defined

// ********** getcandidateby id *************

async function getcandidatinfo(req, res) {
  const { id: candidateId } = req.params;
  try {
    const candidate = await candidatemodel.findById(candidateId);

    if (!candidate) {
      return res
        .status(404)
        .send({ error: "Candidate not found", success: false });
    }

    const newcandidate = {
      _id: candidate._id,
      candidatename: candidate.candidatename,
      age: candidate.age,
      Party: candidate.Party,
      education: candidate.education,
      Partyimage: candidate.Partyimage,
    };

    res.status(200).send({ candidate: newcandidate, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error", success: false });
  }
}

// ************ getallcandiadte ***********

async function getallcandidate(req, res) {
  try {
    const candidates = await candidatemodel.find();

    const formattedCandidates = candidates.map((candidate) => ({
      _id: candidate._id,
      candidatename: candidate.candidatename,
      age: candidate.age,
      Party: candidate.Party,
      education: candidate.education,
      Partyimage: candidate.Partyimage,
    }));

    res.status(200).send({ newcandidate: formattedCandidates, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error", success: false });
  }
}

// *********** updatecandidate *******

async function updatecandidate(req, res) {
  console.log(req.body);
  const { id: candidateId } = req.params;
  const { candidatename, age, Party, education, Partyimage } = req.body;
  try {
    const candidate = await candidatemodel.findById(candidateId);
    if (!candidate) {
      return res.status(404).send({ msg: "Candidate ID not found" });
    }

    candidate.candidatename = candidatename || candidate.candidatename;
    candidate.age = age || candidate.age;
    candidate.Party = Party || candidate.Party;
    candidate.education = education || candidate.education;
    candidate.Partyimage = Partyimage || candidate.Partyimage;

    await candidate.save();

    res
      .status(201)
      .send({ message: "candidate updated successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error", success: false });
  }
}

// ********** Delete candidate ********

async function deletecandidate(req, res) {
  console.log(req.body);
  const { id: candidateId } = req.params;
  try {
    const candidate = await candidatemodel.findByIdAndDelete(candidateId);
    if (!candidate) {
      return res
        .status(404)
        .send({ msg: "candidate id not found", success: false });
    }
    res
      .status(201)
      .send({ msg: "candidate Deleted Successfully", success: true });
  } catch (error) {
    res.status(500).send({ error: "Server Error", success: false });
  }
}

module.exports = {
  addcandidate,
  getallcandidate,
  updatecandidate,
  deletecandidate,
  getcandidatinfo,
};
