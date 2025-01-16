import React from "react";
import { Box, Button } from "@mui/material";
 
const CalculatorComponent = ({ onBack }) => {
  return (
    <Box sx={{ flex: 1, height: "100%", padding: "10px" }}>
      <iframe
        src="https://calculator.carbonfootprint.com/calculator.aspx"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Carbon Footprint Calculator"
      ></iframe>
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
         
          onClick={onBack} // Triggers the onBack function passed from parent
        >
          ← Back to Questions
        </Button>
      </Box>
    </Box>
  );
};
 
export default CalculatorComponent;
 