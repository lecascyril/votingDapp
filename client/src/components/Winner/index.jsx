/* eslint-disable no-restricted-globals */
import { useState, useEffect } from "react";
import { Message } from "semantic-ui-react";
import { useEth } from "../../contexts/EthContext";

function Winner({ currentPhase }) {
  const {
    state: { accounts, contract, artifact },
  } = useEth();
  const [winner, setWinner] = useState([]);

  useEffect(() => {
    async function getWinner() {
      if (contract) {
        const winnerId = await contract.methods.winningProposalID().call({ from: accounts[0] });
        const winnerProposal = await contract.methods.getOneProposal(parseInt(winnerId)).call({ from: accounts[0] });
        console.log(winnerProposal);
        setWinner(winnerProposal);
      }
    };

    getWinner();
  }, [accounts, contract, artifact]);

  return (winner !== null && currentPhase >= 4) && (
    <Message color='green' size='massive'>
      The winner is : {winner.description} with {winner.voteCount} votes !
    </Message>
  );
}

export default Winner;
