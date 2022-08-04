// scripts/deploy-my-collectible.js
import { OpenzeppelinDefender } from "hardhat";

async function main() {

  const requestParameters: any = {
    name: "BscRelayer",
    network: "bsctest",
    minBalance: BigInt(1e18).toString(),
  };

  const RelayerGetResponse = await OpenzeppelinDefender.RelayClient.create(
    requestParameters
  );

  const { apiKey, secretKey, relayerId, keyId }:any =
    await OpenzeppelinDefender.RelayClient.createKey(
      RelayerGetResponse.relayerId
  );
      const cr ={
        BscRelay:{
          address:RelayerGetResponse.address,
          apiKey,
          secretKey,
          relayerId,
          keyId
        }
      }

  await OpenzeppelinDefender.KvstoreClient.put('credencialRelay',JSON.stringify(cr))
  await OpenzeppelinDefender.KvstoreClient.put('walletAddress',RelayerGetResponse.address)
  await OpenzeppelinDefender.KvstoreClient.put('apiKeyBlockchain_1',apiKey)
  await OpenzeppelinDefender.KvstoreClient.put('apiSecretBlockchain_1',secretKey)
}

main();
