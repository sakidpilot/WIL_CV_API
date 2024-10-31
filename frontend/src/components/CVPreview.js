import React, {useState, useEffect } from "react";
import axios from "axios";
import "./CVPreview.css";
import { useNavigate } from 'react-router-dom';

const CVPreview = () => {
  const [cvData, setCvData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, redirecting to login');
        navigate('/');
        return;
      }
    };

    validateToken();

    fetchPreview();

  }, [navigate]);

  const fetchPreview = async () => {
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("uid");
    console.log(uid);
    try {
      const response = await axios.get(`https://wil-cv-builder.azurewebsites.net/api/cv/preview-cv/${uid}`, {
        headers: { Authorization: `Bearer ${token}` }, 
        responseType: "arraybuffer", // To handle PDF response
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setCvData(url);
    } catch (error) {
      alert("Please go to create my CV first, as you currently do not have one!");
      navigate('/build-cv');
    }
  };

  

  const handleClickBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="cv-preview-container">
      <div>
      <div className="button-container">
      <button 
        className="nav-button"
        onClick={handleClickBack}
      >
        <span className="button-text">Home</span>
        <span className="button-icon">→</span>
      </button>
    </div>
      <h2>CV Preview</h2>
      {cvData ? (
        <iframe src={cvData} title="CV Preview" className="cv-preview-frame"></iframe>
      ) : (
        <p>Loading preview...</p>
      )}
      </div>
    </div>
    
  );
};

export default CVPreview;
