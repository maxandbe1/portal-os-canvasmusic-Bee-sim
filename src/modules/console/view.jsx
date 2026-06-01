// src/modules/console/view.jsx
import React, { useState, useRef, useEffect } from "react";
import { runCommand } from "./engine.js";

export default function ConsoleView() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);
  useEffect(() => {
  window.__consolePush = (msg) => {
    setLines((prev) => [...prev, msg]);
   };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmed = input.trim();
    if (!trimmed) return;

    // push into history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    // echo command
    setLines((prev) => [...prev, `> ${trimmed}`]);
    setInput("");

    try {
      const result = await runCommand(trimmed);

      if (result === "__CLEAR__") {
        setLines([]);
        return;
      }

      if (result && result.length) {
        setLines((prev) => [...prev, result]);
      }
    } catch (err) {
      setLines((prev) => [...prev, `Error: ${String(err)}`]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistoryIndex((idx) => {
        const next = idx === -1 ? history.length - 1 : Math.max(idx - 1, 0);
        const cmd = history[next] ?? "";
        setInput(cmd);
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistoryIndex((idx) => {
        if (idx === -1) return -1;
        const next = idx + 1;
        if (next >= history.length) {
          setInput("");
          return -1;
        }
        const cmd = history[next] ?? "";
        setInput(cmd);
        return next;
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#05070A",
        color: "#E5ECFF",
        fontFamily: "monospace",
        padding: "12px"
      }}
    >
      <div
        ref={outputRef}
        style={{
          flex: 1,
          overflowY: "auto",
          border: "1px solid #1b2233",
          borderRadius: "6px",
          padding: "8px",
          marginBottom: "8px",
          background: "#02040A"
        }}
      >
        {lines.length === 0 && (
          <div style={{ opacity: 0.6 }}>
            Type <strong>help</strong> to see available commands.
          </div>
        )}
        {lines.map((line, i) => (
          <div key={i} style={{ whiteSpace: "pre-wrap" }}>
            {line}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
        <span style={{ alignSelf: "center" }}>{">"}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            padding: "6px 8px",
            background: "#05070A",
            border: "1px solid #1b2233",
            borderRadius: "6px",
            color: "#E5ECFF"
          }}
          placeholder="Enter command (try: help)"
        />
      </form>
    </div>
  );
}
