import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { getFirestore, doc, setDoc, Firestore } from "firebase/firestore";

const SignUpForm = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // sign up handler
  const signUpHandler = async () => {
    if (name === "") {
      toast.error("Name required...!!!", {
        position: "top-right",
      });
    } else if (email === "") {
      toast.error("Email. required...!!!", {
        position: "top-right",
      });
    } else if (password === "") {
      toast.error("Password required...!!!", {
        position: "top-right",
      });
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          sendEmailVerification(auth.currentUser).then(async () => {
            await setDoc(doc(db, "users", user.uid), {
              name: name,
              email: email,
            });
            toast.success("Success...!!!", {
              position: "top-right",
            });
            setLoading(false);
            const userData = {
              name: name,
              email: email,
            };
            console.log("User Data : -", user);
            navigate("/email-verification");
          });
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage, {
            position: "top-right",
          });
          setLoading(false);
        });
      setName("");
      setEmail("");
      setPassword("");
    }
  };
  // show passwrod handler
  const showPassword = () => {
    const password = document.getElementById("password");
    console.log("received");
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };

  return (
    <div className="form-container sign-up-container">
      <div className="form">
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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
        <button onClick={() => signUpHandler()}>
          {loading ? (
            <CircularProgress style={{ color: "white" }} size={20} />
          ) : (
            "Sign Up"
          )}{" "}
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
