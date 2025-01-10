import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Typography } from "@mui/material";

export default function Sidebar({ topics, currentTopic, onSelectTopic }) {
  return (
    <Box
    sx={{ maxWidth: 400, padding: "20px", boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)" }}

    >
      <Stepper activeStep={currentTopic} orientation="vertical">
        {topics.map((topic, index) => (
          <Step key={topic.name}>
            <StepLabel
              onClick={() => onSelectTopic(index)}
              sx={{ cursor: "pointer" }}
            >
              {topic.completed ? (
                <Typography variant="body2" color="green">
                  ✓ {topic.name}
                </Typography>
              ) : (
                <Typography variant="body2">{topic.name}</Typography>
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
