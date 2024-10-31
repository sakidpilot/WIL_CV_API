// components/CVForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CVForm.css";
import { useNavigate } from 'react-router-dom';

const CVForm = () => {
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
  }, [navigate]);



  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      summary: "",
    },
    education: [],
    experience: [],
    skills: [],
    languages: [],
    socialLinks: {
      linkedin: "",
      github: "",
      twitter: "",
      portfolio: "",
    },
  });

  const addField = (type) => {
    setCvData((prev) => ({
      ...prev,
      [type]: [...prev[type], {}],
    }));
  };

  const handleChange = (e, type, index, key) => {
    const updated = [...cvData[type]];
    updated[index][key] = e.target.value;
    setCvData({ ...cvData, [type]: updated });
  };

  const handleArrayChange = (e, type, index) => {
    const updated = [...cvData[type] ];
    updated[index] = e.target.value;
    setCvData({ ...cvData, [type]: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("uid");

    try {
      await axios.post("https://wil-cv-builder.azurewebsites.net/api/cv/save-cv", { uid, cvData }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("CV saved and PDF generated!");
      navigate('/dashboard')
    } catch (error) {
      alert("Error saving CV.");
    }
  };

  const handleClickBack = () => {
    navigate('/dashboard');
  };

 
  return (
    <form onSubmit={handleSubmit}>
      <button 
        className="nav-button"
        onClick={handleClickBack}
      >
        <span className="button-text">Home</span>
        <span className="button-icon">→</span>
      </button>
      <h1>Please fill out all your information below to start generating your CV:</h1>
      <h3>Personal Information</h3>
      <input
        type="text"
        placeholder="Full Name"
        value={cvData.personalInfo.fullName}
        onChange={(e) =>
          setCvData({
            ...cvData,
            personalInfo: { ...cvData.personalInfo, fullName: e.target.value },
          })
        }
      />
      <input
        type="email"
        placeholder="Email"
        value={cvData.personalInfo.email}
        onChange={(e) =>
          setCvData({
            ...cvData,
            personalInfo: { ...cvData.personalInfo, email: e.target.value },
          })
        }
      />
      <input
        type="text"
        placeholder="Phone"
        value={cvData.personalInfo.phone}
        onChange={(e) =>
          setCvData({
            ...cvData,
            personalInfo: { ...cvData.personalInfo, phone: e.target.value },
          })
        }
      />
      <textarea
        placeholder="Summary"
        value={cvData.personalInfo.summary}
        onChange={(e) =>
          setCvData({
            ...cvData,
            personalInfo: { ...cvData.personalInfo, summary: e.target.value },
          })
        }
      />

      <h3>Education</h3>
      {cvData.education.map((edu, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Institution, College, School, Trade School"
            value={edu.institution || ""}
            onChange={(e) => handleChange(e, "education", index, "institution")}
          />
          <input
            type="text"
            placeholder="Degree"
            value={edu.degree || ""}
            onChange={(e) => handleChange(e, "education", index, "degree")}
          />
          <input
            type="text"
            placeholder="Start Year"
            value={edu.startYear || ""}
            onChange={(e) => handleChange(e, "education", index, "startYear")}
          />
          <input
            type="text"
            placeholder="End Year"
            value={edu.endYear || ""}
            onChange={(e) => handleChange(e, "education", index, "endYear")}
          />
          <textarea
            placeholder="Description"
            value={edu.description || ""}
            onChange={(e) =>
              handleChange(e, "education", index, "description")
            }
          />
        </div>
      ))}
      <button type="button" onClick={() => addField("education")}>
        Add Education
      </button>

      <h3>Work Experience</h3>
      {cvData.experience.map((exp, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Company"
            value={exp.company || ""}
            onChange={(e) => handleChange(e, "experience", index, "company")}
          />
          <input
            type="text"
            placeholder="Position"
            value={exp.position || ""}
            onChange={(e) => handleChange(e, "experience", index, "position")}
          />
          <input
            type="text"
            placeholder="Start Date  DD/MM/YYYY"
            value={exp.startMonth || ""}
            onChange={(e) =>
              handleChange(e, "experience", index, "startMonth")
            }
          />
          <input
            type="text"
            placeholder="End Date  DD/MM/YYYY"
            value={exp.endMonth || ""}
            onChange={(e) => handleChange(e, "experience", index, "endMonth")}
          />
          <textarea
            placeholder="Description"
            value={exp.description || ""}
            onChange={(e) =>
              handleChange(e, "experience", index, "description")
            }
          />
        </div>
      ))}
      <button type="button" onClick={() => addField("experience")}>
        Add Experience
      </button>

      <h3>Skills</h3>
      {cvData.skills.map((skill, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Skill"
            value={skill || ""}
            onChange={(e) => handleArrayChange(e, "skills", index)}
          />
        </div>
      ))}
      <button type="button" onClick={() => addField("skills")}>
        Add Skill
      </button>

      <h3>Languages</h3>
      {cvData.languages.map((language, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Language"
            value={language || ""}
            onChange={(e) => handleArrayChange(e, "languages", index)}
          />
        </div>
      ))}
      <button type="button" onClick={() => addField("languages")}>
        Add Language
      </button>

      <h3>Social Links</h3>
      <input
        type="text"
        placeholder="LinkedIn"
        value={cvData.socialLinks.linkedin}
        onChange={(e) =>
          setCvData({
            ...cvData,
            socialLinks: { ...cvData.socialLinks, linkedin: e.target.value },
          })
        }
      />
      <input
        type="text"
        placeholder="Instagram"
        value={cvData.socialLinks.github}
        onChange={(e) =>
          setCvData({
            ...cvData,
            socialLinks: { ...cvData.socialLinks, github: e.target.value },
          })
        }
      />
      <input
        type="text"
        placeholder="Twitter"
        value={cvData.socialLinks.twitter}
        onChange={(e) =>
          setCvData({
            ...cvData,
            socialLinks: { ...cvData.socialLinks, twitter: e.target.value },
          })
        }
      />
      <input
        type="text"
        placeholder="Portfolio"
        value={cvData.socialLinks.portfolio}
        onChange={(e) =>
          setCvData({
            ...cvData,
            socialLinks: { ...cvData.socialLinks, portfolio: e.target.value },
          })
        }
      />
      <button type="submit">Save CV</button>
     
    </form>
  );
};

export default CVForm;
