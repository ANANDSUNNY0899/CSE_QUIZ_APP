// // import { data } from "./data.js";

// // function Questions() {
// //   return (
// //     <div>
// //       <h1>Quiz Time</h1>
// //       {
// //         data.questions.map((ques, idx) => {
// //           const { question, options } = ques;

// //           return (
// //             <div key={idx}>
// //               <p>{question}</p>
// //               {
// //                 options.map((option, optIdx) => (
// //                   <div key={optIdx}>
// //                     <label htmlFor={`op${idx}_${optIdx}`}>{option}</label>
// //                     <input
// //                       id={`op${idx}_${optIdx}`}
// //                       type="radio"
// //                       name={`q${idx}`}
// //                       value={option}
// //                     />
// //                   </div>
// //                 ))
// //               }
// //             </div>
// //           );
// //         })
// //       }
// //     </div>
// //   );
// // }

// // export default Questions;




// import React, { useState } from "react";
// import { data } from "./data";

// function Questions() {
//   const [userAnswers, setUserAnswers] = useState({});
//   const [score, setScore] = useState(null);

//   const handleOptionChange = (qIdx, selectedOption) => {
//     setUserAnswers({ ...userAnswers, [qIdx]: selectedOption });
//   };

//   const handleSubmit = () => {
//     let calculatedScore = 0;
//     data.questions.forEach((ques, index) => {
//       if (userAnswers[index] === ques.answer) {
//         calculatedScore++;
//       }
//     });
//     setScore(calculatedScore);
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Quiz Time</h1>

//       {data.questions.map((ques, qIdx) => (
//         <div key={qIdx} style={styles.card}>
//           <h3 style={styles.question}>{qIdx + 1}. {ques.question}</h3>
//           {ques.options.map((option, optIdx) => (
//             <label key={optIdx} style={styles.option}>
//               <input
//                 type="radio"
//                 name={`q${qIdx}`}
//                 value={option}
//                 checked={userAnswers[qIdx] === option}
//                 onChange={() => handleOptionChange(qIdx, option)}
//               />
//               {option}
//             </label>
//           ))}
//         </div>
//       ))}

//       {score === null ? (
//         <button style={styles.submit} onClick={handleSubmit}>Submit Quiz</button>
//       ) : (
//         <h2 style={styles.score}>✅ Your Score: {score} / {data.questions.length}</h2>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: "600px",
//     margin: "40px auto",
//     padding: "20px",
//     borderRadius: "12px",
//     background: "#f4f4f4",
//     boxShadow: "0 0 15px rgba(0,0,0,0.1)"
//   },
//   title: {
//     textAlign: "center",
//     color: "#333"
//   },
//   card: {
//     marginBottom: "20px",
//     padding: "15px",
//     background: "#fff",
//     borderRadius: "8px",
//     boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
//   },
//   question: {
//     marginBottom: "10px"
//   },
//   option: {
//     display: "block",
//     marginBottom: "8px",
//     cursor: "pointer"
//   },
//   submit: {
//     marginTop: "20px",
//     padding: "10px 20px",
//     fontSize: "16px",
//     background: "#4caf50",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer"
//   },
//   score: {
//     textAlign: "center",
//     color: "#2c3e50",
//     marginTop: "20px"
//   }
// };

// export default Questions;









// import React, { useState, useEffect } from "react";
// import { fetchOSQuestions } from "./generateQuestions";

// function Questions() {
//   const [quizData, setQuizData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [score, setScore] = useState(null);
//   const [showResults, setShowResults] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(60); // 60 seconds

//   const startQuiz = async () => {
//     setLoading(true);
//     const data = await fetchOSQuestions(); // must return ~10 OS questions
//     setQuizData(data);
//     setUserAnswers({});
//     setScore(null);
//     setShowResults(false);
//     setQuizStarted(true);
//     setTimeLeft(60); // reset timer
//     setLoading(false);
//   };

//   // Timer logic
//   useEffect(() => {
//     if (!quizStarted || score !== null) return;

//     const timer = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev === 1) {
//           clearInterval(timer);
//           handleSubmit(); // auto-submit when time runs out
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [quizStarted, score]);

//   const handleOptionChange = (qIdx, selected) => {
//     setUserAnswers({ ...userAnswers, [qIdx]: selected });
//   };

