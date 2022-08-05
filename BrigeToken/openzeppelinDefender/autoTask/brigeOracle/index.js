const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require("defender-relay-client/lib/ethers");
const ethers = require("ethers");

const abi = [
  "function brige(uint256 _idToken, uint256 _amount) returns (bool)",
  "event Brige(address indexed to, address indexed tokenAddres, bool indexed typeBrige, uint256 amount, uint256 chainID)",
  "function mint(address to, uint256 amount)",
  "function transferToken(address _token, address _to, uint256 _amount)",
];

const transactionBrigs = async ({ hash, credentials, custodialAddress }) => {
  //credencials
  const credentialsOrigen = {
    apiKey: credentials.originalApiKey,
    apiSecret: credentials.originalApiSecret,
  };

  const credentialsWrapper = {
    apiKey: credentials.WrapperApiKey,
    apiSecret: credentials.WrapperApiSecret,
  };

  //blockchain de origen
  const providerOrigen = new DefenderRelayProvider(credentialsOrigen);

  //blockchain de destino
  const providerWrapper = new DefenderRelayProvider(credentialsWrapper);
  const signer = new DefenderRelaySigner(credentialsWrapper, providerWrapper, {
    speed: "fast",
  });

  //extraer los arg de los eventos de la blockchain de origen
  const { logs } = await providerOrigen.waitForTransaction(hash);
  let iface = new ethers.utils.Interface(abi);
  const result = logs.filter((logs) => logs.topics.length === 4);

  const { topics, data } = result[0];

  const EventLog = iface.decodeEventLog(
    "Brige(address,address,bool,uint256,uint256)",
    data,
    topics
  );

  if (EventLog["typeBrige"]) {
    const erc20 = new ethers.Contract(EventLog["tokenAddres"], abi, signer);

    const tx = await erc20.mint(EventLog["to"], EventLog["amount"]);

    const mined = await tx.wait();

    return mined;
  } else {
    const custodial = new ethers.Contract(custodialAddress, abi, signer);

    const tx = await custodial.transferToken(
      EventLog["tokenAddres"],
      EventLog["to"],
      EventLog["amount"]
    );

    const mined = await tx.wait();

    return mined;
  }
};

exports.handler = async function (event) {
  const store = new KeyValueStoreClient(event);
  
  const { hash, sentinel } = event.request.body;

  if (sentinel.chainId === 97) {
    const params = {
      credentials: {
        originalApiKey: await store.get("apiKeyBlockchain_1"),
        originalApiSecret: await store.get("apiSecretBlockchain_1"),
        WrapperApiKey: await store.get("apiKeyBlockchain_2"),
        WrapperApiSecret: await store.get("apiSecretBlockchain_2"),
      },
      hash,
      custodialAddress: await store.get("custodialAddressBlockchain_2"),
    };

    const result = await transactionBrigs(params);

    return result;
  } else if (sentinel.chainId === 43113) {
    const params = {
      credentials: {
        originalApiKey: await store.get("apiKeyBlockchain_2"),
        originalApiSecret: await store.get("apiSecretBlockchain_2"),
        WrapperApiKey: await store.get("apiKeyBlockchain_1"),
        WrapperApiSecret: await store.get("apiSecretBlockchain_1"),
      },
      hash,
      custodialAddress: await store.get("custodialAddressBlockchain_1"),
    };

    const result = await transactionBrigs(params);

    return result;
  }
};
