import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import SignUp from "./components/SignUp.js";
import CVPreview from "./components/CVPreview.js";
//import GetCV from "./components/GetCV.js";
import CVForm from "./components/CVForm.js";
import Dashboard from './components/Dashboard.js';

const App = () => {
  //const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login /*setToken={setToken}*/ />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/view-cv" element={<CVPreview />} />
       {/* <Route path="/get-cv" element={<GetCV />} />*/}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/build-cv" element={<CVForm />} />
      </Routes>
    </Router>
  );
};

export default App;
