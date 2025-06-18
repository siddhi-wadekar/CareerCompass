import { useState, useEffect } from "react";
import "./InterviewAssistance.css";

// Pool of 20 questions
const questionPool = [
  "Tell me about yourself.",
  "What are your greatest strengths?",
  "What are your weaknesses?",
  "Why do you want to work for our company?",
  "Where do you see yourself in five years?",
  "Why did you leave your last job?",
  "Describe a challenging situation and how you overcame it.",
  "How do you handle stress and pressure?",
  "What motivates you?",
  "What is your greatest professional achievement?",
  "How do you handle criticism?",
  "Describe your ideal work environment.",
  "How do you prioritize your work?",
  "What role do you usually take on in a team?",
  "How do you handle tight deadlines?",
  "What makes you unique?",
  "How do you stay organized?",
  "What do you do when you disagree with a colleague?",
  "How do you approach problem solving?",
  "What are your career goals?"
];

// Function to randomly pick 5 unique questions from the pool
const pickRandomQuestions = (pool, count = 5) => {
  const copy = [...pool];
  const selected = [];
  while (selected.length < count && copy.length) {
    const index = Math.floor(Math.random() * copy.length);
    selected.push(copy[index]);
    copy.splice(index, 1);
  }
  return selected;
};

export default function InterviewAssistance() {
  // Selected 5 questions (generated only once on component mount)
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const selected = pickRandomQuestions(questionPool, 5);
    setQuestions(selected);
  }, []);

  // Simulated feedback generation based on answer length
  const simulateFeedback = (q, a) => {
    if (a.trim().length === 0) {
      return "Please provide an answer.";
    }
    if (a.trim().length > 20) {
      return "Great answer! You provided enough detail.";
    }
    return "Your answer is a bit short. Try to provide more detail.";
  };

  const handleSubmit = () => {
    setFeedback("Evaluating...");
    setTimeout(() => {
      const simulatedFeedback = simulateFeedback(questions[currentQIndex], answer);
      setFeedback(simulatedFeedback);
    }, 1000);
  };

  const handleNext = () => {
    // Save the answer and feedback for current question
    setAnswers([
      ...answers,
      { question: questions[currentQIndex], answer, feedback }
    ]);
    // Reset answer and feedback for next question
    setAnswer("");
    setFeedback("");
    // Move to next question or finish simulation
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="ia-container">
      {!completed ? (
        <div className="quiz-container">
          <h2 className="ia-title">AI Interview Assistant</h2>
          <div className="question-card">
            <h3 className="ia-question">
              Question {currentQIndex + 1}: {questions[currentQIndex]}
            </h3>
            <label className="ia-label">Your Answer:</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="ia-textarea"
            ></textarea>
            <button onClick={handleSubmit} className="ia-submit-button">
              Submit Answer
            </button>
            {feedback && (
              <div className="feedback-section">
                <p className="ia-feedback-box">{feedback}</p>
                <button onClick={handleNext} className="ia-next-button">
                  Next Question
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="result-container">
          <h2 className="ia-title">Simulation Completed</h2>
          <h3 className="ia-feedback-title">Your Answers & Feedback</h3>
          <div className="results-list">
            {answers.map((item, index) => (
              <div key={index} className="result-item">
                <p className="result-question">
                  <strong>Q:</strong> {item.question}
                </p>
                <p className="result-answer">
                  <strong>Your Answer:</strong> {item.answer}
                </p>
                <p className="result-feedback">
                  <strong>Feedback:</strong> {item.feedback}
                </p>
              </div>
            ))}
          </div>
          <button onClick={() => window.location.reload()} className="ia-restart-button">
            Restart Simulation
          </button>
        </div>
      )}
    </div>
  );
}
