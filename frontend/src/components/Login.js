import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom'; 
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Data being sent:', email, password);
      const response = await axios.post("https://wil-cv-builder.azurewebsites.net/api/auth/login", {
        email,
        password,
      });
    
      // Access token from response.data
      const token = response.data.token;
    
      if (!token) {
        throw new Error("Token not received from server");
      }
    
      // Save token to localStorage and update state
      localStorage.setItem("token", token);
      localStorage.setItem("uid", response.data.uid);
      console.log(token + " - Login successful! :", response.data.uid); // Log the token for debugging
      //alert("Successful login!");
      navigate('/dashboard')

      //setToken(token);
      //alert("Login successful!");
    } catch (error) {
      // Handle errors gracefully
      const message = error.response?.data?.message || "An unexpected error occurred";
      alert("Incorrect credentials, please try again!");
      //alert(message);
    }
  };


  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p className="signup-text">
        Don't have an account?{" "}
        <Link to="/signup" className="signup-link">
          Sign up
        </Link>
      </p>
      </form>
    </div>
  );
};

export default Login;
