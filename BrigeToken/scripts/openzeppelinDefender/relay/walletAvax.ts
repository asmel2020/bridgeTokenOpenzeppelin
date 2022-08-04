// scripts/deploy-my-collectible.js
import { OpenzeppelinDefender } from "hardhat";

async function main() {
  const result: any = await OpenzeppelinDefender.KvstoreClient.get(
    "credencialRelay"
  );
  
  const credencialRelay = JSON.parse(result);

  const requestParameters: any = {
    name: "AvaxRelayer",
    useAddressFromRelayerId: credencialRelay.BscRelay.relayerId,
    network: "fuji",
    minBalance: BigInt(1e18).toString(),
  };
  const RelayerGetResponse = await OpenzeppelinDefender.RelayClient.create(
    requestParameters
  );
  const { apiKey, secretKey, relayerId, keyId }: any =
    await OpenzeppelinDefender.RelayClient.createKey(
      RelayerGetResponse.relayerId
    );

  credencialRelay.AvaxRelay = {
    address: RelayerGetResponse.address,
    apiKey,
    secretKey,
    relayerId,
    keyId,
  };

  await OpenzeppelinDefender.KvstoreClient.put(
    "credencialRelay",
    JSON.stringify(credencialRelay)
  );
  await OpenzeppelinDefender.KvstoreClient.put("apiKeyBlockchain_2", apiKey);
  await OpenzeppelinDefender.KvstoreClient.put(
    "apiSecretBlockchain_2",
    secretKey
  );
}

main();
