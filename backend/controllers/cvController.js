const CV = require("../models/CV");
const pdf = require("pdfkit"); // For PDF generation

const saveCV = async (req, res) => {
  const { cvData, uid } = req.body;
  console.log("Entered req user email ", uid);
  try {
    const existingCV = await CV.findOne({ uid });
    console.log("User found");
    if (existingCV) {
      existingCV.cvData = cvData;
      await existingCV.save();
    } else {
      await CV.create({ user: uid, cvData });
    }

    res.status(200).json({ message: "CV saved successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* Controller (getCV.js)
const getCV = async (req, res) => {
  const { uid } = req.params;
  console.log("Fetching cv for " + uid);
  try {
    const cv = await CV.findOne({ user: uid });
    if (!cv) {
      return res.status(404).json({ message: "No CV found" });
    }
    console.log(cv)
    res.status(200).json(cv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};*/

const previewCV = async (req, res) => {
  const { uid } = req.params;
  console.log("CV req for ", uid);
  try {
    const cv = await CV.findOne({ user: uid });
    if (!cv) return res.status(404).json({ message: "No CV found" });

    const doc = new pdf();
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => {
      const result = Buffer.concat(chunks);
      res.contentType("application/pdf");
      res.send(result);
    });

    // Define professional color scheme
    const colors = {
      primary: '#464f59',
      secondary: '#fdf5e6',
      text: '#333333',
      lightText: '#666666',
      accent: '#848484'
    };

    // Enhanced styling with professional colors
    const styles = {
      header: { fontSize: 14, color: colors.primary },
      sectionHeader: { fontSize: 13, color: colors.primary },
      subHeader: { fontSize: 12, color: colors.text },
      normal: { fontSize: 11, color: colors.text },
      small: { fontSize: 10, color: colors.lightText }
    };

    // Set page margins
    const margin = 50;
    doc.page.margins = {
      top: margin,
      bottom: margin,
      left: margin + 20,
      right: margin + 20
    };

    // Helper functions
    const addSection = (title) => {
      doc.moveDown(0.5);
      doc.fontSize(styles.sectionHeader.fontSize)
         .fillColor(styles.sectionHeader.color)
         .font('Helvetica-Bold')
         .text(title.toUpperCase())
         .moveDown(0.5);
    };

    const addDivider = () => {
      doc.moveDown(0.5)
         .lineWidth(1)
         .lineCap('round')
         .moveTo(margin + 20, doc.y)
         .lineTo(doc.page.width - margin - 20, doc.y)
         .stroke(colors.accent)
         .moveDown(0.5);
    };

    // Header Section
    doc.fontSize(styles.header.fontSize)
       .fillColor(styles.header.color)
       .font('Helvetica-Bold')
       .text(cv.cvData.personalInfo.fullName, {
         align: 'center'
       })
       .moveDown(0.2);

    // Contact Information
    doc.moveDown(1);
    doc.fontSize(styles.normal.fontSize)
       .fillColor(styles.text)
       .font('Helvetica');

    if (cv.cvData.personalInfo.email) {
        doc.text(`Email: ${cv.cvData.personalInfo.email}`, {
            align: 'center'
        });
    }
    if (cv.cvData.personalInfo.phone) {
        doc.text(`Phone: ${cv.cvData.personalInfo.phone}`, {
            align: 'center'
        });
    }
    if (cv.cvData.personalInfo.address) {
        doc.text(`Location: ${cv.cvData.personalInfo.address}`, {
            align: 'center'
        });
    }

    // Social Links Section
    if (Object.values(cv.cvData.socialLinks).some(link => link)) {
      addSection('Professional Links');
      
      const { linkedin, github, twitter, portfolio } = cv.cvData.socialLinks;
      if (linkedin) doc.text(`LinkedIn: ${linkedin}`);
      if (github) doc.text(`Instagram: ${github}`);
      if (twitter) doc.text(`Twitter: ${twitter}`);
      if (portfolio) doc.text(`Portfolio: ${portfolio}`);
      
      addDivider();
    }

    // Professional Summary
    if (cv.cvData.personalInfo.summary) {
      addSection('Professional Summary');
      doc.fontSize(styles.normal.fontSize)
         .fillColor(styles.text)
         .font('Helvetica')
         .text(cv.cvData.personalInfo.summary, {
           align: 'justify'
         });
      addDivider();
    }

    // Experience Section
    if (cv.cvData.experience && cv.cvData.experience.length > 0) {
      addSection('Professional Experience');
      
      cv.cvData.experience.forEach((exp, index) => {
        doc.fontSize(styles.subHeader.fontSize)
           .fillColor(styles.text)
           .font('Helvetica-Bold')
           .text(exp.company)
           .moveDown(0.2);

        doc.fontSize(styles.normal.fontSize)
           .fillColor(styles.lightText)
           .font('Helvetica')
           .text(`${exp.position} | ${exp.startMonth} - ${exp.endMonth}`)
           .moveDown(0.3);

        if (exp.description) {
          const tasks = exp.description.split('\n');
          tasks.forEach(task => {
            if (task.trim()) {
              doc.fontSize(styles.normal.fontSize)
                 .fillColor(styles.text)
                 .font('Helvetica')
                 .text(`• ${task.trim()}`, {
                   indent: 15
                 });
            }
          });
        }

        if (index < cv.cvData.experience.length - 1) {
          doc.moveDown(1);
        }
      });
      
      addDivider();
    }

    // Skills Section
    if (cv.cvData.skills && cv.cvData.skills.length > 0) {
      addSection('Technical Skills');
      
      cv.cvData.skills.forEach(skill => {
        if (skill.trim()) {
          doc.fontSize(styles.normal.fontSize)
             .fillColor(styles.text)
             .font('Helvetica')
             .text(`• ${skill.trim()}`, {
               indent: 15
             });
        }
      });
      
      addDivider();
    }

    // Education Section
    if (cv.cvData.education && cv.cvData.education.length > 0) {
      addSection('Education');
      
      cv.cvData.education.forEach((edu, index) => {
        if (edu.institution) {
          doc.fontSize(styles.subHeader.fontSize)
             .fillColor(styles.text)
             .font('Helvetica-Bold')
             .text(edu.institution)
             .moveDown(0.2);

          doc.fontSize(styles.normal.fontSize)
             .fillColor(styles.lightText)
             .font('Helvetica')
             .text(`${edu.degree} | ${edu.startYear} - ${edu.endYear}`)
             .moveDown(0.2);

          if (edu.description) {
            doc.fontSize(styles.normal.fontSize)
               .fillColor(styles.text)
               .font('Helvetica')
               .text(edu.description, {
                 align: 'justify'
               });
          }

          if (index < cv.cvData.education.length - 1) {
            doc.moveDown(1);
          }
        }
      });
      
      addDivider();
    }

    // Languages Section
    if (cv.cvData.languages && cv.cvData.languages.length > 0) {
      addSection('Languages');
      cv.cvData.languages.forEach(language => {
        if (language.trim()) {
          doc.fontSize(styles.normal.fontSize)
             .fillColor(styles.text)
             .font('Helvetica')
             .text(`• ${language.trim()}`, {
               indent: 15
             });
        }
      });
    }

    // Simple footer with page number
    doc.fontSize(styles.small.fontSize)
       .fillColor(styles.lightText)
       .text(
         'Page 1',
         0,
         doc.page.height - margin,
         { align: 'center' }
       );

    doc.end();
  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).json({ message: err.message });
  }
};


module.exports = { saveCV,  previewCV }; //getCV,
