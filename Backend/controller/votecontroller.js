const mongoose = require("mongoose");
const votemodule = require("../module/vote");
const User = require("../module/user");
const Election = require("../module/election");

async function addvote(req, res) {
  console.log(req.body);
  const id = req.user._id;

  const { voterId, electionId, candidateId } = req.body;
  try {
    const existingvote = await votemodule.findOne({ voterId });
    if (existingvote) {
      return res.status(400).send({ message: "Voter Already Exists" });
    } else {
      const newvoter = new votemodule({
        voterId: id,
        electionId,
        candidateId,
      });
      await newvoter.save();
      res.status(201).send({ message: "Voter Voted Sucessfully" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// *************user already voted *****************

async function checkUserVote(req, res) {
  const { electionId } = req.params;
  const userId = req.user._id;
  try {
    const voteRecord = await votemodule.findOne({ userId, electionId });

    if (voteRecord) {
      return res.status(200).send({
        success: true,
        voted: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        voted: false,
      });
    }
  } catch (error) {
    console.error("Error checking user vote:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

// ********* GetvotesPerElection*************
async function getVotesPerElection(req, res) {
  try {
    const elections = await Election.find();

    if (!elections || elections.length === 0) {
      return res.status(404).json({ message: "No elections found" });
    }

    const electionData = await Promise.all(
      elections.map(async (election) => {
        const votes = await votemodule
          .find({ electionId: election._id })
          .populate({
            path: "voterId",
            select: "name",
          })
          .populate({
            path: "candidateId",
            select: "candidatename",
          });

        const formattedVotes = votes.map((vote) => ({
          voterName: vote.voterId ? vote.voterId.name : "Anonymous",
          candidateName: vote.candidateId
            ? vote.candidateId.candidatename
            : "Unknown",
        }));

        return {
          electionTitle: election.title,
          description: election.description,
          votes: formattedVotes,
        };
      })
    );

    return res.status(200).json(electionData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  addvote,
  checkUserVote,
  getVotesPerElection,
};
