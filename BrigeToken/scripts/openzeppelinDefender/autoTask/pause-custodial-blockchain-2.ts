// scripts/deploy-my-collectible.js
import { OpenzeppelinDefender } from "hardhat";

async function main() {
  
  const params: any = {
    name: "pause-custodial-blockchain-2",
    encodedZippedCode:
      await OpenzeppelinDefender.AutoTaskClint.getEncodedZippedCodeFromFolder(
        "./openzeppelinDefender/autoTask/pause-custodial-blockchain-2"
      ),
    trigger: {
      type: "webhook",
    },
    paused: false,
  };

  const result = await OpenzeppelinDefender.AutoTaskClint.create(params);

  await OpenzeppelinDefender.KvstoreClient.put('PauseAutoTaskId_2',result.autotaskId)
}

main();
