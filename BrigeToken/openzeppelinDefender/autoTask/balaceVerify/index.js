const { DefenderRelayProvider } = require("defender-relay-client/lib/ethers");
const { AutotaskClient } = require("defender-autotask-client");
const { KeyValueStoreClient } = require("defender-kvstore-client");
const ethers = require("ethers");
const abi = [
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
];

exports.handler = async function (event) {
  const store = new KeyValueStoreClient(event);

  const client = new AutotaskClient({
    apiKey:await store.get("adminApiKey"),
    apiSecret: await store.get("adminApiSecret"),
  });

  const credentialsOrigen = {
    apiKey: await store.get("apiKeyBlockchain_1"),
    apiSecret: await store.get("apiSecretBlockchain_1"),
  };

  const providerOrigen = new DefenderRelayProvider(credentialsOrigen);
  const OrigenErc20 = new ethers.Contract(
    await store.get("originalTokenAddress"),
    abi,
    providerOrigen
  );
  const Origenresult = await OrigenErc20.balanceOf(
    await store.get("custodialAddressBlockchain_1")
  );

  const credentialsWrapper = {
    apiKey: await store.get("apiKeyBlockchain_2"),
    apiSecret: await store.get("apiSecretBlockchain_2"),
  };
  const providerWrapper = new DefenderRelayProvider(credentialsWrapper);
  const WrapperErc20 = new ethers.Contract(
    await store.get("WrapeTokenAddress"),
    abi,
    providerWrapper
  );
  const WrapperResult = await WrapperErc20.totalSupply();

  if (!ethers.BigNumber.from(Origenresult).eq(WrapperResult)) {
    await client.runAutotask(await store.get("PauseAutoTaskId_1"));

    await client.runAutotask(await store.get("PauseAutoTaskId_2"));

    return {
      message: "sistema pausado por seguridad",
    };
  }

  return {
    message: "todo genial",
  };
};
