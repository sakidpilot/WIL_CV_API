import React, { useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
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


  const handleLogout = () => {
    // Clear any stored tokens/user data
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    alert("Successful logout!");
    // Navigate to login page
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, We Feed SA is committed to finding you employment!</h1>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </header>
      
      <div className="cards-container">
        <div className="card">
          <h2>Create Your CV</h2>
          <p>Build your professional CV using our interactive form. Add your experience, skills, and more.</p>
          <div className="card-actions">
            <button 
              className="action-btn create-btn"
              onClick={() => navigate('/build-cv')}
            >
              <i className="fas fa-plus-circle"></i>
              Create My New CV
            </button>
          </div>
        </div>
      </div>

      <div className="cards-container">
        <div className="card">
          <h2>View your CV</h2>
          <p>View, and download your generated CV to upload to the Careers Portal.</p>
          <div className="card-actions">
            <button 
              className="action-btn view-btn"
              onClick={() => navigate('/view-cv')}
            >
              <i className="fas fa-eye"></i>
              Access My Current CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;