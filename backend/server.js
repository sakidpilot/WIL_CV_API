const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const path = require('path');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cors({ origin: 'https://wil-cv-builder.azurewebsites.net' }));

app.use("/auth", require("./routes/authRoutes")); ///api
app.use("/cv", require("./routes/cvRoutes"));  ///api

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//"proxy":"http://localhost:5000/api",
