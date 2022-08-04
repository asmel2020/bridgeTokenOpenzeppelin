import { ethers, upgrades } from "hardhat";

async function main() {
  const Swap= await ethers.getContractFactory("SwapV2");
  await upgrades.upgradeProxy("0x26eaf8B4a5297598eb414d042Ff924aF86172bC0", Swap);
  console.log("upgraded");
}

main();