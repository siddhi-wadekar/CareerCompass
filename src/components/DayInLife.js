import React, { useState } from 'react';
import './DayInLife.css';

const simulationData = {
  "Software Engineer": [
    {
      question: "You have a tight deadline for a feature release. What do you do first?",
      options: {
        "Start coding immediately": "Risky move! Might lead to errors.",
        "Plan out tasks and divide them into sprints": "Great! This ensures efficiency."
      }
    },
    {
      question: "Your code review has major issues. How do you handle it?",
      options: {
        "Ignore and push the code": "Not a good practice. Bugs might appear.",
        "Fix issues and learn from mistakes": "Excellent! Learning is key."
      }
    },
    {
      question: "You have a team meeting. How do you prepare?",
      options: {
        "Ignore it and focus on coding": "Not ideal. Communication is key.",
        "Review progress and plan next steps": "Good! Keeps the team aligned."
      }
    },
    {
      question: "A production bug is reported. How do you react?",
      options: {
        "Panic and start fixing blindly": "Not the best approach! Debug systematically.",
        "Analyze logs and reproduce the issue": "Great! Logical debugging is crucial."
      }
    }
  ],
  "Doctor": [
    {
      question: "A patient has severe stomach pain. What do you do?",
      options: {
        "Order immediate tests": "Correct, but expensive.",
        "Give painkillers first and observe": "Risky! Could delay diagnosis."
      }
    },
    {
      question: "You have multiple emergency cases. How do you prioritize?",
      options: {
        "First come, first serve": "Not ideal. Some cases need urgent attention.",
        "Assess severity and act accordingly": "Good triage skills!"
      }
    },
    {
      question: "A patient refuses treatment. What do you do?",
      options: {
        "Respect their decision but educate them": "Good! Patients' rights matter.",
        "Force them to take treatment": "Unethical! Consent is important."
      }
    },
    {
      question: "You need to deliver bad news to a patient. How do you approach it?",
      options: {
        "Be blunt and direct": "Too harsh. Patients need empathy.",
        "Be compassionate and explain carefully": "Good! Communication matters."
      }
    }
  ],
  "UX Designer": [
    {
      question: "A client dislikes your UI design. What’s your approach?",
      options: {
        "Stick to your design and refuse changes": "Not great. Feedback matters!",
        "Iterate based on client needs": "Excellent! User needs come first."
      }
    },
    {
      question: "Your wireframes are rejected. What’s next?",
      options: {
        "Defend your choices stubbornly": "Not ideal. Collaboration is key.",
        "Discuss and improve iteratively": "Great approach!"
      }
    },
    {
      question: "Your design isn't accessible. What do you do?",
      options: {
        "Ignore it and continue": "Bad idea! Accessibility is crucial.",
        "Redesign to follow accessibility guidelines": "Great! Inclusive design matters."
      }
    },
    {
      question: "The development team struggles to implement your design. How do you help?",
      options: {
        "Ignore their concerns": "Not ideal. Cross-team collaboration is key.",
        "Work closely with them to simplify execution": "Good! Makes implementation smoother."
      }
    }
  ],
  "Teacher": [
    {
      question: "A student is struggling to understand a topic. What do you do?",
      options: {
        "Give them extra homework": "Might help but could add stress.",
        "Offer one-on-one guidance": "Great! Personalized support matters."
      }
    },
    {
      question: "You notice a student cheating during an exam. What’s your action?",
      options: {
        "Ignore it to avoid conflict": "Not responsible!",
        "Confront them and discuss consequences": "Good! Integrity is important."
      }
    },
    {
      question: "Your students seem disengaged. What do you do?",
      options: {
        "Continue with the same teaching method": "Not ideal. Adaptability is key.",
        "Try interactive and engaging techniques": "Great! Keeps students interested."
      }
    },
    {
      question: "A parent complains about their child’s grades. How do you respond?",
      options: {
        "Blame the student": "Not professional! Teaching is about guidance.",
        "Discuss the child's progress and improvement areas": "Good! Communication matters."
      }
    }
  ]
};

const careersList = Object.keys(simulationData);

function DayInLife() {
  const [career, setCareer] = useState('');
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState('');
  const [completed, setCompleted] = useState(false);

  // If no career is chosen, show career selection
  if (!career) {
    return (
      <div className="dayinlife-container">
        <h1 className="page-title">Career Simulator</h1>
        <p className="page-subtitle">Choose a career to begin your simulation</p>
        <div className="career-selection">
          {careersList.map((c, index) => (
            <button
              key={index}
              className="career-button"
              onClick={() => setCareer(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const currentScenario = simulationData[career][step];
  const options = Object.keys(currentScenario.options);
  const totalScenarios = simulationData[career].length;

  const handleOptionClick = (option) => {
    const feedback = currentScenario.options[option];
    setShowFeedback(feedback);
    if (feedback.includes("Great") || feedback.includes("Excellent") || feedback.includes("Good")) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNext = () => {
    if (step < totalScenarios - 1) {
      setStep(step + 1);
      setShowFeedback('');
    } else {
      setCompleted(true);
    }
  };

  const restartSimulation = () => {
    setCareer('');
    setStep(0);
    setScore(0);
    setShowFeedback('');
    setCompleted(false);
  };

  const progressPercentage = Math.round(((step + (showFeedback ? 1 : 0)) / totalScenarios) * 100);

  return (
    <div className="dayinlife-container">
      <h1 className="page-title">A Day in the Life of a {career}</h1>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      {!completed ? (
        <div className="simulation-card">
          <h2 className="scenario-question">{currentScenario.question}</h2>
          {!showFeedback ? (
            <div className="options-container">
              {options.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="feedback-container">
              <p className="feedback-text">{showFeedback}</p>
              <button className="next-button" onClick={handleNext}>
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="result-card">
          <h2 className="result-title">Your Simulation Score</h2>
          <p className="result-score">{score} / {totalScenarios}</p>
          <p className="result-message">
            {score === totalScenarios
              ? "Amazing! You handled the job really well."
              : score > totalScenarios / 2
              ? "Good job! Some decisions could be improved, but overall great performance."
              : "You might need to rethink your approach in this career!"}
          </p>
          <button className="restart-button" onClick={restartSimulation}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default DayInLife;
