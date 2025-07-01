import * as React from "react";
import "./index.css";
import googleIcon from "./../../images/logo_16509564.png";
import facebookIcon from "./../../images/facebook.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
export default function SlotsSignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  return (
    <Box className="signUp-box">
      <Grid container className="signUp-container">
        <Grid item xs={12} sm={8} md={6} lg={4} className="signUp-card">
          <h1 className="signUp-title">SIGN UP</h1>
          <div>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              type="text"
              className="signUp-input"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleOutlinedIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              style={{ marginTop: "15px" }}
              label="Email Address"
              variant="outlined"
              fullWidth
              type="email"
              className="signUp-input"
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
          </div>
          <FormControl
            style={{ marginTop: "15px" }}
            fullWidth
            variant="outlined"
            className="signUp-input"
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

          <Button
            style={{ marginTop: "15px" }}
            variant="contained"
            fullWidth
            className="signUp-button"
          >
            Sign Up
          </Button>
          <span className="no-Account">
            Already have account!{" "}
            <a onClick={() => navigate("sign-in")}>Login</a>
          </span>
        </Grid>
      </Grid>
    </Box>
  );
}
