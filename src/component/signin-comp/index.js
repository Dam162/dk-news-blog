import React, { useState } from "react";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";

const SignInForm = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const providerfb = new FacebookAuthProvider();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [googleLoading, setGoogleLoading] = useState(false);
  const db = getFirestore();
  // show password
  const showPassword = () => {
    const password = document.getElementById("password");
    console.log("received");
    if (password.type === "password") {
      setPassword.type = "text";
    } else {
      setPassword.type = "password";
    }
  };

  // signInHandler
  const signInHandler = () => {
    if (email === "") {
      toast.error("Email required...!!!", {
        position: "top-right",
      });
    } else if (password === "") {
      toast.error("Password required...!!!", {
        position: "top-right",
      });
    } else {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setLoading(false);
          toast.success("Success...!!!", {
            position: "top-right",
          });
          const user = userCredential.user;
          if (user.emailVerified) {
            navigate("/");
          } else {
            navigate("/email-verification");
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage, {
            position: "top-right",
          });
        });
      const userData = {
        email: email,
      };
      console.log("userData", userData);
      setEmail("");
      setPassword("");
    }
  };
  //signInWithGoogleHandler
  const signInWithGoogleHandler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Signed in with google", user);
        const userData = onSnapshot(
          doc(db, "users", user.uid),
          async (userRes) => {
            console.log("Current data: ", userRes.data());
            if (!userRes.data()) {
              await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
              });
            }
            toast.success("Success...!!!", {
              position: "top-right",
            });
            navigate("/");
          }
        );
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage, {
          position: "top-right",
        });
        // console.log("couldn't Signed in with google");
      });
  };

  //signInWithFacebookHandler
  const signInWithFacebookHandler = () => {
    console.log("Facebook login");
    signInWithPopup(auth, providerfb)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        toast.error(errorMessage, {
          position: "top-right",
        });
      });
  };
  return (
    <div className="form-container sign-in-container">
      <div className="form">
        <h1>Sign in</h1>
        <div className="social-container">
          <a onClick={signInWithFacebookHandler} className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a onClick={signInWithGoogleHandler} className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div id="showPassword">
          <input
            type="checkbox"
            className="checkbox"
            onClick={() => showPassword()}
          />
          <label>Show Password</label>
        </div>

        <a href="#">Forgot your password?</a>
        <button onClick={signInHandler}>
          {loading ? (
            <CircularProgress style={{ color: "white" }} size={20} />
          ) : (
            "Sign In"
          )}
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
