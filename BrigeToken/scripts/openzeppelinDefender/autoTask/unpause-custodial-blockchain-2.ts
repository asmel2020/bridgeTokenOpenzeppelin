// scripts/deploy-my-collectible.js
import { OpenzeppelinDefender } from "hardhat";

async function main() {
  
  const params: any = {
    name: "unpause-custodial-blockchain-2",
    encodedZippedCode:
      await OpenzeppelinDefender.AutoTaskClint.getEncodedZippedCodeFromFolder(
        "./openzeppelinDefender/autoTask/unpause-custodial-blockchain-2"
      ),
    trigger: {
      type: "webhook",
    },
    paused: false,
  };

  await OpenzeppelinDefender.AutoTaskClint.create(params);
}

main();
