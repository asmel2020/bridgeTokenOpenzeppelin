const { DefenderRelayProvider,DefenderRelaySigner } = require("defender-relay-client/lib/ethers");
const { KeyValueStoreClient } = require("defender-kvstore-client");
const ethers = require("ethers");
const abi = ['function pause()'];

exports.handler = async function (event) {
  const store = new KeyValueStoreClient(event);
 
  try {

    const credentialsOrigen = {
      apiKey: await store.get("apiKeyBlockchain_1"),
      apiSecret: await store.get("apiSecretBlockchain_1"),
    };

    const providerOrigen = new DefenderRelayProvider(credentialsOrigen);
    const OrigenSigner = new DefenderRelaySigner(credentialsOrigen, providerOrigen, {
        speed: "fast",
      });
    const OrigenCustodial = new ethers.Contract(
      await store.get("custodialAddressBlockchain_1"),
      abi,
      OrigenSigner
    );
    const OrigenTx = await OrigenCustodial.pause();

    const result= await OrigenTx.wait(4);

    return result;

  } catch (error) {

    return error;

  }
};
