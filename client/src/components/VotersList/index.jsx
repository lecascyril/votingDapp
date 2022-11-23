// == Import npm
import { Segment, Header, Table } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useEth } from "../../contexts/EthContext";

// == Composant
function VotersList() {
  const {
    state: { accounts, contract, artifact },
  } = useEth();
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    async function getVoters() {
      if (artifact) {
        // On recup les voters déjà dans la whitelist
        const eventVoters = await contract.getPastEvents("VoterRegistered", { fromBlock: 0, toBlock: "latest" });
        // On fait un tableau avec leur adresses
        let votersAddrs = eventVoters.map((voter) => voter.returnValues._voterAddress);

        // On mémorise dans le state
        setVoters(votersAddrs);
      }
    }

    getVoters();
  }, [accounts, contract, artifact]);

  return (
    <Segment size="huge" textAlign="center">
      <Header as="h2">List of voters</Header>

      <Table celled size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Address</Table.HeaderCell>
            {/* <Table.HeaderCell>Voted</Table.HeaderCell>
            <Table.HeaderCell>Proposal voted</Table.HeaderCell> */}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {voters.map((voterAddr) => {
            return (
              <Table.Row key={voterAddr}>
                <Table.Cell>{voterAddr}</Table.Cell>
                {/* <Table.Cell>Yes</Table.Cell>
                <Table.Cell>1</Table.Cell> */}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Segment>
  );
}

// == Export
export default VotersList;
