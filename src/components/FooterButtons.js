import React from "react";
import { Button, Box } from "@mui/material";

function FooterButtons({ onSubmit, onDiscard }) {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 267,
        right: 0,
        backgroundColor: "white",
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Button variant="outlined" color="secondary" onClick={onDiscard}>
        Discard & Next
      </Button>
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Submit
      </Button>
    </Box>
  );
}

export default FooterButtons;
