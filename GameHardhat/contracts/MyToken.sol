// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    address public admin;

    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        admin = msg.sender;  // Set the contract deployer as admin
        _mint(msg.sender, initialSupply * 10 ** decimals());  // Mint initial supply to the deployer's address
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not the admin");
        _;
    }

    // Add createToken function to mint tokens after deployment
    function createToken(address to, uint256 amount) public onlyAdmin {
        _mint(to, amount);
    }
}