//   const handleSubmit = () => {
//     let correct = 0;
//     quizData.forEach((q, i) => {
//       if (userAnswers[i] === q.answer) correct++;
//     });
//     setScore(correct);
//     setShowResults(true);
//   };

//   const handleRestart = () => {
//     startQuiz(); // load new questions
//   };

//   const answeredCount = Object.keys(userAnswers).length;

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.heading}> Operating System Quiz</h1>

//       {!quizStarted && (
//         <button onClick={startQuiz} style={styles.button} disabled={loading}>
//           {loading ? "Loading..." : "Generate Quiz"}
//         </button>
//       )}

//       {quizStarted && score === null && (
//         <>
//           <div style={styles.infoBar}>
//             <p>⏱️ Time Left: <strong>{timeLeft}s</strong></p>
//             <p>✅ Answered: <strong>{answeredCount}</strong> / {quizData.length}</p>
//           </div>
//         </>
//       )}

//       {quizStarted && quizData.map((q, i) => (
//         <div key={i} style={styles.card}>
//           <h3 style={styles.question}>{i + 1}. {q.question}</h3>
//           {q.options.map((opt, j) => {
//             const isCorrect = opt === q.answer;
//             const isUserSelected = userAnswers[i] === opt;
//             const showHighlight = showResults;

//             const backgroundColor = showHighlight
//               ? isCorrect
//                 ? "#d4edda"
//                 : isUserSelected
//                 ? "#f8d7da"
//                 : "#fdfdfd"
//               : "#fdfdfd";

//             return (
//               <label
//                 key={j}
//                 style={{
//                   ...styles.optionLabel,
//                   backgroundColor,
//                   borderColor: isUserSelected ? "#333" : "#ddd"
//                 }}
//               >
//                 <input
//                   type="radio"
//                   name={`q${i}`}
//                   value={opt}
//                   disabled={showHighlight}
//                   checked={isUserSelected}
//                   onChange={() => handleOptionChange(i, opt)}
//                   style={styles.radio}
//                 />
//                 {opt}
//               </label>
//             );
//           })}
//         </div>
//       ))}

//       {quizStarted && quizData.length > 0 && score === null && (
//         <button onClick={handleSubmit} style={styles.submitButton}>Submit</button>
//       )}

//       {score !== null && (
//         <>
//           <h2 style={styles.scoreText}>🎯 Your Score: {score} / {quizData.length}</h2>
//           <button onClick={handleRestart} style={styles.restartButton}>🔁 Restart Quiz</button>
//         </>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: "700px",
//     margin: "20px auto",
//     padding: "20px",
//     fontFamily: "'Segoe UI', sans-serif",
//     background: "#f9f9f9",
//     borderRadius: "12px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//     textAlign: "center"
//   },
//   heading: {
//     color: "#333",
//     marginBottom: "20px",
//     fontSize: "26px"
//   },
//   infoBar: {
//     display: "flex",
//     justifyContent: "space-around",
//     marginBottom: "20px",
//     fontSize: "16px"
//   },
//   card: {
//     background: "#fff",
//     marginBottom: "20px",
//     padding: "20px",
//     borderRadius: "10px",
//     textAlign: "left",
//     boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
//   },
//   question: {
//     marginBottom: "15px",
//     fontSize: "18px",
//     color: "#222"
//   },
//   optionLabel: {
//     display: "block",
//     padding: "10px 15px",
//     marginBottom: "10px",
//     borderRadius: "6px",
//     border: "1px solid #ddd",
//     cursor: "pointer",
//     transition: "0.2s"
//   },
//   radio: {
//     marginRight: "10px"
//   },
//   button: {
//     backgroundColor: "#007bff",
//     color: "white",
//     border: "none",
//     padding: "12px 24px",
//     borderRadius: "6px",
//     fontSize: "16px",
//     cursor: "pointer",
//     marginBottom: "20px"
//   },
//   submitButton: {
//     backgroundColor: "#28a745",
//     color: "white",
//     border: "none",
//     padding: "12px 24px",
//     fontSize: "16px",
//     borderRadius: "6px",
//     cursor: "pointer",
//     marginTop: "20px"
//   },
//   restartButton: {
//     backgroundColor: "#ff9800",
//     color: "white",
//     border: "none",
//     padding: "10px 20px",
//     fontSize: "16px",
//     borderRadius: "6px",
//     cursor: "pointer",
//     marginTop: "20px"
//   },
//   scoreText: {
//     marginTop: "30px",
//     fontSize: "24px",
//     color: "#444"
//   }
// };

