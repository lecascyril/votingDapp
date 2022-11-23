const Voting = artifacts.require("Voting");

module.exports = async function (deployer) {
  await deployer.deploy(Voting);
  // const instance = await Voting.deployed();

  // const owner = await instance.owner();
  // console.log(owner);

  // await instance.addVoter("0x47db4b31eA46F9eAB135382672452f4C1a1014Fe");
  // await instance.addVoter("0x4Cb75f823E16d945E357B9BA537f1bB53cA81562");
  // await instance.addVoter("0x780371f89bdD09F3c487A3c63abaEa3e4aA78A31");

  // const voter1 = await instance.getVoter("0x47db4b31eA46F9eAB135382672452f4C1a1014Fe");
  // const voter2 = await instance.getVoter("0x4Cb75f823E16d945E357B9BA537f1bB53cA81562");
  // const voter3 = await instance.getVoter("0x780371f89bdD09F3c487A3c63abaEa3e4aA78A31");

  // console.log(voter1);
  // console.log(voter2);
  // console.log(voter3);

  // let voters = await instance.getPastEvents("VoterRegistered", { fromBlock: 0, toBlock: "latest" });

  // console.log(voters);
};
