import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Constants } from "../utils/constants";
import API from "../utils/httpClient";

interface LoginModalProps {
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onLoginSuccess }) => {
  const modalRoot = document.getElementById("portal-root");
  const el = useRef(document.createElement("div"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    modalRoot?.appendChild(el.current);
    return () => {
      modalRoot?.removeChild(el.current);
    };
  }, []);

  const handleLogin = async () => {
    try {
      await API.post(Constants.LOGIN_ENDPOINT, { username, password });
      onLoginSuccess();
    } catch (e: any) {
      alert(e.error);
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await API.post(Constants.SIGNUP_ENDPOINT, { username, password });
    } catch (e: any) {
      alert(e.error);
      return;
    }
    // Placeholder logic for signup, you'd normally communicate with backend here
    alert("Signup successful");
    setIsSignup(false); // Switch back to login form after successful signup
  };

  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        {isSignup && (
          <div>
            <label>
              Confirm Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </div>
        )}
        <button onClick={isSignup ? handleSignup : handleLogin}>
          {isSignup ? "Sign Up" : "Login"}
        </button>
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => setIsSignup((prevState) => !prevState)}
        >
          {isSignup ? "Login" : "Create Account"}
        </button>
      </div>
    </div>,
    el.current
  );
};

export default LoginModal;
