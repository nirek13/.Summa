/***************************************************************************
 * chat.jsx
 * - Front-end UI that calls your backend at /api/chat to get responses
 * - No dotenv or @google/generative-ai on the front end
 ***************************************************************************/

import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, File, X } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell
} from 'recharts';

/****************************************************************
 * parseResponse
 * Parses text for special %Graphs% { ... } or %Table% { ... } blocks.
 ****************************************************************/
const parseResponse = (text) => {
  const parts = [];
  let lastIndex = 0;

  const graphRegex = /%Graphs%\s*{([^}]*)}/g;
  const tableRegex = /%Table%\s*{([^}]*)}/g;
  let match;

  // Parse any %Graphs% blocks
  while ((match = graphRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex, match.index)
      });
    }
    try {
      const graphText = match[1];
      const typeMatch = graphText.match(/type:\s*'([^']*)'/);
      const titleMatch = graphText.match(/title:\s*'([^']*)'/);
      const labelsMatch = graphText.match(/labels:\s*\[(.*?)\]/);
      const valuesMatch = graphText.match(/values:\s*\[(.*?)\]/);

      if (typeMatch && labelsMatch && valuesMatch) {
        const labels = labelsMatch[1].split(',').map(s => s.trim().replace(/'/g, ''));
        const values = valuesMatch[1].split(',').map(s => parseFloat(s.trim()));

        parts.push({
          type: 'graph',
          content: {
            type:   typeMatch[1],
            title:  titleMatch ? titleMatch[1] : 'Chart',
            labels: labels,
            values: values
          }
        });
      }
    } catch (error) {
      console.error('Error parsing %Graphs% block:', error);
    }
    lastIndex = match.index + match[0].length;
  }

  // Parse any %Table% blocks
  while ((match = tableRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex, match.index)
      });
    }
    try {
      const tableText = match[1];
      const headersMatch = tableText.match(/headers:\s*\[(.*?)\]/);
      const rowsMatch = tableText.match(/rows:\s*\[(.*?)\](?=\s*}\s*$|,)/);

      if (headersMatch && rowsMatch) {
        const headers = headersMatch[1]
          .split(',')
          .map(item => item.trim().replace(/['"]/g, ''));

        const rowsStr = rowsMatch[1];
        const rowMatches = rowsStr.match(/\[(.*?)\]/g) || [];
        const rows = rowMatches.map(rowText => {
          const withoutBrackets = rowText.slice(1, -1);
          return withoutBrackets
            .split(',')
            .map(cell => cell.trim().replace(/['"]/g, ''));
        });

        parts.push({
          type: 'table',
          content: { headers, rows }
        });
      }
    } catch (error) {
      console.error('Error parsing %Table% block:', error);
    }
    lastIndex = match.index + match[0].length;
  }

  // Any leftover text
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.substring(lastIndex) });
  }

  return parts;
};

// Monochrome chart palette
const MONOCHROME_COLORS = [
  '#000000', '#333333', '#555555', '#777777', '#999999', '#BBBBBB'
];

