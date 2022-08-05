const { DefenderRelayProvider,DefenderRelaySigner } = require("defender-relay-client/lib/ethers");
const ethers = require("ethers");
const abi = ['function unpause()'];

exports.handler = async function (event) {
  const store = new KeyValueStoreClient(event);
 
  try {
    const credentialsWrapper = {
      apiKey: await store.get("apiKeyBlockchain_2"),
      apiSecret: await store.get("apiSecretBlockchain_2"),
    };

    const providerWrapper = new DefenderRelayProvider(credentialsWrapper);
    const WrapperSigner = new DefenderRelaySigner(credentialsWrapper, providerWrapper, {
        speed: "fast",
      });
    const WrapperCustodial = new ethers.Contract(
      await store.get("custodialAddressBlockchain_2"),
      abi,
      WrapperSigner
    );
    const WrapperTx = await WrapperCustodial.unpause();
    const result= await WrapperTx.wait(4);

    return result;

  } catch (error) {

    return error;

  }
};