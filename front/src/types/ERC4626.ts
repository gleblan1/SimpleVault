import { ethers } from "ethers"
import { ERC4626 } from "@contract-data/typechain-types"

export type ConfigERC4626 ={
  contract: ERC4626,
  provider: ethers.BrowserProvider,
  signer: ethers.Signer,
  address: string
}