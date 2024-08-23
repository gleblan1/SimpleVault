// scripts/deploy.js

import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const erc4626 = await ethers.deployContract("ERC4626OpenZepplin", ['0x3045dc5a495FbaC60816B98e0077D523e96086Bf', "ShareToken", "STK"]);

  await erc4626.waitForDeployment();

  console.log("ERC4626OpenZepplin deployed to:", await erc4626.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
