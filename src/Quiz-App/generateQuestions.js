export async function fetchCustomQuestions(topic, difficulty) {
  const res = await fetch("http://localhost:3001/api/quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, difficulty })
  });
  const data = await res.json();
  return data;
}
