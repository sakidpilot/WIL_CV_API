const express = require("express");
const { saveCV, previewCV } = require("../controllers/cvController.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js"); // Add a JWT protect middleware
const router = express.Router();



router.post("/save-cv", authMiddleware, saveCV);

router.get("/preview-cv/:uid", authMiddleware,  previewCV);


module.exports = router;


