const mongoose = require("mongoose");

const CVSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: "User",
    required: true,
  },
  cvData: {
    type: Object,
    required: true,
  },
  generatedPDF: {
    type: Buffer, // To store PDF binary data
    required: false,
  },
});

module.exports = mongoose.model("CV", CVSchema);
