# CV Generator Application  

## Overview  
The CV Generator application is a MERN stack project designed to help users create professional CVs easily. The application allows users to sign up, log in, and log out securely. Once logged in, users can fill out a comprehensive form to input their personal and professional details, including:  
- Personal particulars  
- Summary statement  
- Education  (multiple entries supported) 
- Work experience (multiple entries supported)  
- Skills  (multiple entries supported) 
- Languages spoken  (multiple entries supported) 
- Social media links  

The application dynamically generates a formatted CV in PDF format using **PDFKit** on the backend. Users can preview and download their CV for personal use. This project was developed with a focus on accessibility and usability, particularly for users who may not have access to professional CV creation tools.  

## Features  
- **User Authentication**: Secure sign-up, login, and logout functionalities using JSON Web Tokens (JWT).  
- **Dynamic Form Handling**: Users can add multiple entries for sections like education and work experience.  
- **CV Generation**: Back-end functionality to format and generate a professional CV in PDF format.  
- **Secure Access**: Only authenticated users can access CV generation features.  
- **Responsive Design**: A user-friendly frontend built with React ensures accessibility across devices.  
- **CI/CD Pipeline**: Continuous Integration and Continuous Deployment (CI/CD) set up using Azure and GitHub Actions.  
- **Code Analysis**: SonarQube integrated for code quality analysis and reporting.  

---

## Tech Stack  

### Frontend  
- **React.js**  
  - Handles user interface and state management.  
  - Securely manages JWT tokens for session handling.  
  - Responsive design for accessibility across devices.  

### Backend  
- **Node.js** and **Express.js**  
  - Serves API endpoints for user authentication, data submission, and CV generation.  
  - Middleware enforces security for protected routes.  
- **PDFKit**  
  - Used to dynamically create formatted PDF CVs.  

### Database  
- **MongoDB**  
  - Stores user data and CV entries in a document-oriented format.  

### Security  
- **Authentication**: JWT tokens are used to secure routes and validate user sessions.  
- **Authorization**: Backend middleware checks for valid tokens before granting access to protected endpoints.  
- **Environment Variables**: Secrets like database credentials and JWT keys are securely stored in environment variables.  

---

## Routes  

### Backend API Endpoints  
#### Auth Routes  
- `POST /auth/register`: Register a new user.  
- `POST /auth/login`: Authenticate an existing user and issue a JWT.  
- `POST /auth/logout`: Log out a user and invalidate the token.  

#### CV Routes  
- `POST /cv/save-cv`: Submit user CV details to MongoDB (authenticated route).  
- `GET /cv/preview-cv/:uid`: Retrieve the saved CV details (authenticated route).  
- `GET /cv/preview-cv/:uid`: Generate and download a PDF version of the CV (authenticated route).  

### Frontend Routes  
- `/register`: User registration page.  
- `/login`: User login page.  
- `/dashboard`: Main page for creating and managing CVs (protected).  

---

## Deployment  

### Frontend  
The React app is hosted on **Azure App Service**, ensuring high availability and scalability.  

### Backend  
The Node.js server is also deployed on Azure, with a robust CI/CD pipeline set up to automate testing and deployment.  

### CI/CD  
- **GitHub Actions**: Automated builds, testing, and deployment configured for both frontend and backend.  
- **SonarQube**: Static code analysis integrated to ensure code quality and maintainability.  

---

## How to Run Locally  

### Prerequisites  
- Node.js  
- MongoDB  
- Azure CLI (optional for deployment)  

### Installation  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/sakidpilot/WIL_CV_API.git
   cd cv-generator  
   ```  
2. Install dependencies for the backend:  
   ```bash  
   cd backend  
   npm install  
   ```  
3. Install dependencies for the frontend:  
   ```bash  
   cd ../frontend  
   npm install  
   ```  

### Running the Application  
1. Start MongoDB locally or connect to a cloud database.  
2. Add environment variables to the `.env` file in the backend folder (e.g., `MONGO_URI`, `JWT_SECRET`).  
3. Start the backend:  
   ```bash  
   cd backend  
   npm start  
   ```  
4. Start the frontend:  
   ```bash  
   cd ../frontend  
   npm start  
   ```  

The application will be accessible at `http://localhost:3000` (frontend) and `http://localhost:5000` (backend).  Or you can proxy the frontend to the backend. 

---

## Future Improvements  
- **Localization**: Adding multi-language support for users.  
- **Enhanced Templates**: Providing users with multiple CV templates to choose from.  
- **AI Assistance**: Integrating AI to suggest content improvements for CVs.  

This project is a functional and scalable tool to help bridge the employment gap in South Africa, empowering individuals with limited access to professional resources.
