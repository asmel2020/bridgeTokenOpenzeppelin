// scripts/deploy-my-collectible.js
import { OpenzeppelinDefender } from "hardhat";

async function main() {

  const requestParameters: any = {
    name: "BscRelayer",
    network: "bsctest",
    minBalance: BigInt(1e18).toString(),
  };

  const {relayerId,address} = await OpenzeppelinDefender.RelayClient.create(
    requestParameters
  );

  const { apiKey, secretKey,  keyId}=
    await OpenzeppelinDefender.RelayClient.createKey(relayerId);


      const cr ={
        BscRelay:{
          address,
          apiKey,
          secretKey,
          relayerId,
          keyId
        }
      }

  await OpenzeppelinDefender.KvstoreClient.put('credencialRelay',JSON.stringify(cr))
  await OpenzeppelinDefender.KvstoreClient.put('walletAddress',address)
  await OpenzeppelinDefender.KvstoreClient.put('apiKeyBlockchain_1',apiKey)
  await OpenzeppelinDefender.KvstoreClient.put('apiSecretBlockchain_1',secretKey || '')
}

main();
