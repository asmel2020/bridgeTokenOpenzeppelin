// scripts/deploy-my-collectible.js
import { ethers, upgrades } from "hardhat";
async function main() {
  const Factory = await ethers.getContractFactory("RhizomFactory");

  const factory = await upgrades.deployProxy(Factory,{kind:'uups'});

  await factory.deployed();


  console.log("Dark deployed to:", factory.address);
}

main();