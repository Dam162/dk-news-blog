import * as React from "react";
import "./index.css";
import googleIcon from "./../../images/logo_16509564.png";
import facebookIcon from "./../../images/facebook (1).png";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function SlotsSignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  return (
    <Box className="signIn-box">
      <Grid container className="signIn-container">
        <Grid item xs={12} sm={8} md={6} lg={4} className="signIn-card">
          <h1 className="signIn-title">LOGIN WITH</h1>

          <div className="social-login">
            <button className="social-button">
              <img className="social-icon" src={googleIcon} alt="Google" />
              Sign in with Google
            </button>
            <button className="social-button">
              <img className="social-icon" src={facebookIcon} alt="Facebook" />
              Sign in with Facebook
            </button>
          </div>

          <p className="separator">
            <span>or</span>
          </p>

          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            className="signIn-input"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          <FormControl
            style={{ marginTop: "15px" }}
            fullWidth
            variant="outlined"
            className="signIn-input"
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <a className="forgot-pass" href="#">
            Forgot Password?
          </a>

          <Button variant="contained" fullWidth className="login-button">
            Login
          </Button>
          <span className="no-Account">
            Don't have account? <a onClick={()=>navigate("/sign-up")}>Sign Up</a>
          </span>
        </Grid>
      </Grid>
    </Box>
  );
}
