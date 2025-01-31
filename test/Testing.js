const { expect } = require("chai");
const { ethers } = require("hardhat");
//code repeting here 
//its working but its not the best way to do it
describe("Token contract", function () {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
        const [owner] = await ethers.getSigners(); // Define owner

        const Token = await ethers.getContractFactory("Token");
        const hardhatToken = await Token.deploy();
        await hardhatToken.deployed();

        const ownerBalance = await hardhatToken.balanceOf(owner.address);

        // Check if the total supply is assigned to the owner
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should transfer tokens between accounts", async function () {
        const [owner, addr1, addr2] = await ethers.getSigners(); // Retrieve signer accounts

        const Token = await ethers.getContractFactory("Token");
        const hardhatToken = await Token.deploy();
        await hardhatToken.deployed();

        // Transfer tokens from owner to addr1
        await hardhatToken.transfer(addr1.address, 10);
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);

        // Transfer tokens from addr1 to addr2
        await hardhatToken.connect(addr1).transfer(addr2.address, 5);
        expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
    });
});
