import React, { useState } from 'react';
import './CareerGuide.css';

// Data mimicking the career recommendations from the Python code.
const careerPaths = {
  "Art & Design": [
    {
      title: "Graphic Designer",
      description: "Creates visual content for digital and print media",
      skills_required: ["creativity", "technical skills", "attention to detail"],
      education: "Bachelor's in Design"
    },
    {
      title: "UI/UX Designer",
      description: "Designs user interfaces and experiences for digital products",
      skills_required: ["creativity", "user empathy", "technical skills"],
      education: "Bachelor's in Design or HCI"
    },
    {
      title: "Animator",
      description: "Creates animated content for various media",
      skills_required: ["creativity", "technical skills", "storytelling"],
      education: "Bachelor's in Animation"
    },
    {
      title: "Photographer",
      description: "Captures and edits professional photographs",
      skills_required: ["creativity", "technical skills", "artistic eye"],
      education: "Photography certification"
    },
  ],
  "Science & Medicine": [
    {
      title: "Medical Researcher",
      description: "Conducts research to advance medical knowledge",
      skills_required: ["analytical skills", "attention to detail", "research"],
      education: "Ph.D. in Medical Science"
    },
    {
      title: "Doctor",
      description: "Diagnoses and treats patients",
      skills_required: ["medical knowledge", "communication", "problem-solving"],
      education: "M.D."
    },
    {
      title: "Pharmacist",
      description: "Dispenses medication and provides healthcare advice",
      skills_required: ["attention to detail", "chemistry knowledge", "communication"],
      education: "Pharm.D."
    },
    {
      title: "Biomedical Engineer",
      description: "Develops medical devices and solutions",
      skills_required: ["technical skills", "problem-solving", "innovation"],
      education: "Bachelor's in Biomedical Engineering"
    },
  ],
  "Technology & Engineering": [
    {
      title: "Software Engineer",
      description: "Develops software applications and systems",
      skills_required: ["programming", "problem-solving", "analytical thinking"],
      education: "Bachelor's in Computer Science"
    },
    {
      title: "Data Scientist",
      description: "Analyzes complex data to derive insights",
      skills_required: ["statistics", "programming", "analytical thinking"],
      education: "Master's in Data Science"
    },
    {
      title: "DevOps Engineer",
      description: "Manages development and deployment processes",
      skills_required: ["systems knowledge", "automation", "problem-solving"],
      education: "Bachelor's in Computer Science"
    },
    {
      title: "Cloud Architect",
      description: "Designs and manages cloud infrastructure",
      skills_required: ["systems design", "security", "technical skills"],
      education: "Bachelor's in Computer Science"
    },
  ]
};

// Added an extra question to the initial set
const initialQuestions = [
  {
    id: 'excitement',
    question: "What excites you the most?",
    options: [
      { answer: "Creative expression", value: "Creative expression" },
      { answer: "Scientific discovery", value: "Scientific discovery" },
      { answer: "Problem-solving", value: "Problem-solving" },
    ],
  },
  {
    id: 'personality',
    question: "Which best describes your personality?",
    options: [
      { answer: "Creative & imaginative", value: "Creative & imaginative" },
      { answer: "Analytical & logical", value: "Analytical & logical" },
      { answer: "Practical & hands-on", value: "Practical & hands-on" },
    ],
  },
  {
    id: 'motivation',
    question: "What motivates you the most at work?",
    options: [
      { answer: "Innovation and creativity", value: "innovation" },
      { answer: "Solving complex problems", value: "problems" },
      { answer: "Helping people", value: "helping" },
    ],
  },
];

// Mimic the Python mapping logic for field selection.
const mapField = (answers) => {
  if (
    answers.excitement === "Creative expression" &&
    answers.personality === "Creative & imaginative"
  ) {
    return "Art & Design";
  } else if (
    answers.excitement === "Scientific discovery" &&
    answers.personality === "Analytical & logical"
  ) {
    return "Science & Medicine";
  } else if (
    answers.excitement === "Problem-solving" &&
    answers.personality === "Practical & hands-on"
  ) {
    return "Technology & Engineering";
  }
  // Default fallback based on the extra question motivation if needed.
  return answers.motivation === "innovation" ? "Art & Design" : "Technology & Engineering";
};

