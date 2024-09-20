import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Userpage from "./pages/Userpage";
import AddCandidate from "./Admin/AddCandidates";
import AddElection from "./Admin/AddElection";
import Election from "./components/Election";
import Contact from "./components/Contact";
import Vote from "./components/Vote";
import VoterPanel from "./components/VotePanel";
import VotesPerElection from "./Admin/VotesperElection";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userinfo/*" element={<Userpage />} />
          <Route path="/addcandidate" element={<AddCandidate />} />
          <Route path="/addelection" element={<AddElection />} />
          <Route path="/election" element={<Election />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/vote/:electionId" element={<Vote />} />
          <Route path="/VoterPanel/:electionId" element={<VoterPanel />} />
          <Route path="/Votesperelection" element={<VotesPerElection />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
