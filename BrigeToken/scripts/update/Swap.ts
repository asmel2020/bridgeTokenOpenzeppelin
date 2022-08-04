import { ethers, upgrades } from "hardhat";

async function main() {
  const Swap= await ethers.getContractFactory("Swap");
  await upgrades.upgradeProxy("0xe6bEB786D971CC51829F5a07e00088d8a44c2781", Swap);
  console.log("upgraded");
}

main();