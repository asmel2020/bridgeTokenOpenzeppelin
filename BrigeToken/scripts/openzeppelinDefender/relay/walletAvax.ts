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
  const {relayerId,address}:any = await OpenzeppelinDefender.RelayClient.create(
    requestParameters
  );
  const {apiKey, secretKey,  keyId } =
    await OpenzeppelinDefender.RelayClient.createKey(
      relayerId
    );

  credencialRelay.AvaxRelay = {
    address,
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
    secretKey || ''
  );
}

main();
