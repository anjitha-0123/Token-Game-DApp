require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  defaultNetwork:"localhost",
  solidity: "0.8.20",
  networks:{
    localhost:{
      url:"http://127.0.0.1:8545/"
    }
  }
};
