// scripts/deploy-my-collectible.js
import { OpenzeppelinDefender } from "hardhat";

async function main() {

  const params: any = {
    name: "balaceVerify",
    encodedZippedCode:
      await OpenzeppelinDefender.AutoTaskClint.getEncodedZippedCodeFromFolder(
        "./openzeppelinDefender/autoTask/balaceVerify"
      ),
    trigger: {
      type: 'schedule',
      frequencyMinutes: 30
    },
    paused: true,
  };

  await OpenzeppelinDefender.AutoTaskClint.create(params);
}

main();
