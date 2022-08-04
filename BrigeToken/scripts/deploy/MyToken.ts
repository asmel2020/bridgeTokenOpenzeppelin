// scripts/deploy-my-collectible.js
import { ethers,OpenzeppelinDefender} from "hardhat";
import * as fs from "fs";

async function main() {
  // We get the contract to deploy
 
    const MyToken = await ethers.getContractFactory("MyToken");

    const myToken = await MyToken.deploy();
    const {chainId} =await myToken.provider.getNetwork()
   
    await OpenzeppelinDefender.KvstoreClient.put(
      "originalTokenAddress",
      myToken.address
    );

    const prams: any = {
      network: await OpenzeppelinDefender.Utils.fromChainId(chainId),
      address: myToken.address,
      name: "originalTokenAddress",
      abi: fs
        .readFileSync("./abis/MyToken.json", { encoding: "utf8", flag: "r" })
        .toString(),
    };
    await OpenzeppelinDefender.AdminClient.addContract(prams);

    await OpenzeppelinDefender.KvstoreClient.put("originalTokenAddress",myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });