// scripts/deploy-my-collectible.js
import { ethers} from "hardhat";
async function main() {
  // We get the contract to deploy
  const Dark = await ethers.getContractFactory("TokeDark");
  const dark = await Dark.deploy();

  await dark.deployed();

  console.log("Greeter deployed to:", dark.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });