// We load the plugin here.
import { HardhatUserConfig } from "hardhat/types";
import * as dotenv from "dotenv";
import "../../../src/index";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.7.3",
  defaultNetwork: "hardhat",
  OpenzeppelinDefenderCredential: {
    apiKey: process.env.API_KEY || "",
    apiSecret:process.env.API_SECRET || "",
  },
};

export default config;
