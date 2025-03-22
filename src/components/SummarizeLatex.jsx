import React, { useState } from 'react';
import Latex from 'react-latex-next';

/**
 * SummarizeLaTeX:
 * A simple React component that:
 * 1) Takes user input (the long text).
 * 2) Sends it to the /api/summarize endpoint.
 * 3) Receives a LaTeX string.
 * 4) Renders it via <Latex> component.
 */
export default function SummarizeLaTeX() {
  const [inputText, setInputText] = useState("");
  const [latexSummary, setLatexSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSummarize() {
    if (!inputText.trim()) return;
    setLoading(true);
    setLatexSummary("");

    try {
      const res = await fetch("http://localhost:4000/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ textToSummarize: inputText })
      });
      const data = await res.json();
      if (data.latexSummary) {
        setLatexSummary(data.latexSummary);
      } else {
        setLatexSummary("No summary returned from server.");
      }
    } catch (error) {
      console.error("Error calling /api/summarize:", error);
      setLatexSummary("Error calling server.");
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>LaTeX</h1>
      <textarea
        rows={10}
        style={{ width: '100%', padding: '10px' }}
        placeholder="Paste your big text about SOMA VC here..."
        value={inputText}
        onChange={e => setInputText(e.target.value)}
      />

      <button
        onClick={handleSummarize}
        style={{ marginTop: 10, padding: '10px 20px', cursor: 'pointer' }}
      >
        Summarize in LaTeX
      </button>

      {loading && <div style={{ marginTop: 20 }}>Loading...</div>}

      {latexSummary && (
        <div style={{ marginTop: 20, padding: '10px', background: '#f9f9f9' }}>
          <h2>LaTeX Summary:</h2>
          <Latex>{latexSummary}</Latex>
        </div>
      )}
    </div>
  );
}
