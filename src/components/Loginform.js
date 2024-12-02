import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/login/loginSlice";
import {
  Button,
  TextField,
  Box,
  Typography,
  Tabs,
  Tab,
  Link,
  useTheme,
} from "@mui/material";

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const theme = useTheme(); // Access the current theme
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (email === "test@example.com" && password === "password") {
      dispatch(login({ email }));
      setMessage("Login successful!");
    } else {
      setMessage("Invalid email or password");
    }
  };

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage("Signup successful! You can now log in.");
      setIsLogin(true);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: theme.palette.background.paper, // Dynamically use paper background
        color: theme.palette.text.primary, // Dynamically use text color
      }}
    >
      <Tabs
        value={isLogin ? 0 : 1}
        onChange={(e, value) => setIsLogin(value === 0)}
        centered
        sx={{ mb: 2 }}
      >
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>

      {isLogin ? (
        <Box>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          {message && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {message}
            </Typography>
          )}
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" gutterBottom>
            Sign Up
          </Typography>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
          />
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleSignup}
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
          {message && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {message}
            </Typography>
          )}
          <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
            <Link
              to="/gallery"
              style={{ textDecoration: "none", color: theme.palette.primary.main }}
            >
              Go to Unsplash Gallery
            </Link>
          </Typography>
        </Box>
      )}
    </Box>
  );
}
