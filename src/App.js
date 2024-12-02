import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Switch, FormControlLabel, Box, Typography } from "@mui/material";
import Loginform from "./components/Loginform";
import Cart from "./components/Cart";
import Gallery from "./components/Gallery";
import './App.css';
import './features/cart/Cart.css';

// Define light and dark themes
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#ffffff",
      paper: "#f4f6f8",
    },
    text: {
      primary: "#000000",
      secondary: "#4f4f4f",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#fffd85",
    },
  },
});

function App() {
  // Manage the theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme === "true";
  });

  // Synchronize theme with localStorage on changes
  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  // Toggle theme
  const handleThemeChange = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline /> {/* Reset styles based on the current theme */}
      <Router>
        <Box
          sx={{
            p: 2,
            textAlign: "center",
            borderBottom: `1px solid ${isDarkMode ? "#444" : "#ccc"}`,
            backgroundColor: isDarkMode ? "#1e1e1e" : "#f9f9f9",
          }}
        >
          {/* Light/Dark Mode Switch */}
          <FormControlLabel
            control={<Switch checked={isDarkMode} onChange={handleThemeChange} />}
            label={<Typography variant="body1">Dark Mode</Typography>}
          />

          {/* Navigation Links */}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: isDarkMode ? "#90caf9" : "#1976d2",
                fontWeight: "bold",
              }}
            >
              Home
            </Link>
            <Link
              to="/cart"
              style={{
                textDecoration: "none",
                color: isDarkMode ? "#90caf9" : "#1976d2",
                fontWeight: "bold",
              }}
            >
              Cart
            </Link>
            <Link
              to="/gallery"
              style={{
                textDecoration: "none",
                color: isDarkMode ? "#90caf9" : "#1976d2",
                fontWeight: "bold",
              }}
            >
              Gallery
            </Link>
          </Box>
        </Box>

        {/* Application Routes */}
        <Routes>
          <Route path="/" element={<Loginform />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
