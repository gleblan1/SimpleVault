import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ERC4626, ERC4626__factory } from "../typechain-types";

describe("ERC4626", function() {
  async function dep() {
    const [ deployer ] = await ethers.getSigners();

    const ERC20 = await ethers.deployContract("MyToken", [deployer.address]);

    const contract = await ethers.deployContract("ERC4626", [ERC20.getAddress(), "TestToken", "TST"]);
    await contract.waitForDeployment();

    return { contract, deployer, ERC20 };
  };

  it('asset', async function() {
    const { contract, ERC20 } = await loadFixture(dep);
    const asset = contract.asset();
    expect(await asset).to.equal(await ERC20.getAddress());
  });

  it('deposit', async function() {
    const { contract, ERC20, deployer } = await loadFixture(dep);
    await ERC20.mint(deployer.address, 1n);
    await ERC20.approve(await contract.getAddress(), 1n);
    await contract.deposit(1n, deployer.address);

    expect(await contract.totalAssets()).to.equal(1n);
  })

  it('mint', async function(){
    const { contract, ERC20, deployer } = await loadFixture(dep);
    await ERC20.mint(deployer.address, 1n);
    await ERC20.approve(await contract.getAddress(), 1n);
    await contract.mint(1n, deployer.address);
    expect(await contract.totalAssets()).to.equal(1n);
  })

  it('withdraw', async function(){
    const { contract, ERC20, deployer } = await loadFixture(dep);
    await ERC20.mint(deployer.address, 1n);
    await ERC20.approve(await contract.getAddress(), 2n);
    await contract.deposit(1n, deployer.address);
    await contract.withdraw(1n, deployer.address, deployer.address);
    await contract.mint(1n, deployer.address);
    await contract.withdraw(1n, deployer.address, deployer.address);
    expect(await contract.totalAssets()).to.equal(0n);
  })

  it('redeem', async function(){
    const { contract, ERC20, deployer } = await loadFixture(dep);
    await ERC20.mint(deployer.address, 1n);
    await ERC20.approve(await contract.getAddress(), 1n);
    await contract.mint(1n, deployer.address);
    await contract.redeem(1n, deployer.address, deployer.address);
    expect(await contract.totalAssets()).to.equal(0n);
  })

})