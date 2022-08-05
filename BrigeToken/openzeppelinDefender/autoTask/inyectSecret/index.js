const { KeyValueStoreClient } = require("defender-kvstore-client");

exports.handler = async function (credentials) {

  const { 
    custodialAddressBlockchain_1,
    custodialAddressBlockchain_2,
    apiKeyBlockchain_1,
    apiSecretBlockchain_1,
    apiKeyBlockchain_2,
    apiSecretBlockchain_2,
    PauseAutoTaskId_1,
    PauseAutoTaskId_2,
    adminApiKey,
    adminApiSecret,
    originalTokenAddress,
    WrapeTokenAddress
   } = credentials.request.body;

  const store = new KeyValueStoreClient(credentials);
  await store.put("custodialAddressBlockchain_1",custodialAddressBlockchain_1);
  await store.put("custodialAddressBlockchain_2",custodialAddressBlockchain_2);
  await store.put("apiKeyBlockchain_1",apiKeyBlockchain_1);
  await store.put("apiSecretBlockchain_1",apiSecretBlockchain_1);
  await store.put("apiKeyBlockchain_2",apiKeyBlockchain_2);
  await store.put("apiSecretBlockchain_2",apiSecretBlockchain_2);
  await store.put("PauseAutoTaskId_1",PauseAutoTaskId_1);
  await store.put("PauseAutoTaskId_2",PauseAutoTaskId_2);
  await store.put("adminApiKey",adminApiKey);
  await store.put("adminApiSecret",adminApiSecret);
  await store.put("originalTokenAddress",originalTokenAddress);
  await store.put("WrapeTokenAddress",WrapeTokenAddress);
};
