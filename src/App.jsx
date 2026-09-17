import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    const text = message.trim();

    if (!text || loading) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setAnswer(data.answer || "No response received.");
      setMessage("");
    } catch (error) {
      setAnswer(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          ORVEX <span>AI</span>
        </div>

        <button className="new-chat" onClick={() => {
          setMessage("");
          setAnswer("");
        }}>
          + New Chat
        </button>
      </header>

      <main className="main">
        {!answer && !loading && (
          <div className="welcome">
            <h1>How can I help you?</h1>
            <p>Ask anything. ORVEX AI is ready to assist you.</p>
          </div>
        )}

        {(answer || loading) && (
          <div className="answer">
            <div className="answer-label">ORVEX AI</div>
            <div className="answer-text">
              {loading ? "Thinking..." : answer}
            </div>
          </div>
        )}

        <div className="input-area">
          <input
            type="text"
            placeholder="Message ORVEX AI..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />

          <button onClick={sendMessage} disabled={loading}>
            {loading ? "..." : "↑"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
