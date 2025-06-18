import React, { useState, useEffect } from "react";
import "./RoadmapBuilder.css"; 

const data = {
  "Hotel Management": {
      interests: ["Culinary Arts", "Front Office Management", "Hospitality Marketing"],
      careers: {
          "Culinary Arts": ["Executive Chef", "Sous Chef", "Pastry Chef"],
          "Front Office Management": ["Front Office Manager", "Guest Relations Executive"],
          "Hospitality Marketing": ["Marketing Manager", "Brand Strategist"]
      }
  },
  "Pharmacy": {
      interests: ["Clinical Pharmacy", "Pharmaceutical Research", "Community Pharmacy"],
      careers: {
          "Clinical Pharmacy": ["Clinical Pharmacist", "Drug Safety Associate"],
          "Pharmaceutical Research": ["Research Scientist", "Pharmacovigilance Expert"],
          "Community Pharmacy": ["Retail Pharmacist", "Pharmacy Manager"]
      }
  },
  "Engineering": {
      interests: ["Web Development", "AI/ML", "Cybersecurity", "Cloud Computing"],
      careers: {
          "Web Development": ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
          "AI/ML": ["Machine Learning Engineer", "AI Research Scientist"],
          "Cybersecurity": ["Security Analyst", "Penetration Tester"],
          "Cloud Computing": ["Cloud Solutions Architect", "DevOps Engineer"]
      }
  },
"Polytechnic": {
      interests: ["Mechanical Engineering", "Civil Engineering", "Electrical Engineering"],
      careers: {
          "Mechanical Engineering": ["Machine Design Engineer", "Production Supervisor"],
          "Civil Engineering": ["Site Engineer", "Structural Analyst"],
          "Electrical Engineering": ["Electrical Technician", "Power System Engineer"]
      }
  },

"PhD": {
      interests: ["Data Science Research", "Theoretical Physics", "Biomedical Studies"],
      careers: {
          "Data Science Research": ["Research Scientist", "Data Science Professor"],
          "Theoretical Physics": ["Physics Researcher", "Academic Lecturer"],
          "Biomedical Studies": ["Biomedical Researcher", "Clinical Trials Manager"]
      }
  }
};



