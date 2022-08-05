// scripts/deploy-my-collectible.js
import { ethers, OpenzeppelinDefender } from "hardhat";
import * as fs from "fs";

async function main() {
  const relayAddress =
    (await OpenzeppelinDefender.KvstoreClient.get("walletAddress")) || " ";

  const BrigeToken = await ethers.getContractFactory("BrigeToken");

  const brigeToken = await BrigeToken.deploy(relayAddress);

  const { chainId } = await brigeToken.provider.getNetwork();

  let params: any;
  let name: string;

  if (chainId === 97) {
    name = "BrigeTokenBsc";
    params = {
      network: await OpenzeppelinDefender.Utils.fromChainId(chainId),
      address: brigeToken.address,
      name,
      abi: fs
        .readFileSync("./abis/BrigeToken.json", { encoding: "utf8", flag: "r" })
        .toString(),
    };
    const { address,network } = await OpenzeppelinDefender.AdminClient.addContract(params);
    await OpenzeppelinDefender.KvstoreClient.put(
      name,
      JSON.stringify({ name, address, network })
    );

    await OpenzeppelinDefender.KvstoreClient.put("custodialAddressBlockchain_1",address);

  } else {
    name = "BrigeTokenAvax";
    params = {
      network: await OpenzeppelinDefender.Utils.fromChainId(chainId),
      address: brigeToken.address,
      name,
      abi: fs
        .readFileSync("./abis/BrigeToken.json", { encoding: "utf8", flag: "r" })
        .toString(),
    };

    const { address, network } =
      await OpenzeppelinDefender.AdminClient.addContract(params);

    await OpenzeppelinDefender.KvstoreClient.put(
      name,
      JSON.stringify({ name, address, network })
    );
    
    await OpenzeppelinDefender.KvstoreClient.put(
      "custodialAddressBlockchain_2",
      brigeToken.address
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
