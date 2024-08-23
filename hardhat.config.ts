import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";

const { API_URL, PRIVATE_KEY } = process.env;

if (!API_URL || !PRIVATE_KEY) {
  throw new Error('Please set your API_URL and PRIVATE_KEY in a .env file');
}

const config: HardhatUserConfig = {
  solidity: "0.8.26",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: {
      sepolia: 'XI4C3G2YXTGTBR6T4MKWCX94NJAFI15G34'
    }
  }
};

export default config;
