const mongoose = require("mongoose");
const Election = require("../module/election");
const candidate = require("../module/candidate");
const Vote = require("../module/vote");

// ********** Addelection ***********
async function create(req, res) {
  console.log(req.body);

  const { title, description, candidates, start_date, end_date } = req.body;
  try {
    const existingelction = await Election.findOne({ title });
    if (existingelction) {
      return res.status(400).json({ message: "Election Already Exists" });
    } else {
      const newelection = new Election({
        title,
        description,
        candidates,
        start_date,
        end_date,
      });
      await newelection.save();
      res.status(201).send({ message: "Election Added Sucessfully" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// ***************** get alll election **********
async function getallelcetion(req, res) {
  try {
    const election = await Election.find();

    const newelection = election.map((election) => ({
      _id: election._id,
      title: election.title,
      description: election.description,
      candidates: election.candidates,
      start_date: election.start_date,
      end_date: election.end_date,
    }));

    res.status(200).send({ newelection, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error", success: false });
  }
}

// *************** getcandidates ***********
const elctcandidate = async (req, res) => {
  try {
    const { id: electionId } = req.params;
    const { candidatename } = req.body;

    const election = await Election.findById(electionId);
    if (!election) {
      return res
        .status(404)
        .send({ message: "Election not found", success: false });
    }

    election.candidates.push({ candidatename: candidatename });

    await election.save();

    res.status(201).send({
      message: "Candidate added successfully",
      election,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// *********** Update elction *************
async function updateelection(req, res) {
  console.log(req.body);
  const { id: electionId } = req.params;
  const { title, description, candidates, start_date, end_date } = req.body;
  try {
    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(404).send({ msg: "Election ID not found" });
    }

    election.title = title || election.title;
    election.description = description || election.description;
    election.candidates = candidates || election.candidates;
    election.start_date = start_date || election.start_date;
    election.end_date = end_date || election.end_date;

    await election.save();

    res
      .status(200)
      .send({ message: "Election updated successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error", success: false });
  }
}

// ******** Delete election **********

async function deleteelection(req, res) {
  console.log(req.body);
  const { id: electionId } = req.params;
  try {
    const elction = await Election.findByIdAndDelete(electionId);
    if (!elction) {
      return res
        .status(404)
        .send({ msg: "Election id not found", success: false });
    }
    res
      .status(200)
      .send({ msg: "Election Deleted Successfully", success: true });
  } catch (error) {
    res.status(500).send({ error: "Server Error", success: false });
  }
}

// ************ electionbyid ***********
async function getallelcetionbyid(req, res) {
  console.log(req.body);
  const { id: electionId } = req.params;

  try {
    const election = await Election.findById(electionId);

    if (!election) {
      return res
        .status(404)
        .send({ error: "Election not found", success: false });
    }

    // Check if candidates exist in the election object
    const newelection = {
      _id: election._id,
      title: election.title,
      description: election.description,
      candidates: election.candidates || [], // Make sure candidates are included
      start_date: election.start_date,
      end_date: election.end_date,
    };

    res.status(200).send({ election: newelection, success: true });
  } catch (error) {
    console.error("Error in fetching election by ID:", error);
    res.status(500).send({ error: "Server error", success: false });
  }
}

// ********* getcandiadtedbyelection************

// async function getelctioncandidate(req, res) {
//   const { id: electionId } = req.params;

//   // Validate ObjectId

//   try {
//     const election = await Election.findById(electionId);

//     // Check if the election was found
//     if (!election) {
//       return res
//         .status(404)
//         .send({ success: false, message: "Election not found" });
//     }

//     const candidate = election.candidates;
//     return res.send({ success: true, candidate });
//   } catch (error) {
//     console.error("Error fetching candidates:", error);
//     return res.status(500).send({ success: false, message: "Server error" });
//   }
// }
async function getelctioncandidate(req, res) {
  const { id: electionId } = req.params;

  try {
    const election = await Election.findById(electionId).populate("candidates");

    if (!election) {
      return res
        .status(404)
        .send({ message: "Election not found", success: false });
    }

    const candidates = election.candidates;

    return res.status(200).send({
      candidates,
      message: "Candidates retrieved successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error fetching candidates by election ID:", error);
    return res
      .status(500)
      .send({ message: "Server error", success: false, error });
  }
}

// ************* elction candidate and voted fetching *************

// Controller to get votes per election with candidate and voter names

module.exports = {
  create,
  getallelcetion,
  elctcandidate,
  updateelection,
  deleteelection,
  getallelcetionbyid,
  getelctioncandidate,
};
