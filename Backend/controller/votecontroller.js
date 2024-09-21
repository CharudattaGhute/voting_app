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

async function hasvoted(req, res) {
  const { electionId } = req.params;
  const userId = req.user._id;

  try {
    // Log the IDs for debugging
    console.log(`Checking vote for user: ${userId} in election: ${electionId}`);

    // Find if the user has voted in the specific election
    const vote = await votemodule.findOne({ electionId, userId });

    // Return appropriate response based on the existence of the vote
    if (vote) {
      return res.json({ hasVoted: true });
    } else {
      return res.json({ hasVoted: false });
    }
  } catch (error) {
    // Return a 500 status on error
    console.error("Error finding vote:", error.message);
    return res.status(500).json({
      success: false,
      message: `Error finding vote: ${error.message}`,
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
  hasvoted,
  getVotesPerElection,
};