// GraphRenderer for line/bar/pie charts
const GraphRenderer = ({ data }) => {
  if (!data || !data.type) return null;

  const chartData = data.labels.map((label, i) => ({
    name: label,
    value: data.values[i]
  }));

  switch (data.type) {
    case 'line':
      return (
        <div className="graph-container">
          <h3 className="graph-title">{data.title}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis dataKey="name" stroke="#000000" />
              <YAxis stroke="#000000" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #000000',
                  borderRadius: '4px'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#000000"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );

    case 'bar':
      return (
        <div className="graph-container">
          <h3 className="graph-title">{data.title}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis dataKey="name" stroke="#000000" />
              <YAxis stroke="#000000" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #000000',
                  borderRadius: '4px'
                }}
              />
              <Legend />
              <Bar dataKey="value" fill="#000000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );

    case 'pie':
      return (
        <div className="graph-container">
          <h3 className="graph-title">{data.title}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine
                outerRadius={100}
                fill="#000000"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, i) => (
                  <Cell
                    key={`cell-${i}`}
                    fill={MONOCHROME_COLORS[i % MONOCHROME_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #000000',
                  borderRadius: '4px'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );

    default:
      return <div>Unsupported graph type: {data.type}</div>;
  }
};

// TableRenderer for tables
const TableRenderer = ({ data }) => {
  if (!data || !data.headers || !data.rows) return null;
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {data.headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, cellIdx) => (
                <td key={cellIdx}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Single message bubble
const Message = ({ message, isUser }) => {
  // If user => raw text only. If AI => parse for special blocks
  const parts = isUser
    ? [{ type: 'text', content: message.text }]
    : parseResponse(message.text);

  return (
    <div className={`message ${isUser ? 'user-message' : 'assistant-message'}`}>
      <div className="message-avatar">
        {isUser ? (
          <div className="user-avatar">U</div>
        ) : (
          <div className="assistant-avatar">G</div>
        )}
      </div>
      <div className="message-content">
        {parts.map((part, idx) => {
          switch (part.type) {
            case 'text':
              return <p key={idx}>{part.content}</p>;
            case 'graph':
              return <GraphRenderer key={idx} data={part.content} />;
            case 'table':
              return <TableRenderer key={idx} data={part.content} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

// Main Chatbot component
const MultimodalChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 1) Send user message to your local server
  const handleSend = async () => {
    if (!inputMessage.trim() && attachments.length === 0) return;

    // Add the user's message to the UI
    const newUserMessage = {
      text: inputMessage,
      attachments: [...attachments],
      isUser: true,
    };
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setAttachments([]);
    setIsTyping(true);

    try {
      // Request the server for an AI response
      const response = await fetch('http://localhost:4000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputMessage,
          attachments
        })
      });
      const data = await response.json();
      setIsTyping(false);

      // Add the AI response to the UI
      setMessages(prev => [
        ...prev,
        { text: data.text, isUser: false }
      ]);
    } catch (error) {
      console.error('Error calling server:', error);
      setIsTyping(false);

      // In case of server error, show fallback
      setMessages(prev => [
        ...prev,
        {
          text: "I'm sorry, I encountered a server error. Please try again.",
          isUser: false
        }
      ]);
    }
  };

  // Enter => Send
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 2) Handle file uploads
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        // Show a preview if it's an image
        const reader = new FileReader();
        reader.onload = (evt) => {
          setAttachments(prev => [
            ...prev,
            {
              type: 'image',
              name: file.name,
              size: file.size,
              preview: evt.target.result,
              file
            }
          ]);
        };
        reader.readAsDataURL(file);
      } else {
        // Otherwise treat as a generic file
        setAttachments(prev => [
          ...prev,
          {
            type: 'file',
            name: file.name,
            size: file.size,
            file
          }
        ]);
      }
    });

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 3) Remove attachment
  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>Gemini</h2>
        <p>Multimodal AI Assistant</p>
      </div>

      {/* Chat messages */}
      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <Message key={i} message={msg} isUser={msg.isUser} />
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="message assistant-message">
            <div className="message-avatar">
              <div className="assistant-avatar">G</div>
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="attachments-preview">
          {attachments.map((attachment, idx) => (
            <div className="attachment-item" key={idx}>
              {attachment.type === 'image' ? (
                <div className="image-preview">
                  <img src={attachment.preview} alt={attachment.name} />
                  <button
                    className="remove-attachment"
                    onClick={() => removeAttachment(idx)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="file-preview">
                  <File size={24} />
                  <span className="file-name">{attachment.name}</span>
                  <button
                    className="remove-attachment"
                    onClick={() => removeAttachment(idx)}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className="chatbot-input">
        <textarea
          placeholder="Ask Gemini..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <div className="input-actions">
          {/* Hidden file input */}
          <input
            type="file"
            id="file-upload"
            multiple
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />

          {/* Attach image */}
          <button
            className="action-button"
            onClick={() => fileInputRef.current.click()}
          >
            <Image size={20} />
          </button>

          {/* Attach file */}
          <button
            className="action-button"
            onClick={() => fileInputRef.current.click()}
          >
            <File size={20} />
          </button>

          {/* Send button */}
          <button className="send-button" onClick={handleSend}>
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Inline styling for demonstration */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Roboto:wght@400;500;700&display=swap');

        :root {
          --primary: #000000;
          --secondary: #333333;
          --tertiary: #777777;
          --light-gray: #EEEEEE;
          --light: #FFFFFF;
          --text-primary: #000000;
          --text-secondary: #555555;
          --shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          --border-radius: 12px;
          --input-radius: 24px;
          --transition: 0.2s ease;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .chatbot-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100vh;
          max-width: 900px;
          margin: 0 auto;
          background-color: var(--light);
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        .chatbot-header {
          padding: 16px 24px;
          background-color: var(--primary);
          color: var(--light);
          border-bottom: 1px solid var(--secondary);
        }

        .chatbot-header h2 {
          font-family: 'Roboto', sans-serif;
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .chatbot-header p {
          font-size: 14px;
          opacity: 0.8;
        }

        .chatbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          background-color: var(--light-gray);
        }

        .message {
          display: flex;
          align-items: flex-start;
          animation: fadeIn 0.3s ease;
        }
        .user-message {
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          flex-shrink: 0;
        }
        .user-avatar {
          background-color: var(--primary);
          color: var(--light);
        }
        .assistant-avatar {
          background-color: var(--light);
          color: var(--primary);
          border: 2px solid var(--primary);
        }

        .message-content {
          max-width: 70%;
          padding: 12px 16px;
          border-radius: 16px;
          font-size: 16px;
          line-height: 1.5;
          margin: 0 12px;
          box-shadow: var(--shadow);
        }
        .user-message .message-content {
          background-color: var(--primary);
          color: var(--light);
          border-top-right-radius: 4px;
          text-align: right;
        }
        .assistant-message .message-content {
          background-color: var(--light);
          color: var(--text-primary);
          border-top-left-radius: 4px;
          text-align: left;
        }
        .message-content p {
          margin-bottom: 8px;
        }
        .message-content p:last-child {
          margin-bottom: 0;
        }

        .attachments-preview {
          padding: 12px 24px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          border-top: 1px solid var(--light-gray);
        }
        .attachment-item {
          position: relative;
        }
        .image-preview {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }
        .image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .file-preview {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          background-color: var(--light-gray);
          border-radius: 8px;
          gap: 8px;
        }
        .file-name {
          max-width: 120px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 14px;
        }
        .remove-attachment {
          position: absolute;
          top: -6px;
          right: -6px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: var(--primary);
          color: var(--light);
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          z-index: 2;
        }

        .chatbot-input {
          padding: 16px 24px;
          display: flex;
          align-items: flex-end;
          gap: 12px;
          border-top: 1px solid var(--light-gray);
        }
        textarea {
          flex: 1;
          min-height: 56px;
          max-height: 150px;
          padding: 16px;
          border: 1px solid var(--light-gray);
          border-radius: var(--input-radius);
          resize: none;
          font-size: 16px;
          outline: none;
          transition: border-color var(--transition);
        }
        textarea:focus {
          border-color: var(--primary);
        }

        .input-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .action-button {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          color: var(--tertiary);
          transition: color var(--transition), background-color var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .action-button:hover {
          color: var(--primary);
          background-color: var(--light-gray);
        }

        .send-button {
          background-color: var(--primary);
          color: var(--light);
          border: none;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition);
        }
        .send-button:hover {
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .graph-container {
          width: 100%;
          margin: 16px 0;
          padding: 16px;
          background-color: var(--light);
          border-radius: 8px;
          box-shadow: var(--shadow);
        }
        .graph-title {
          font-family: 'Roboto', sans-serif;
          font-size: 18px;
          color: var(--text-primary);
          margin-bottom: 16px;
          text-align: center;
          font-weight: 600;
        }

        .table-container {
          width: 100%;
          margin: 16px 0;
          overflow-x: auto;
        }
        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
          box-shadow: var(--shadow);
          border-radius: 8px;
          overflow: hidden;
        }
        .data-table th {
          background-color: var(--primary);
          color: var(--light);
          padding: 12px 16px;
          text-align: left;
        }
        .data-table td {
          padding: 10px 16px;
          border-bottom: 1px solid var(--light-gray);
        }
        .data-table tr:nth-child(even) {
          background-color: var(--light-gray);
        }
        .data-table tr:last-child td {
          border-bottom: none;
        }

        .typing-indicator {
          display: flex;
          align-items: center;
          column-gap: 6px;
          padding: 8px 0;
        }
        .typing-indicator span {
          height: 8px;
          width: 8px;
          border-radius: 50%;
          background-color: var(--primary);
          display: block;
          opacity: 0.4;
        }
        .typing-indicator span:nth-child(1) {
          animation: pulse 1s infinite 0s;
        }
        .typing-indicator span:nth-child(2) {
          animation: pulse 1s infinite 0.2s;
        }
        .typing-indicator span:nth-child(3) {
          animation: pulse 1s infinite 0.4s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 0.4; }
        }

        @media (max-width: 768px) {
          .message-content {
            max-width: 80%;
          }
          .chatbot-header h2 {
            font-size: 20px;
          }
        }
        @media (max-width: 480px) {
          .message-content {
            max-width: 90%;
          }
          .chatbot-messages {
            padding: 16px;
          }
          .chatbot-input {
            padding: 12px 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default MultimodalChatbot;