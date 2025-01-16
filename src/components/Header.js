import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
function Header() {
  const deleteAllAnswers = async () => {
    try {
      await axios.delete(`${process.env.URL}/api/category/delete`);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SelfAssess™
          </Typography>
          <Button color="inherit" onClick={() => deleteAllAnswers()}>
            Retake
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
