// scripts/deploy-my-collectible.js
import { ethers, OpenzeppelinDefender } from "hardhat";
import * as fs from "fs";
async function main() {
  // We get the contract to deploy
  
  const relayAddress =
  (await OpenzeppelinDefender.KvstoreClient.get("walletAddress")) || " ";

  const WMyToken = await ethers.getContractFactory("WMyToken");

  const wMyToken = await WMyToken.deploy(relayAddress);

  const {chainId} =await wMyToken.provider.getNetwork();

  const prams: any = {
    network: await OpenzeppelinDefender.Utils.fromChainId(chainId),
    address: wMyToken.address,
    name: "WrapperToken-1",
    abi: fs
      .readFileSync("./abis/WMyToken.json", { encoding: "utf8", flag: "r" })
      .toString(),
  };

  await OpenzeppelinDefender.AdminClient.addContract(prams);

  await OpenzeppelinDefender.KvstoreClient.put("WrapeTokenAddress",wMyToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
