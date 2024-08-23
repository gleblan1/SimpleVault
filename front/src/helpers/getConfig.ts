import { ethers } from "ethers";
import * as abiERC20 from '@contract-data/ERC20/MyToken.json';
import * as abiERC4626 from '@contract-data/ERC4626/ERC4626OpenZepplin.json'
import { ERC4626, MyToken } from '@contract-data/typechain-types';
import { Config } from "@types/config";
import {ConfigERC20} from '@types/ERC20'
import { ConfigERC4626 } from "@types/ERC4626";


export async function getConfig(): Promise<Config> {
  const ERC20 = new ethers.Contract(
    "0x3045dc5a495FbaC60816B98e0077D523e96086Bf",
    abiERC20.abiERC20
  ) as unknown as MyToken;

  const providerERC20 = new ethers.BrowserProvider((window as any).ethereum);
  const signerERC20 = await providerERC20.getSigner();
  const addressERC20 = await signerERC20.getAddress();

  const erc20Contract: ConfigERC20 = {
    contract: ERC20,
    provider: providerERC20,
    signer: signerERC20,
    address: addressERC20
  }
  
  const ERC4626 = new ethers.Contract(
    "0xb8d585a3DF60B34E2E1604baEbEBF533CD970E43",
    abiERC4626.abiERC4626
  ) as unknown as ERC4626;

  const providerERC4626 = new ethers.BrowserProvider((window as any).ethereum);
  const signerERC4626 = await providerERC4626.getSigner();
  const addressERC4626 = await signerERC4626.getAddress();

  const erc4626Contract: ConfigERC4626 = {
    contract: ERC4626,
    provider: providerERC4626,
    signer: signerERC4626,
    address: addressERC4626
  }

  const config: Config = {
    erc20: erc20Contract,
    erc4626: erc4626Contract
  }

  return config
}