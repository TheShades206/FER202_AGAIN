import { useReducer } from "react";
import { Button } from "react-bootstrap";

// 1. Counter
function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return 0;
    default:
      return state;
  }
}

function Counter() {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <div>
      <h4>Count: {count}</h4>
      <div className="d-flex justify-content-center gap-2">
        <Button onClick={() => dispatch({ type: "INCREMENT" })}>+</Button>
        <Button variant="secondary" onClick={() => dispatch({ type: "DECREMENT" })}>-</Button>
        <Button variant="outline-danger" onClick={() => dispatch({ type: "RESET" })}>Reset</Button>
      </div>
    </div>
  );
}

// 2. Question Bank
const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      if (state.showScore) return state;
      return { ...state, selectedOption: action.payload };
    case "NEXT_QUESTION": {
      if (!state.selectedOption || state.showScore) return state;

      const question = state.questions[state.currentQuestion];
      const score = state.score + (state.selectedOption === question.answer ? 1 : 0);
      const nextQuestion = state.currentQuestion + 1;

      return nextQuestion < state.questions.length
        ? { ...state, score, currentQuestion: nextQuestion, selectedOption: "" }
        : { ...state, score, showScore: true };
    }
    case "RESTART_QUIZ":
      return initialState;
    default:
      return state;
  }
}

function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const question = state.questions[state.currentQuestion];

  const handleOptionSelect = (option) => {
    dispatch({ type: "SELECT_OPTION", payload: option });
  };

  const handleNextQuestion = () => dispatch({ type: "NEXT_QUESTION" });
  const handleRestartQuiz = () => dispatch({ type: "RESTART_QUIZ" });

  return (
    <div className="border rounded-3 shadow-sm p-4">
      {state.showScore ? (
        <>
          <h4>Your Score: {state.score}/{state.questions.length}</h4>
          <Button onClick={handleRestartQuiz}>Restart Quiz</Button>
        </>
      ) : (
        <>
          <p className="text-muted">Question {state.currentQuestion + 1} of {state.questions.length}</p>
          <h4>{question.question}</h4>
          <div className="d-flex justify-content-center flex-wrap gap-2 my-3" role="group" aria-label="Answer options">
            {question.options.map((option) => (
              <Button
                key={option}
                variant={state.selectedOption === option ? "primary" : "outline-primary"}
                aria-pressed={state.selectedOption === option}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </Button>
            ))}
          </div>
          <Button variant="success" onClick={handleNextQuestion} disabled={!state.selectedOption}>
            Next
          </Button>
        </>
      )}
    </div>
  );
}

function Ex15() {
  return (
    <div>
      <h3>1. Counter</h3>
      <Counter />
      <hr />
      <h3>2. Question Bank</h3>
      <QuestionBank />
    </div>
  );
}

export default Ex15;
