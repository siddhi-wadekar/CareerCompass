import { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./ResumeBuilder.css";

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    degree: "",
    university: "",
    jobTitle: "",
    company: "",
    skills: "",
    summary: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateResume = () => {
    const { name, email, phone, address, linkedin, degree, university, summary } = formData;

    if (!name || !email || !phone || !address || !degree || !university || !summary) {
      alert("Please fill out all required fields.");
      return;
    }

    document.getElementById("resumeOutput").style.display = "block";
  };

  const downloadResume = () => {
    const element = document.getElementById("resumeOutput");
    if (!element) {
      alert("Please generate the resume first!");
      return;
    }

    html2canvas(element, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("resume.pdf");
      })
      .catch((error) => {
        alert("Error generating PDF: " + error.message);
      });
  };

  return (
    <div className="rb-container">
      <h1 className="rb-title">Resume Builder</h1>

      <div className="rb-form">
        {[
          { label: "Name*", name: "name" },
          { label: "Email*", name: "email", type: "email" },
          { label: "Phone*", name: "phone" },
          { label: "Address*", name: "address" },
          { label: "LinkedIn", name: "linkedin" },
          { label: "Degree*", name: "degree" },
          { label: "University*", name: "university" },
          { label: "Job Title", name: "jobTitle" },
          { label: "Company", name: "company" },
          { label: "Skills (comma separated)", name: "skills" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label>{label}:</label>
            <input type={type} name={name} value={formData[name]} onChange={handleChange} />
          </div>
        ))}

        <label>Summary*:</label>
        <textarea name="summary" value={formData.summary} onChange={handleChange}></textarea>

        <button onClick={generateResume} className="rb-generate-button">
          Generate Resume
        </button>
      </div>

      {/* Resume Preview */}
      <div id="resumeOutput" className="rb-output">
        <div className="resume">
          <div className="resume-header">
            <h2>{formData.name}</h2>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <p><strong>LinkedIn:</strong> {formData.linkedin ? <a href={formData.linkedin} target="_blank">{formData.linkedin}</a> : "N/A"}</p>
          </div>

          <div className="resume-section">
            <h3>Education</h3>
            <p><strong>Degree:</strong> {formData.degree}</p>
            <p><strong>University:</strong> {formData.university}</p>
          </div>

          <div className="resume-section">
            <h3>Work Experience</h3>
            <p><strong>Job Title:</strong> {formData.jobTitle || "N/A"}</p>
            <p><strong>Company:</strong> {formData.company || "N/A"}</p>
          </div>

          <div className="resume-section">
            <h3>Skills</h3>
            <div className="skills-container">
              {formData.skills ? formData.skills.split(",").map((skill, index) => <span key={index} className="skill-tag">{skill.trim()}</span>) : "N/A"}
            </div>
          </div>

          <div className="resume-section">
            <h3>Summary</h3>
            <p>{formData.summary}</p>
          </div>
        </div>
      </div>

      <button onClick={downloadResume} className="rb-download-button">
        Download Resume PDF
      </button>
    </div>
  );
}
