import React, { useState, useRef } from "react";
import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { materialLightTheme } from "@theme/material-theme";
import { GlobalStyle } from "@theme/global-style";
import Explosion from '@assets/explosion.gif';

function App() {
  const [imagePosition, setImagePosition] = useState(null);
  const [imageKey, setImageKey] = useState(0);

  const handleClick = (e) => {
    const { clientX, clientY } = e;

    setImagePosition({
      x: clientX,
      y: clientY,
    });

    setImageKey(prevKey => prevKey + 1);

    setTimeout(() => {
      setImagePosition(null);
    }, 200);
  };

  return (
    <ThemeProvider theme={materialLightTheme}>
      <GlobalStyle />
      <div onClick={handleClick} style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <RouterProvider router={router} />
        {imagePosition && (
          <>
            <img
              key={imageKey}
              src={`${Explosion}?${imageKey}`}
              alt="Temporary"
              style={{
                position: "absolute",
                top: imagePosition.y,
                left: imagePosition.x,
                transform: "translate(-50%, -50%)",
                width: "50px",
                height: "50px",
                pointerEvents: "none",
              }}
            />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
