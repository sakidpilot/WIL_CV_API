import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";
import { useNavigate, Link} from 'react-router-dom'; 

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://wil-cv-builder.azurewebsites.net/api/auth/register", formData);
      alert("User registered successfully!");
      navigate('/')
    } catch (error) {
      alert(error.response.data.message || "Error registering user.");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
        <button type="submit">Sign Up</button>
        <p className="signup-text">
        Go back to Login?{" "}
        <Link to="/" className="signup-link">
          Login
        </Link>
      </p>
      </form>
    </div>
  );
};

export default SignUp;
