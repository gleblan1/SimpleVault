import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useClasses } from "./WelcomePage.style";
import { useNavigate } from "react-router-dom";

export function WelcomePage() {
    const {classes} = useClasses();
    const navigate = useNavigate();
    const mintToken = () => {
        navigate('/mint-page')
     };
    return <Box className={classes.container}>
        <Typography variant="h1" color={"secondary"}>Welcome to the vault</Typography>
        <Box sx={{display: "flex", justifyContent: "center"}}>
        </Box>
    </Box>;
}