// export default Questions;





import React, { useState, useEffect } from "react";
import { fetchCustomQuestions } from "./generateQuestions";

function Questions() {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const [selectedTopic, setSelectedTopic] = useState("Operating Systems");
  const [difficulty, setDifficulty] = useState("Medium");

  const startQuiz = async () => {
    setLoading(true);
    const data = await fetchCustomQuestions(selectedTopic, difficulty);
    setQuizData(data);
    setUserAnswers({});
    setScore(null);
    setShowResults(false);
    setQuizStarted(true);
    setTimeLeft(60);
    setLoading(false);
  };

  useEffect(() => {
    if (!quizStarted || score !== null) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          clearInterval(timer);
          handleSubmit();
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quizStarted, score]);

  const handleOptionChange = (qIdx, selected) => {
    setUserAnswers({ ...userAnswers, [qIdx]: selected });
  };

  const handleSubmit = () => {
    let correct = 0;
    quizData.forEach((q, i) => {
      if (userAnswers[i] === q.answer) correct++;
    });
    setScore(correct);
    setShowResults(true);
  };

  const handleRestart = () => {
    startQuiz();
  };

  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📚 CSE Quiz App</h1>

      {!quizStarted && (
        <>
          <div style={styles.selectBox}>
            <label>
              Topic:
              <select value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)}>
                <option>Operating Systems</option>
                <option>Database Management</option>
                <option>Computer Networks</option>
                <option>Data Structures</option>
              </select>
            </label>

            <label>
              Difficulty:
              <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </label>
          </div>

          <button onClick={startQuiz} style={styles.button} disabled={loading}>
            {loading ? "Loading..." : "Start Quiz"}
          </button>
        </>
      )}

      {quizStarted && score === null && (
        <div style={styles.infoBar}>
          <p>⏱️ Time Left: <strong>{timeLeft}s</strong></p>
          <p>✅ Answered: <strong>{answeredCount}</strong> / {quizData.length}</p>
        </div>
      )}

      {quizStarted && quizData.map((q, i) => (
        <div key={i} style={styles.card}>
          <h3 style={styles.question}>{i + 1}. {q.question}</h3>
          {q.options.map((opt, j) => {
            const isCorrect = opt === q.answer;
            const isUserSelected = userAnswers[i] === opt;
            const showHighlight = showResults;

            const backgroundColor = showHighlight
              ? isCorrect
                ? "#d4edda"
                : isUserSelected
                ? "#f8d7da"
                : "#fff"
              : "#fff";

            return (
              <label
                key={j}
                style={{
                  ...styles.optionLabel,
                  backgroundColor,
                  borderColor: isUserSelected ? "#333" : "#ccc"
                }}
              >
                <input
                  type="radio"
                  name={`q${i}`}
                  value={opt}
                  disabled={showHighlight}
                  checked={isUserSelected}
                  onChange={() => handleOptionChange(i, opt)}
                  style={styles.radio}
                />
                {opt}
              </label>
            );
          })}
        </div>
      ))}

      {quizStarted && quizData.length > 0 && score === null && (
        <button onClick={handleSubmit} style={styles.submitButton}>Submit</button>
      )}

      {score !== null && (
        <>
          <h2 style={styles.scoreText}>🎯 Score: {score} / {quizData.length}</h2>
          <button onClick={handleRestart} style={styles.restartButton}>🔁 Restart</button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "20px auto",
    padding: "20px",
    fontFamily: "'Segoe UI', sans-serif",
    background: "#f4f4f4",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  heading: {
    fontSize: "26px",
    marginBottom: "20px"
  },
  selectBox: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px"
  },
  card: {
    background: "#fff",
    marginBottom: "20px",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "left",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
  },
  question: {
    fontSize: "18px",
    marginBottom: "10px"
  },
  optionLabel: {
    display: "block",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "8px",
    cursor: "pointer"
  },
  radio: {
    marginRight: "10px"
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer"
  },
  submitButton: {
    padding: "12px 24px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    marginTop: "20px"
  },
  restartButton: {
    padding: "10px 20px",
    backgroundColor: "#ff9800",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    marginTop: "20px"
  },
  scoreText: {
    fontSize: "24px",
    marginTop: "20px"
  },
  infoBar: {
    display: "flex",
    justifyContent: "space-around",
    margin: "20px 0"
  }
};

export default Questions;
