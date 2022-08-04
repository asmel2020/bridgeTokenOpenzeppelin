// scripts/deploy-my-collectible.js
import { OpenzeppelinDefender } from "hardhat";
import * as fs from "fs";
async function main() {
  
    const requestParameters:any = {
        type: 'BLOCK',
        network: 'bsctest',
        confirmLevel: 21,
        name: 'Sentinel',
        addresses: [await OpenzeppelinDefender.KvstoreClient.get("custodialAddressBlockchain_1")],
        abi: fs.readFileSync("./abis/BrigeToken.json", { encoding: "utf8", flag: "r" }).toString(),
        paused: false,
        eventConditions: [{eventSignature: 'Brige(address,address,bool,uint256,uint256)'}],
        autotaskTrigger: await OpenzeppelinDefender.KvstoreClient.get('brigeOracleAutotaskId'),
        notificationChannels: ['']
      };

     await OpenzeppelinDefender.SentinelClient.create(requestParameters);

}

main();