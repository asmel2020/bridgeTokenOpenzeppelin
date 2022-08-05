// scripts/deploy-my-collectible.js
import { OpenzeppelinDefender } from "hardhat";

async function main() {
  
  const params: any = {
    name: "pause-custodial-blockchain-1",
    encodedZippedCode:
      await OpenzeppelinDefender.AutoTaskClint.getEncodedZippedCodeFromFolder(
        "./openzeppelinDefender/autoTask/pause-custodial-blockchain-1"
      ),
    trigger: {
      type: "webhook",
    },
    paused: false,
  };

  const {autotaskId}= await OpenzeppelinDefender.AutoTaskClint.create(params);

  await OpenzeppelinDefender.KvstoreClient.put('PauseAutoTaskId_1',autotaskId)
}

main();
