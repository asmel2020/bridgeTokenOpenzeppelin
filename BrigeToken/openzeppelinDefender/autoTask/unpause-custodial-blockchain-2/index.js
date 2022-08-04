const { DefenderRelayProvider,DefenderRelaySigner } = require("defender-relay-client/lib/ethers");
const ethers = require("ethers");
const abi = ['function unpause()'];

exports.handler = async function (event) {
  const {
    custodialAddressBlockchain_2,
    apiKeyBlockchain_2,
    apiSecretBlockchain_2,
  } = event.secrets;

  try {
    const credentialsWrapper = {
      apiKey: apiKeyBlockchain_2,
      apiSecret: apiSecretBlockchain_2,
    };

    const providerWrapper = new DefenderRelayProvider(credentialsWrapper);
    const WrapperSigner = new DefenderRelaySigner(credentialsWrapper, providerWrapper, {
        speed: "fast",
      });
    const WrapperCustodial = new ethers.Contract(
      custodialAddressBlockchain_2,
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