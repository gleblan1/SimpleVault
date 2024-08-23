import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useClasses } from "./TokensPage.style";
import colors from "@theme/colors";
import { getConfig } from "@helpers/getConfig";
import { ethers } from "ethers";

export function TokensPage() {

  const {classes} = useClasses();
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getConfig().then(async (config) => {
      const balance = await config.erc20.contract.connect(config.erc20.signer).balanceOf( await config.erc20.signer.getAddress())
      setBalance(Number(balance)/1000000000000000000)
    })
  })

  function mintToken() {
    getConfig().then(async (config) => {
      await config.erc20.contract.connect(config.erc20.signer).mint(await config.erc20.signer.getAddress(), ethers.parseEther(String(amount)))
    })
  }

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    setAmount(Number(e.target.value))
  }

  return <Box className={classes.container}>
      <Typography variant="h3" color={"secondary"} sx={{width: "100vw", height:'8vh', borderBottom: `1px solid ${colors.primary}`}}>&nbsp;&nbsp;Tokens Page</Typography>
      <Stack direction={"row"} gap={3} justifyContent={"start"} sx={{width: '90vw'}}>
        <Stack justifyContent={"center"} spacing={3}>
          <TextField
              id="outlined-number"
              label="Tokens"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeHandler(e)}
          />
          <Button variant="outlined" color="primary" onClick={mintToken}>Mint</Button>
        </Stack>
        <Typography variant="h4">Your balance: {balance} ETH</Typography>
      </Stack>
  </Box>;
}