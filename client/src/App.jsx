import { useState } from "react";
import { Message } from 'semantic-ui-react';

import { EthProvider } from "./contexts/EthContext";

import Account from "./components/Account";
import Winner from "./components/Winner";
import AdminPanel from "./components/AdminPanel";
import VoterPanel from "./components/VoterPanel";
import VotersList from "./components/VotersList";
import ProposalsList from "./components/ProposalsList";

import "./App.css";

function App() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const phases = [
    "RegisteringVoters",
    "ProposalsRegistrationStarted",
    "ProposalsRegistrationEnded",
    "VotingSessionStarted",
    "VotingSessionEnded",
    // "VotesTallied",
  ];
  const [proposals, setProposals] = useState([]);
  const [winner, setWinner] = useState(null);
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Account />
          <Winner winner={winner} currentPhase={currentPhase} />
          <AdminPanel currentPhase={currentPhase} setCurrentPhase={setCurrentPhase} phases={phases} />
          <VoterPanel proposals={proposals} setProposals={setProposals} currentPhase={currentPhase} setWinner={setWinner} />
          <VotersList />
          <ProposalsList proposals={proposals} />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
