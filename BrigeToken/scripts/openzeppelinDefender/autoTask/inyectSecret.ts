// scripts/deploy-my-collectible.js
import { OpenzeppelinDefender } from "hardhat";

async function main() {
  
  const params: any = {
    name: "inyectSecret",
    encodedZippedCode:
      await OpenzeppelinDefender.AutoTaskClint.getEncodedZippedCodeFromFolder(
        "./openzeppelinDefender/autoTask/inyectSecret"
      ),
    trigger: {
      type: "webhook",
    },
    paused: false,
  };

  const {autotaskId}= await OpenzeppelinDefender.AutoTaskClint.create(params);
  await OpenzeppelinDefender.KvstoreClient.put('inyectSecretAutotaskId',autotaskId)
}

main();