const roadmapData = {
  "Frontend Developer": [
      { "title": "Learn HTML, CSS, JS", "description": "Understand frontend basics.", "link": "/pages/frontend_html_css_js.html" },
      { "title": "Master Frameworks", "description": "Learn React, Angular, or Vue.js.", "link": "/pages/frontend_frameworks.html" },
      { "title": "Build Projects", "description": "Create real-world projects.", "link": "/pages/frontend_projects.html" }
  ],
  "Backend Developer": [
      { "title": "Learn Server-Side Technologies", "description": "Understand Node.js, Django, or Flask.", "link": "/pages/backend_server_side.html" },
      { "title": "Work with Databases", "description": "Learn SQL and NoSQL.", "link": "/pages/backend_databases.html" },
      { "title": "Develop Full Projects", "description": "Deploy backend applications.", "link": "/pages/backend_projects.html" }
  ],

  "Full Stack Developer": [
          {"title": "Learn Backend Development", "description": "Master backend technologies like Node.js, Django, or Flask.", "link": "/pages/fullstack_backend.html"},
          {"title": "Learn Databases", "description": "Understand SQL and NoSQL databases.", "link": "/pages/fullsatck_databases.html"},
          {"title": "Develop Full Projects", "description": "Build and deploy full-stack applications.", "link": "/pages/fullstack_projects.html"}
      ],

      "Machine Learning Engineer": [
          {"title": "Learn Python", "description": "Start with Python programming fundamentals.", "link": "/pages/ml_python.html"},
          {"title": "Understand ML Algorithms", "description": "Study regression, classification, and deep learning.", "link": "/pages/ml_algorithm.html"},
          {"title": "Work on ML Projects", "description": "Implement ML models on real-world datasets.", "link": "/pages/ml_projects.html"}
      ],

      "AI Research Scientist": [
          {"title": "Study AI Fundamentals", "description": "Understand AI concepts and applications.", "link": "/pages/ai_fundamentals.html"},
          {"title": "Master Neural Networks", "description": "Learn about CNNs, RNNs, and GANs.", "link": "/pages/ai_neural_networks.html"},
          {"title": "Develop AI Models", "description": "Work on AI projects and research papers.", "link": "/pages/ai_projects.html"}
      ],
      "Security Analyst": [
          {"title": "Learn Cybersecurity Basics", "description": "Understand security threats and vulnerabilities.", "link": "/pages/cybersecurity_basics.html"},
          {"title": "Master Ethical Hacking", "description": "Learn penetration testing and security tools.", "link": "/pages/cybersecurity_ethical_hacking.html"},
          {"title": "Work on Security Projects", "description": "Implement security measures in real-world scenarios.", "link": "/pages/cybersecurity_projects.html"}
      ],

      "Penetration Tester": [ 
          {"title": "Understand Penetration Testing", "description": "Learn about network and web application testing.", "link": "/pages/penetration_testing.html"},
          {"title": "Master Security Tools", "description": "Work with tools like Metasploit and Burp Suite.", "link": "/pages/penetration_tools.html"},
          {"title": "Perform Security Audits", "description": "Conduct security assessments and audits.", "link": "/pages/penetration_audits.html"}
      ],
      

      "Cloud Solutions Architect": [
          {"title": "Learn Cloud Computing Basics", "description": "Understand cloud service models and deployment.", "link": "/pages/cloud_basics.html"},
          {"title": "Master Cloud Platforms", "description": "Work with AWS, Azure, or Google Cloud.", "link": "/pages/loud_platforms.html"},
          {"title": "Design Cloud Solutions", "description": "Architect scalable and secure cloud applications.", "link": "/pages/cloud_solutions.html"}
      ],

      "DevOps Engineer": [
          {"title": "Understand DevOps Principles", "description": "Learn about CI/CD, automation, and monitoring.", "link": "/pages/devops_principles.html"},
          {"title": "Master DevOps Tools", "description": "Work with Docker, Kubernetes, and Jenkins.", "link": "/pages/devops_tools.html"},
          {"title": "Implement DevOps Practices", "description": "Deploy and manage applications using DevOps.", "link": "/pages/devops_practices.html"}
      ],



      // Hotel Management Domain
      "Executive Chef": [
          {"title": "Learn Basic Cooking Techniques", "description": "Understand grilling, roasting, and frying.", "link": "/pages/chef_basic_cooking.html"},
          {"title": "Master Advanced Culinary Skills", "description": "Techniques like sous vide and molecular gastronomy.", "link": "/pages/chef_advanced_cooking.html"},
          {"title": "Gain Industry Experience", "description": "Work in top hotels and restaurants.", "link": "/pages/chef_experience.html"}
      ],
      "Sous Chef": [
          {"title": "Learn Kitchen Management", "description": "Understand food safety and hygiene.", "link": "/pages/sous_chef_management.html"},
          {"title": "Master Recipe Development", "description": "Create unique dishes and menus.", "link": "/pages/sous_chef_recipes.html"}
      ],
      "Pastry Chef": [
          {"title": "Study Baking and Pastry Arts", "description": "Learn about breads, cakes, and desserts.", "link": "/pages/pastry_baking.html"},
          {"title": "Master Chocolate and Sugar Art", "description": "Create intricate chocolate and sugar decorations.", "link": "/pages/pastry_art.html"}
      ],


      "Front Office Manager": [
          {"title": "Understand Guest Services", "description": "Learn customer interaction essentials.", "link": "/pages/front_office_guest_services.html"},
          {"title": "Master Hotel Reservation Systems", "description": "Work with industry-standard booking software.", "link": "/pages/front_office_reservations.html"}
      ],
      "Guest Relations Executive": [
          {"title": "Learn Communication Skills", "description": "Understand guest interaction and problem-solving.", "link": "/pages/guest_relations_communication.html"},
          {"title": "Master Conflict Resolution", "description": "Handle guest complaints and feedback.", "link": "/pages/guest_relations_resolution.html"}
      ],
      "Marketing Manager": [
          {"title": "Learn Digital Marketing", "description": "Master SEO, SEM, and social media marketing.", "link": "/pages/marketing_digital.html"},
          {"title": "Develop Brand Strategies", "description": "Understand hotel branding techniques.", "link": "/pages/marketing_branding.html"}
      ],
      "Brand Strategist": [
          {"title": "Study Market Research", "description": "Analyze industry trends and customer preferences.", "link": "/pages/brand_research.html"},
          {"title": "Master Advertising Campaigns", "description": "Create promotional strategies and ads.", "link": "/pages/brand_advertising.html"}
      ],

      // Pharmacy Domain
      "Clinical Pharmacist": [
          {"title": "Study Pharmaceutical Sciences", "description": "Learn about drug interactions and safety.", "link": "/pages/pharma_sciences.html"},
          {"title": "Gain Practical Experience", "description": "Work in hospital pharmacies.", "link": "/pages/pharma_experience.html"}
      ],
      "Drug Safety Associate": [
          {"title": "Understand Pharmacovigilance", "description": "Learn drug safety monitoring and reporting.", "link": "/pages/pharma_vigilance.html"},
          {"title": "Master Regulatory Compliance", "description": "Work with FDA and EMA guidelines.", "link": "/pages/pharma_regulations.html"}
      ],
      "Pharmacovigilance Expert": [
          {"title": "Study Drug Safety Protocols", "description": "Understand adverse event reporting and analysis.", "link": "/pages/pharma_protocols.html"},
          {"title": "Master Risk Management", "description": "Develop risk mitigation strategies.", "link": "/pages/pharma_risk_management.html"}
      ],
      "Research Scientist": [
          {"title": "Master Laboratory Techniques", "description": "Get familiar with research methodologies.", "link": "/pages/pharma_lab_techniques.html"},
          {"title": "Develop New Drugs", "description": "Work on pharmaceutical innovation.", "link": "/pages/pharma_drug_development.html"}
      ],
      "Retail Pharmacist": [
          {"title": "Understand Pharmacy Operations", "description": "Learn about dispensing and inventory management.", "link": "/pages/pharma_operations.html"},
          {"title": "Master Patient Counseling", "description": "Provide medication information and advice.", "link": "/pages/pharma_counseling.html"}
      ],
      "Pharmacy Manager": [
          {"title": "Study Business Management", "description": "Understand pharmacy financials and regulations.", "link": "/pages/pharma_management.html"},
          {"title": "Manage Pharmacy Operations", "description": "Oversee staff, inventory, and customer service.", "link": "/pages/pharma_operations.html"}
      ],

      // Polytechnic Domain
      "Machine Design Engineer": [
          {"title": "Learn Mechanical Drawing", "description": "Understand engineering drawing standards.", "link": "/pages/poly_mechanical_drawing.html"},
          {"title": "Master CAD Software", "description": "Work with AutoCAD, SolidWorks, etc.", "link": "/pages/poly_cad_design.html"}
      ],
      "Production Supervisor": [
          {"title": "Understand Manufacturing Processes", "description": "Learn about machining, casting, and molding.", "link": "poly_manufacturing.html"},
          {"title": "Master Quality Control", "description": "Implement quality standards and inspections.", "link": "/pages/poly_quality_control.html"}
      ],
      "Site Engineer": [
          {"title": "Study Construction Management", "description": "Understand project planning and execution.", "link": "/pages/poly_construction_management.html"},
          {"title": "Master Structural Analysis", "description": "Analyze building structures and materials.", "link": "/pages/poly_structural_analysis.html"}
      ],
      "Structural Analyst": [
          {"title": "Learn Finite Element Analysis", "description": "Understand FEA software and simulations.", "link": "/pages/poly_fea_analysis.html"},
          {"title": "Master Structural Design", "description": "Design buildings and bridges.", "link": "/pages/poly_structural_design.html"}
      ],
      "Electrical Technician": [
          {"title": "Understand Circuit Design", "description": "Learn how to build and analyze circuits.", "link": "/pages/poly_circuit_design.html"},
          {"title": "Gain Hands-on Experience", "description": "Work on live projects and prototypes.", "link": "/pages/poly_hands_on.html"}
      ],
      "Power System Engineer": [
          {"title": "Study Electrical Networks", "description": "Understand power distribution and transmission.", "link": "/pages/poly_power_networks.html"},
          {"title": "Master Renewable Energy", "description": "Work on solar, wind, and hydroelectric projects.", "link": "/pages/poly_renewable_energy.html"}
      ],

      // PhD Domain
      "Data Science Researcher": [
          {"title": "Learn Data Analysis", "description": "Understand data processing techniques.", "link": "/pages/phd_data_analysis.html"},
          {"title": "Master Machine Learning", "description": "Use ML for scientific research.", "link": "/pages/phd_ml_research.html"}
      ], 
      "Theoretical Physicist": [
          {"title": "Study Quantum Mechanics", "description": "Understand quantum theory and applications.", "link": "/pages/phd_quantum_mechanics.html"},
          {"title": "Master Astrophysics", "description": "Explore the mysteries of the universe.", "link": "/pages/phd_astrophysics.html"}
      ],
      "Biomedical Researcher": [
          {"title": "Learn Medical Biology", "description": "Understand human anatomy and physiology.", "link": "/pages/phd_medical_biology.html"},
          {"title": "Master Disease Research", "description": "Work on cures and treatments for illnesses.", "link": "/pages/phd_disease_research.html"}
      ],
      "Clinical Trials Manager": [
          {"title": "Understand Clinical Research", "description": "Learn about drug trials and patient studies.", "link": "phd_clinical_research.html"},
          {"title": "Master Regulatory Compliance", "description": "Work with FDA and EMA guidelines.", "link": "phd_regulatory_compliance.html"}
  ],
  "Data Science Professor": [
      {"title": "Study Data Science Fundamentals", "description": "Understand data analysis and visualization.", "link": "ds_fundamentals.html"},
      {"title": "Master Research Methodologies", "description": "Learn statistical analysis and hypothesis testing.", "link": "ds_research_methods.html"}
  ],
  "Physics Researcher": [
      {"title": "Study Advanced Physics", "description": "Explore quantum mechanics and relativity.", "link": "physics_advanced.html"},
      {"title": "Master Experimental Physics", "description": "Work on cutting-edge research projects.", "link": "physics_experimental.html"}
  ],
  "Biomedical Researcher": [
      {"title": "Learn Medical Biology", "description": "Understand human anatomy and physiology.", "link": "biomed_biology.html"},
      {"title": "Master Disease Research", "description": "Work on cures and treatments for illnesses.", "link": "biomed_disease.html"}
  ],
  "Clinical Trials Manager": [
      {"title": "Understand Clinical Research", "description": "Learn about drug trials and patient studies.", "link": "clinical_trials.html"},
      {"title": "Master Regulatory Compliance", "description": "Work with FDA and EMA guidelines.", "link": "clinical_regulatory.html"}
  ],
};




