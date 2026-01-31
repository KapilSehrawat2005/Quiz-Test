import { useState } from "react";
import "./App.css";

const questions = [
  {
    question:
      "As per Section 2(84) Share means share in the share capital of a Company and includes__________",
    options: ["Debentures", "Preference Shares", "Stocks", "Bonds"],
    correct: "Stocks",
  },
  {
    question: "Small Shareholders means a shareholder holding shares of nominal value of not more than__________or such other sum as may be prescribed:",
    options: ["5,000", "10,000", "15,000", "20,000"],
    correct: "20,000",
  },
  {
    question: "KMP may be a director of any company with permission.",
    options: ["CG", "ROC", "Board", "Stakeholders"],
    correct: "Board",
  },
  {
    question: "Section 43 provides for__________",
    options: [
      "Issue of shares at Premium",
      "Kinds of Shares",
      "Buy Back of Shares",
      "Reduction in Share Capital",
    ],
    correct: "Kinds of Shares",
  },
  {
    question: "Notice of right offer shall be dispatched to all the shareholders at least______days before opening of the offer.",
    options: ["2 days", "5 days", "10 days", "3 days"],
    correct: "3 days",
  },
];

function App() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[current];
  const selected = answers[current];

  const handleOptionClick = (option) => {
    if(selected){
      return ;
    }
    const newAnswers = [...answers];
    newAnswers[current] = option;
    setAnswers(newAnswers);

    if (option === currentQuestion.correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (current === questions.length - 1) {
      setShowResult(true);
    } else {
      setCurrent(current + 1);
    }
  };

  const prevQuestion = () => {
    if (current > 0){
      setCurrent(current - 1);
    } 
  };
  const RestartQuiz = () => {
      setCurrent(0);
      setAnswers(Array(5).fill(null));
      setScore(0);
      setShowResult(false);
  }
  const progressWidth = ((current + 1) / questions.length) * 100;

  if (showResult) {
    return (
      <div className="container">
        <div className="card">
          <h2 style={{ textAlign: "center" }}> Quiz Finished</h2>
          <p style={{ textAlign: "center", marginTop: "1rem" }}>Your Score</p>
          <h1 style={{ textAlign: "center" }}>
            <span style={{color:"#FACC15"}}>{score}</span> / {questions.length}
          </h1>
          <div className="restart-button">
            <button onClick={RestartQuiz} style={{justifyContent:"center" ,color:"white" , backgroundColor:"#2ecc71",padding: "14px",borderRadius:"15px",cursor: "pointer"}}>Restart Quiz</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">

        <div className="progress">
          <div className="progress-fill"style={{ width: `${progressWidth}%` }}></div>
        </div>

        <p className="question-count">Question {current + 1} of {questions.length}</p>

        <p className="question-text">{currentQuestion.question}</p>

        <div className="options">
          {currentQuestion.options.map((option) => {
            let className = "";

            if (selected) {
              if (option === currentQuestion.correct) {
                className = "correct";
              } else if (option === selected) {
                className = "wrong";
              }
            }

            return (
              <button key={option} className={className} onClick={() => handleOptionClick(option)}>{option}</button>
            );
          })}
        </div>

        <div className="pagination">
          <button className="nav-btn" onClick={prevQuestion} disabled={current === 0}>← Prev</button>
          <button className="nav-btn" onClick={nextQuestion} disabled={!selected}>{current === questions.length - 1 ? "Finish" : "Next →"}</button>
        </div>

      </div>
    </div>
  );
}

export default App;
