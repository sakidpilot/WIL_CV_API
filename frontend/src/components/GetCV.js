import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GetCV.css";

const GetCV = () => {
  const [cv, setCv] = useState(null);

  const fetchCV = async () => {
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("uid");
    try {
      const response = await axios.get("/cv/get-cv", {
        headers: { Authorization: `Bearer ${token}` },
        uid,
      });
      setCv(response.data);
    } catch (error) {
      alert("Error fetching CV.");
    }
  };

  const downloadCV = async () => {
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("uid");
    try {
      const response = await axios.get("/cv/download-cv", {
        headers: { Authorization: `Bearer ${token}` },
        uid,
        responseType: "blob", // This ensures the response is treated as a file
      });

      // Create a download link for the file
      const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "MyCV.pdf"); // Filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert("Error downloading CV.");
    }
  };

  useEffect(() => {
    fetchCV();
  }, []);

  return (
    <div className="get-cv-container">
      <h2>Your CV</h2>
      {cv ? (
        <div>
          <pre>{JSON.stringify(cv.cvData, null, 2)}</pre>
          <button onClick={downloadCV} className="download-btn">
            Download CV
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GetCV;


