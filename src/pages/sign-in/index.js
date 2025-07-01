// import * as React from "react";
// import "./index.css";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import googleIcon from "./../../images/logo_16509564.png";
// import facebookIcon from "./../../images/facebook.png";

// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
// import Button from "@mui/material/Button";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import IconButton from "@mui/material/IconButton";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import InputAdornment from "@mui/material/InputAdornment";
// import FormControl from "@mui/material/FormControl";
// import TextField from "@mui/material/TextField";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: (theme.vars ?? theme).palette.text.secondary,
//   ...theme.applyStyles("dark", {
//     backgroundColor: "#1A2027",
//   }),
// }));

// export default function SlotsSignIn() {
//   const [showPassword, setShowPassword] = React.useState(false);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleMouseUpPassword = (event) => {
//     event.preventDefault();
//   };
//   return (
//     <Box className="signIn-Box">
//       <Grid className="signIn-Grid" container spacing={3}>
//         <Grid className="signIn-Row-Grid grid-2">
//           <h1 style={{ textAlign: "center" }}>Login with</h1>
//           <div className="social-login">
//             <button className="social-button">
//               <img
//                 className="social-icon"
//                 src={googleIcon}
//                 alt="Google Logo"
//                 style={{ width: "20px", height: "20px", marginRight: "10px" }}
//               />
//               Sign in with Google
//             </button>
//             <button className="social-button">
//               <img
//                 className="social-icon"
//                 src={facebookIcon}
//                 alt="Facebook Logo"
//                 style={{ width: "20px", height: "20px", marginRight: "10px" }}
//               />
//               Sign in with Facebook
//             </button>
//           </div>
//           <p className="separator">
//             <span>or</span>
//           </p>
//           <TextField
//             style={{ marginTop: "15px" }}
//             id="outlined-basic"
//             label="Email Address"
//             variant="outlined"
//             sx={{ width: "100%" }}
//             slotProps={{
//               input: {
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <EmailOutlinedIcon />
//                   </InputAdornment>
//                 ),
//               },
//             }}
//           />
//           <FormControl
//             sx={{ width: "100%", marginTop: "15px" }}
//             variant="outlined"
//           >
//             <InputLabel htmlFor="outlined-adornment-password">
//               Password
//             </InputLabel>
//             <OutlinedInput
//               id="outlined-adornment-password"
//               type={showPassword ? "text" : "password"}
//               startAdornment={
//                 <InputAdornment position="start">
//                   <LockOutlinedIcon />
//                 </InputAdornment>
//               }
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label={
//                       showPassword
//                         ? "hide the password"
//                         : "display the password"
//                     }
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                     onMouseUp={handleMouseUpPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//               label="Password"
//             />
//           </FormControl>
//           <a className="forgot-Pass" href="#">
//             Forgot Password?
//           </a>

//           <Button style={{ width: "100%" }} variant="contained">
//             Login
//           </Button>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

import * as React from "react";
import "./index.css";
import googleIcon from "./../../images/logo_16509564.png";
import facebookIcon from "./../../images/facebook.png";

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
        </Grid>
      </Grid>
    </Box>
  );
}
