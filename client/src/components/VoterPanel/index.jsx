import { useState, useEffect } from "react";
import { Segment, Header, Form, Button, Input, Dropdown, Radio } from "semantic-ui-react";
import { useEth } from "../../contexts/EthContext";

function VoterPanel({ proposals, setProposals, currentPhase, setWinner }) {
  const {
    state: { accounts, contract, artifact },
  } = useEth();
  const [isVoter, setIsVoter] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedProposal, setSelectedProposal] = useState(0);
  const [proposalsArray, setProposalsArray] = useState([]);

  useEffect(() => {
    async function getVoterData() {
      if (artifact) {
        let voters = await contract.getPastEvents("VoterRegistered", { fromBlock: 0, toBlock: "latest" });
        const voter = voters.find((voter) => voter.returnValues._voterAddress === accounts[0]);
        
        if (voter) {
          setIsVoter(true);
          const voterData = await contract.methods.getVoter(voter.returnValues._voterAddress).call({ from: accounts[0] });
          setHasVoted(voterData.hasVoted);
        } else {
          setIsVoter(false);
        }
      }
    }

    async function getProposals() {
      if (contract) {
        // On recup les proposals
        const eventProposals = await contract.getPastEvents("ProposalRegistered", { fromBlock: 0, toBlock: "latest" });
        // On fait un tableau avec leur ids
        const proposalsId = eventProposals.map((proposal) => proposal.returnValues._proposalId);

        // Pour chaque ID on va recup la description et constituer un tableau pour le select
        // On se prépare un tableau vide qu'on va remplir avec chaque proposals
        let proposalsDatas = [];

        // Utilisation de la boucle for
        // Foreach ne permet pas de déclencher plusieurs call asynchrone correctement
        //https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
        for (const id of proposalsId) {
          // On recup les données de la proposal
          const proposal = await contract.methods.getOneProposal(parseInt(id)).call({ from: accounts[0] });
          // On rempli le tableau
          proposalsDatas.push(
            {
              key: id,
              text: proposal.description,
              value: id
            }
          );
        }

        // On mémorise dans le state
        setProposalsArray(proposalsDatas);
      }
    };

    getVoterData();
    getProposals();
  }, [accounts, contract, artifact]);

  const handleChange = (evt) => {
    setInputValue(evt.currentTarget.value);
  };

  const handleAddProposal = async () => {
    if (inputValue === "") {
      alert("Please enter a description");
      return;
    }
    const receipt = await contract.methods.addProposal(inputValue).send({ from: accounts[0] });
    window.location.reload();
  };

  const handleChangeProposal = (e, data) => {
    setSelectedProposal(data.value);
  };

  const handleVote = async () => {
    await contract.methods.setVote(parseInt(selectedProposal)).send({ from: accounts[0] });

    // const winnerId = await contract.methods.winningProposalID().call({ from: accounts[0] });
    // const winnerProposal = await contract.methods.getOneProposal(parseInt(winnerId)).call({ from: accounts[0] });
    // console.log(winnerProposal);
    // setWinner(winnerProposal);

    window.location.reload();
  };
  
  return (
    isVoter && (
      <Segment raised size="huge" color="green">
        <Header as="h2">Voter's panel</Header>
        {currentPhase === 1 && (
          <Segment size="huge">
            <Form onSubmit={handleAddProposal}>
              <Form.Field>
                <Input
                  value={inputValue}
                  onChange={handleChange}
                  icon="file alternate outline"
                  iconPosition="left"
                  placeholder="Add Proposal"
                  size="huge"
                  fluid
                />
              </Form.Field>
              <Button color="green" type="submit" size="huge" fluid>
                Add
              </Button>
            </Form>
          </Segment>
        )}
        {(currentPhase === 3 && !hasVoted) && (
          <Segment size="huge">
            <Form onSubmit={handleVote}>
              <Form.Field>
                {proposalsArray.map((proposal) => {
                  return (
                    <>
                      <Radio
                        key={proposal.key}
                        label={proposal.text}
                        name='radioGroup'
                        value={proposal.key}
                        checked={selectedProposal == proposal.key}
                        onChange={handleChangeProposal}
                      />
                      <br />
                    </>
                  );
                })}
              </Form.Field>
              <Button color="green" type="submit" size="huge">
                Vote
              </Button>
            </Form>
          </Segment>
          )}
      </Segment>
    )
  );
}

export default VoterPanel;
