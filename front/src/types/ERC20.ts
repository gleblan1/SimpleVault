import { ethers } from "ethers"
import { MyToken } from "@contract-data/typechain-types"

export type ConfigERC20 ={
  contract: MyToken,
  provider: ethers.BrowserProvider,
  signer: ethers.Signer,
  address: string
}