const RoadmapBuilder = () => {
  const [domain, setDomain] = useState("");
  const [interest, setInterest] = useState("");
  const [career, setCareer] = useState("");
  const [roadmap, setRoadmap] = useState([]);

  const updateInterests = (selectedDomain) => {
    setDomain(selectedDomain);
    setInterest("");
    setCareer("");
    setRoadmap([]);
  };

  const updateCareerPaths = (selectedInterest) => {
    setInterest(selectedInterest);
    setCareer("");
    setRoadmap([]);
  };

  const generateRoadmap = (selectedCareer) => {
    console.log("Selected Career:", selectedCareer);
    console.log("Roadmap Data Found:", roadmapData[selectedCareer]);
    setCareer(selectedCareer);
    setRoadmap(roadmapData[selectedCareer] || []);
  };

  useEffect(() => {
    console.log("Updated Roadmap:", roadmap);
  }, [roadmap]);

  return (
    <div className="container">
      <h1>Career Roadmap Generator</h1>
      <div className="selection-area">
        <div className="select-group">
          <label>Select Domain</label>
          <select value={domain} onChange={(e) => updateInterests(e.target.value)}>
            <option value="">Choose a domain</option>
            {Object.keys(data).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        <div className="select-group">
          <label>Select Interest</label>
          <select value={interest} onChange={(e) => updateCareerPaths(e.target.value)} disabled={!domain}>
            <option value="">Choose an interest</option>
            {domain && data[domain].interests.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="select-group">
          <label>Select Career Path</label>
          <select value={career} onChange={(e) => generateRoadmap(e.target.value)} disabled={!interest}>
            <option value="">Choose a career path</option>
            {interest && data[domain].careers[interest].map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <h2>Your Career Roadmap</h2>
      <div id="roadmap">
        {roadmap.length > 0 ? (
          roadmap.map((step, index) => (
            <div key={index} className="step">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <a href={step.link} target="_blank" rel="noopener noreferrer">Learn More</a>
            </div>
          ))
        ) : (
          <p>No roadmap available. Please select a career.</p>
        )}
      </div>
    </div>
  );
};

export default RoadmapBuilder;
