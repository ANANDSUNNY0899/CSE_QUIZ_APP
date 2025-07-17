import React, { useState } from "react";
import Question from "./Question"; 

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      
      <Question />
    </div>
  );
}

export default App;
