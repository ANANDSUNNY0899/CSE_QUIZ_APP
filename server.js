// // server.js
// import express from "express";
// import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

// const app = express();
// app.use(express.json());


// console.log("API key present?", process.env.OPENAI_API_KEY ? "✅" : "❌");
// console.log("Sending request to OpenAI...");



// app.post("/api/quiz", async (req, res) => {
//   const prompt = "Generate 5 OS MCQs in JSON";

//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.7
//       },
//       {
//         headers: {
//           "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     const content = response.data.choices[0].message.content;
//     res.json(JSON.parse(content));
//   } catch (err) {
//     console.error("Error:", err.response?.data || err.message);
//     res.status(500).json({ error: "Failed to fetch from OpenAI" });
//   }
// });

// app.listen(3001, () => {
//   console.log("Server running on http://localhost:3001");
// });






// import express from "express";
// import axios from "axios";
// import dotenv from "dotenv";
// import cors from "cors";
// dotenv.config();




// const app = express();
// app.use(express.json());
// app.use(cors());


// app.post("/api/quiz", async (req, res) => {
//   const { topic = "Operating Systems", difficulty = "Medium" } = req.body;

//   const prompt = `
// Generate 10 UNIQUE and high-quality multiple-choice questions on **${topic}**.
// Difficulty: ${difficulty}.

// Requirements:
// - Each question should focus on different sub-topics within ${topic}
// - Each question must have 4 options
// - Mark the correct answer clearly

// Return result in JSON format:
// [
//   {
//     "question": "What is ...?",
//     "options": ["A", "B", "C", "D"],
//     "answer": "B"
//   }
// ]
// `;

//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.7
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     const result = response.data.choices[0].message.content;
//     res.json(JSON.parse(result));
//   } catch (err) {
//     console.error("❌ OpenAI Error:", err.response?.data || err.message);
//     res.status(500).json({ error: "Failed to generate quiz" });
//   }
// });



// app.listen(3001, () => {
//   console.log("Server running on http://localhost:3001");
// });
















import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/quiz", async (req, res) => {
  const { topic = "Operating Systems", difficulty = "Medium" } = req.body;

  const prompt = `
Generate 10 UNIQUE and high-quality multiple-choice questions on **${topic}**.
Difficulty: ${difficulty}.

Requirements:
- Each question should focus on different sub-topics within ${topic}
- Each question must have 4 options
- Mark the correct answer clearly

Return result in JSON format:
[
  {
    "question": "What is ...?",
    "options": ["A", "B", "C", "D"],
    "answer": "B"
  }
]
`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const textResponse =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Ensure it's valid JSON
    const jsonStart = textResponse.indexOf("[");
    const jsonEnd = textResponse.lastIndexOf("]");
    const jsonString = textResponse.slice(jsonStart, jsonEnd + 1);
    const quizData = JSON.parse(jsonString);

    res.json(quizData);
  } catch (err) {
    console.error("❌ Gemini API Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

app.listen(3001, () => {
  console.log("✅ Server running on http://localhost:3001");
});