// Mimic field-specific question logic.
const getFieldSpecificQuestion = (field) => {
  const questions = {
    "Art & Design": {
      question: "Do you prefer visual art or performance?",
      options: ["Visual", "Performance"]
    },
    "Science & Medicine": {
      question: "Do you enjoy research or patient interaction?",
      options: ["Research", "Patient Interaction"]
    },
    "Technology & Engineering": {
      question: "Do you prefer frontend or backend development?",
      options: ["Frontend", "Backend"]
    }
  };
  return questions[field] || { question: "No specific question for this field", options: [] };
};

// Mimic recommendations logic based on field-specific answer.
const recommendCareers = (field, fieldSpecificAnswer) => {
  const careers = careerPaths[field] || [];
  if (field === "Art & Design") {
    return fieldSpecificAnswer === "Visual"
      ? careers.filter(career => ["Graphic Designer", "UI/UX Designer"].includes(career.title))
      : careers.filter(career => ["Animator", "Photographer"].includes(career.title));
  } else if (field === "Science & Medicine") {
    return fieldSpecificAnswer === "Research"
      ? careers.filter(career => ["Medical Researcher", "Biomedical Engineer"].includes(career.title))
      : careers.filter(career => ["Doctor", "Pharmacist"].includes(career.title));
  }
  // For Technology & Engineering, simply return the first two careers as an example.
  return careers.slice(0, 2);
};

const CareerGuide = () => {
  // Stages: initial, fieldQuestion, results
  const [stage, setStage] = useState('initial');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [field, setField] = useState('');
  const [fieldQuestionData, setFieldQuestionData] = useState({ question: '', options: [] });
  const [results, setResults] = useState([]);

  const handleInitialAnswer = (optionValue) => {
    const currentQuestion = initialQuestions[currentQuestionIndex];
    const newAnswers = { ...answers, [currentQuestion.id]: optionValue };
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < initialQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // After all initial questions are answered, determine the field and ask the field-specific question.
      const mappedField = mapField(newAnswers);
      setField(mappedField);
      setFieldQuestionData(getFieldSpecificQuestion(mappedField));
      setStage('fieldQuestion');
    }
  };

  const handleFieldAnswer = (optionValue) => {
    // Get recommendations based on field and field-specific answer.
    const recommended = recommendCareers(field, optionValue);
    setResults(recommended);
    setStage('results');
  };

  const resetQuiz = () => {
    setStage('initial');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setField('');
    setFieldQuestionData({ question: '', options: [] });
    setResults([]);
  };

  // Total number of steps: initialQuestions.length + 1 field-specific question
  const totalSteps = initialQuestions.length + 1;
  let currentStep = stage === 'initial' ? currentQuestionIndex : initialQuestions.length;
  if (stage === 'results') {
    currentStep = totalSteps;
  }
  const progressWidth = (currentStep / totalSteps) * 100;

  return (
    <div className="career-guide">
      <h1 style={{ color: "#1B2455" }}>Career Guider Quiz</h1>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progressWidth}%` }}></div>
      </div>

      {stage === 'initial' && (
        <div className="quiz-container">
          <h2>{initialQuestions[currentQuestionIndex].question}</h2>
          <div className="options">
            {initialQuestions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => handleInitialAnswer(option.value)}
              >
                {option.answer}
              </button>
            ))}
          </div>
        </div>
      )}

      {stage === 'fieldQuestion' && (
        <div className="quiz-container">
          <h2>{fieldQuestionData.question}</h2>
          <div className="options">
            {fieldQuestionData.options.length > 0 ? (
              fieldQuestionData.options.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  onClick={() => handleFieldAnswer(option)}
                >
                  {option}
                </button>
              ))
            ) : (
              <button className="option-button" onClick={() => handleFieldAnswer("")}>
                See Recommendations
              </button>
            )}
          </div>
        </div>
      )}

      {stage === 'results' && (
        <div className="result-container">
          <h2>Your Suggested Career Paths:</h2>
          {results.length > 0 ? (
            <ul className="career-list">
              {results.map((career, index) => (
                <li key={index}>
                  <h3>{career.title}</h3>
                  <p>{career.description}</p>
                  <p>
                    <strong>Skills Required:</strong> {career.skills_required.join(', ')}
                  </p>
                  <p>
                    <strong>Education:</strong> {career.education}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No careers match your preferences. Please try different options.</p>
          )}
          <button className="reset-button" onClick={resetQuiz}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default CareerGuide;
