import { ethers, upgrades } from "hardhat";

async function main() {
  const Swap= await ethers.getContractFactory("SwapV3");
  await upgrades.upgradeProxy("0x4db5e7f4a54D53b03555dA65373F692551eAd352", Swap);
  console.log("upgraded");
}

main();