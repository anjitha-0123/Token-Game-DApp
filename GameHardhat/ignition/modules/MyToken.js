

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MyTokenModule", (m) => {
  const deployer = m.getAccount(0); 
  const myToken = m.contract("MyToken", [deployer]); 

  return { myToken };
});

