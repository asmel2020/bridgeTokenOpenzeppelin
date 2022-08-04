const { DefenderRelayProvider } = require("defender-relay-client/lib/ethers");
const { AutotaskClient } = require('defender-autotask-client');

const ethers = require("ethers");
const abi = [
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
];

exports.handler = async function (event) {
  const {
    custodialAddressBlockchain_1,
    apiKeyBlockchain_1,
    apiSecretBlockchain_1,
    apiKeyBlockchain_2,
    apiSecretBlockchain_2,
    PauseAutoTaskId_1,
    PauseAutoTaskId_2,
    adminApiKey,
    adminApiSecret,
    originalToken,
    WrapeToken
  } = event.secrets;

  const client = new AutotaskClient({ apiKey: adminApiKey, apiSecret: adminApiSecret });

  const credentialsOrigen = {
    apiKey: apiKeyBlockchain_1,
    apiSecret: apiSecretBlockchain_1,
  };

  const providerOrigen = new DefenderRelayProvider(credentialsOrigen);
  const OrigenErc20 = new ethers.Contract(
    originalToken,
    abi,
    providerOrigen
  );
  const Origenresult = await OrigenErc20.balanceOf(
    custodialAddressBlockchain_1
  );

  const credentialsWrapper = {
    apiKey: apiKeyBlockchain_2,
    apiSecret: apiSecretBlockchain_2,
  };
  const providerWrapper = new DefenderRelayProvider(credentialsWrapper);
  const WrapperErc20 = new ethers.Contract(
    WrapeToken,
    abi,
    providerWrapper
  );
  const WrapperResult = await WrapperErc20.totalSupply();

  if (!ethers.BigNumber.from(Origenresult).eq(WrapperResult)) {

    await client.runAutotask(PauseAutoTaskId_1);

    await client.runAutotask(PauseAutoTaskId_2);

    return {
        message:"sistema pausado por seguridad"
    };
  }

   return {
        message:"todo genial"
    };
};
