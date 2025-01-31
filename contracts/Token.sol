// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18;

import "hardhat/console.sol";

contract Token {
    string public name = "HardToken";
    string public symbol = "HDT";
    uint public totalSupply = 10000;
    address public owner;
    mapping(address => uint) public balances;

    constructor() {
        balances[msg.sender] = totalSupply; // Corrected `balance` to `balances`
        owner = msg.sender;
    }

    function transfer(address to, uint amount) external {
        console.log("Sender balance is %s tokens **", balances[msg.sender]);
        console.log("Sender sending %s tokens to %s address **", amount,to);
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint) {
        return balances[account];
    }
}
