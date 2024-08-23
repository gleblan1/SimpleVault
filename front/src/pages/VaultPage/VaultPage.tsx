import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useClasses } from "./VaultPage.style";
import colors from "@theme/colors";
import { getConfig } from "@helpers/getConfig";
import { ethers } from "ethers";
import Kama from '../../assets/kama.png'
import Pula from '../../assets/pula.png'

export function VaultPage() {
  const { classes } = useClasses();
  const [balance, setBalance] = useState(0);
  const [withdraw, setWithdraw] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [redeem, setRedeem] = useState(0);

  useEffect(() => {
    getConfig().then(async (config) => {
      try {
        const balance = await config.erc4626.contract
          .connect(config.erc4626.signer)
          .totalAssets();
        console.log(balance);
        setBalance(Number(balance) ? Number(balance) : 0);
      } catch (e) {
        console.error("Error fetching balance:", e);
      }
    });
  }, []);

  function depositHandler(){
    console.log(deposit)
    getConfig().then(async (config) => {
      console.log(await config.erc4626.signer.getAddress())
      await config.erc4626.contract.connect(config.erc4626.signer).deposit(ethers.parseEther(String(deposit)), await config.erc4626.signer.getAddress())
    })
  }

  function withdrawHandler(){
    getConfig().then(async (config) => {
      await config.erc4626.contract.connect(config.erc4626.signer).withdraw(ethers.parseEther(String(withdraw)), await config.erc4626.signer.getAddress(), await config.erc4626.signer.getAddress())
    })
  }

  function redeemHandler(){
    getConfig().then(async (config) => {
      await config.erc4626.contract.connect(config.erc4626.signer).redeem(ethers.parseEther(String(redeem)), await config.erc4626.signer.getAddress(), await config.erc4626.signer.getAddress())
    })
  }

  function withdrawChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setWithdraw(Number(e.target.value));
  }

  function depositChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setDeposit(Number(e.target.value));
  }

  function redeemChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setRedeem(Number(e.target.value));
  }

  return (
    <Box className={classes.container}>
      <Typography
        variant="h3"
        color={"secondary"}
        sx={{ width: "100vw", height: "8vh", borderBottom: `1px solid ${colors.primary}` }}
      >
        &nbsp;&nbsp;Vault Page
      </Typography>
      <Stack direction={"row"} gap={3} justifyContent={"start"} sx={{ width: "90vw", position: "relative", top: "10vh" }}>
        <Stack justifyContent={"center"} spacing={3}>
          <TextField
            id="outlined-number"
            label="Assets"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={withdrawChangeHandler}
          />
          <Button variant="outlined" color="primary" onClick={withdrawHandler}>Withdraw</Button>
        </Stack>
        <Stack justifyContent={"center"} spacing={3}>
          <TextField
            id="outlined-number"
            label="Assets"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={depositChangeHandler}
          />
          <Button variant="outlined" color="primary" onClick={depositHandler}>Deposit</Button>
        </Stack>
        <Stack justifyContent={"center"} spacing={3}>
          <TextField
            id="outlined-number"
            label="Shares"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={redeemChangeHandler}
          />
          <Button variant="outlined" color="primary" onClick={redeemHandler}>Redeem</Button>
        </Stack>
        <Typography variant="h3">Vault balance: {balance} TKN</Typography>
        <Box sx={{width:'50%', height:'80vh' , backgroundImage: `url(${Pula})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', position: 'absolute', right: 10, top: -150}}></Box>
      </Stack>
      <Box sx={{width: '60%', height:'60vh' , backgroundImage: `url(${Kama})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', position: 'absolute', right: 750, top: 450}}></Box>
    </Box>
  );
}
