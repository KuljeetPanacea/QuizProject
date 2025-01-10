import React from "react";
import { Snackbar, Alert } from "@mui/material";

function SnackbarNotification({ open, message, onClose }) {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity={message.includes("Error") ? "error" : "success"}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarNotification;
