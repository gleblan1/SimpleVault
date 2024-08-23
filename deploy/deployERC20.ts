// scripts/deploy.js

import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const MyToken = await ethers.getContractFactory("MyToken");
  const initialOwner = deployer.address; // You can change this to any desired initial owner address
  const myToken = await MyToken.deploy(initialOwner);

  await myToken.waitForDeployment();

  console.log("MyToken deployed to:", await myToken.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
