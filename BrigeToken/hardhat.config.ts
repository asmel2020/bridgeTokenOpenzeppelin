import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-abi-exporter";
import "hardhat-openzeppelin-defender";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-etherscan";
import  "@openzeppelin/hardhat-upgrades";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    mainnet: {
      url: process.env.MAINNET_RPC_URL || "",
      accounts:
        process.env.DEPLOYER_PRIVATE_KEY !== undefined
          ? [process.env.DEPLOYER_PRIVATE_KEY]
          : [],
    },
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL || "",
      accounts:
        process.env.DEPLOYER_PRIVATE_KEY !== undefined
          ? [process.env.DEPLOYER_PRIVATE_KEY]
          : [],
    },
    ropsten: {
      url: process.env.ROPSTEN_RPC_URL || "",
      accounts:
        process.env.DEPLOYER_PRIVATE_KEY !== undefined
          ? [process.env.DEPLOYER_PRIVATE_KEY]
          : [],
    },
    bsc: {
      url: process.env.BSC_RPC_URL || "",
      accounts:
        process.env.DEPLOYER_PRIVATE_KEY !== undefined
          ? [process.env.DEPLOYER_PRIVATE_KEY]
          : [],
    },
    bscTestnet: {
      url: process.env.BSC_TESTNET_RPC_URL || "",
      accounts:
        process.env.DEPLOYER_PRIVATE_KEY_TESTNET !== undefined
          ? [process.env.DEPLOYER_PRIVATE_KEY_TESTNET]
          : [],
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL || "",
      accounts:
        process.env.DEPLOYER_PRIVATE_KEY !== undefined
          ? [process.env.DEPLOYER_PRIVATE_KEY]
          : [],
    },
    mumbai: {
      url: process.env.MUMBAI_RPC_URL || "",
      accounts:
        process.env.DEPLOYER_PRIVATE_KEY_TESTNET !== undefined
          ? [process.env.DEPLOYER_PRIVATE_KEY_TESTNET]
          : [],
    },
    avalancheTestnet: {
      url: process.env.AVALANCHE_TESTNET_RPC_URL || "",
      accounts:
        process.env.DEPLOYER_PRIVATE_KEY_TESTNET !== undefined
          ? [process.env.DEPLOYER_PRIVATE_KEY_TESTNET]
          : [],
    },
  },
  etherscan: {
    /*apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      bsc: process.env.BSCSCAN_API_KEY,
      bscTestnet:process.env.BSCSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
    },*/
  },
  abiExporter: {
    path: './abis',
    runOnCompile: true,
    clear: true,
    flat: true,
    only: ['MyToken','BrigeToken','WMyToken'],
    spacing: 2,
    //pretty: true,
    format: "json",
  },
  OpenzeppelinDefenderCredential: {
    apiKey: process.env.API_KEY || "",
    apiSecret:process.env.API_SECRET || "",
  }
};

export default config;
