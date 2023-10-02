import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import * as React from 'react';
import { useEffect, useState } from "react";
import { Box, CardContent, Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget); //the button is clicked currently
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log("AnchorEl", anchorEl)
  }, [anchorEl])

  return (
    <Router>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ backgroundColor: '#94614B' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <IconButton
                  size="large"
                  edge="start"
                  color="white"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} to="/home" onClick={handleClose}>Home</MenuItem>
                  <MenuItem component={Link} to="/" onClick={handleClose}>Login</MenuItem>
                  <MenuItem component={Link} to="/register" onClick={handleClose}>Register</MenuItem>
                </Menu>
              </div>
              <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
                Test Case
              </Typography>
              <div sx={{ marginLeft: 'auto' }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  color="white"
                >
                  <AccountCircle />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
        <Routes>
          <Route exact path="/" element={<Login />} /> 
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;