// scripts/deploy-my-collectible.js
import { OpenzeppelinDefender } from "hardhat";

async function main() {
  
  const params: any = {
    name: "brigeOracle",
    encodedZippedCode:
      await OpenzeppelinDefender.AutoTaskClint.getEncodedZippedCodeFromFolder(
        "./openzeppelinDefender/autoTask/brigeOracle"
      ),
    trigger: {
      type: "webhook",
    },
    paused: true,
  };

  const result = await OpenzeppelinDefender.AutoTaskClint.create(params);
  
  await OpenzeppelinDefender.KvstoreClient.put('brigeOracleAutotaskId',result.autotaskId)
}

main();
