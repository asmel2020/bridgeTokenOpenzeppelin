const { DefenderRelayProvider,DefenderRelaySigner } = require("defender-relay-client/lib/ethers");
const ethers = require("ethers");
const abi = ['function unpause()'];

exports.handler = async function (event) {
  const {
    custodialAddressBlockchain_1,
    apiKeyBlockchain_1,
    apiSecretBlockchain_1,
  } = event.secrets;

  try {

    const credentialsOrigen = {
      apiKey: apiKeyBlockchain_1,
      apiSecret: apiSecretBlockchain_1,
    };

    const providerOrigen = new DefenderRelayProvider(credentialsOrigen);
    const OrigenSigner = new DefenderRelaySigner(credentialsOrigen, providerOrigen, {
        speed: "fast",
      });
    const OrigenCustodial = new ethers.Contract(
      custodialAddressBlockchain_1,
      abi,
      OrigenSigner
    );
    const OrigenTx = await OrigenCustodial.unpause();

   const result= await OrigenTx.wait(4);

   

    return result;

  } catch (error) {

    return error;

  }
};