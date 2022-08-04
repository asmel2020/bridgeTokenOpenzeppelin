// scripts/deploy-my-collectible.js
import { OpenzeppelinDefender } from "hardhat";
import * as fs from "fs";
async function main() {
  
 "custodialAddressBlockchain_2"
    const requestParameters:any = {
        type: 'BLOCK',
        network: 'fuji',
        confirmLevel: 12,
        name: 'Sentinel',
        addresses: [await OpenzeppelinDefender.KvstoreClient.get("custodialAddressBlockchain_2")],
        abi: fs.readFileSync("./abis/BrigeToken.json", { encoding: "utf8", flag: "r" }).toString(),
        paused: false,
        eventConditions: [{eventSignature: 'Brige(address,address,bool,uint256,uint256)'}],
        autotaskTrigger: await OpenzeppelinDefender.KvstoreClient.get('brigeOracleAutotaskId'),
        notificationChannels: ['']
      };

     await OpenzeppelinDefender.SentinelClient.create(requestParameters);

}

main();