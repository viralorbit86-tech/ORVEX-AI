import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  return (
    <div className="app">
      <header className="header">
        <div className="logo">ORVEX <span>AI</span></div>
        <button className="new-chat">+ New Chat</button>
      </header>

      <main className="main">
        <div className="welcome">
          <h1>How can I help you?</h1>
          <p>Ask anything. ORVEX AI is ready to assist you.</p>
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Message ORVEX AI..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>↑</button>
        </div>
      </main>
    </div>
  );
}

export default App;
