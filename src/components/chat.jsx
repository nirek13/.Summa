import { Image, Maximize2, Minimize2, Paperclip, Send, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import './MinimalistChatbot.css';

// Helper: Generate a UUID (v4) for session identification
const generateUUID = () => {
  // simplified UUID generator for demo purposes
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// -------------------------------------------------------
// 1) Helper: parseResponse for special blocks like %Graphs% and %Table%
// -------------------------------------------------------
const parseResponse = (text) => {
  const parts = [];
  let lastIndex = 0;
  const graphRegex = /%Graphs%\s*{([^}]*)}/g;
  const tableRegex = /%Table%\s*{([^}]*)}/g;
  let match;

  // Parse %Graphs% blocks
  while ((match = graphRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex, match.index),
      });
    }
    try {
      const graphText = match[1];
      const typeMatch = graphText.match(/type:\s*'([^']*)'/);
      const titleMatch = graphText.match(/title:\s*'([^']*)'/);
      const labelsMatch = graphText.match(/labels:\s*\[(.*?)\]/);
      const valuesMatch = graphText.match(/values:\s*\[(.*?)\]/);
      if (typeMatch && labelsMatch && valuesMatch) {
        const labels = labelsMatch[1]
          .split(',')
          .map((s) => s.trim().replace(/'/g, ''));
        const values = valuesMatch[1]
          .split(',')
          .map((s) => parseFloat(s.trim()));
        parts.push({
          type: 'graph',
          content: {
            type: typeMatch[1],
            title: titleMatch ? titleMatch[1] : 'Chart',
            labels,
            values,
          },
        });
      }
    } catch (error) {
      console.error('Error parsing %Graphs% block:', error);
    }
    lastIndex = match.index + match[0].length;
  }

  // Parse %Table% blocks
  while ((match = tableRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex, match.index),
      });
    }
    try {
      const tableText = match[1];
      const headersMatch = tableText.match(/headers:\s*\[(.*?)\]/);
      const rowsMatch = tableText.match(/rows:\s*\[(.*?)\](?=\s*}\s*$|,)/);
      if (headersMatch && rowsMatch) {
        const headers = headersMatch[1]
          .split(',')
          .map((item) => item.trim().replace(/['"]/g, ''));
        const rowsStr = rowsMatch[1];
        const rowMatches = rowsStr.match(/\[(.*?)\]/g) || [];
        const rows = rowMatches.map((rowText) => {
          const withoutBrackets = rowText.slice(1, -1);
          return withoutBrackets
            .split(',')
            .map((cell) => cell.trim().replace(/['"]/g, ''));
        });
        parts.push({
          type: 'table',
          content: { headers, rows },
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

// -------------------------------------------------------
// 2) GraphRenderer Component
// -------------------------------------------------------
const GraphRenderer = ({ data }) => {
  if (!data || !data.type) return null;
  const chartData = data.labels.map((label, i) => ({
    name: label,
    value: data.values[i],
  }));
  const COLORS = ['#E6F2FF', '#F0F7FF', '#D9E8FF', '#C2DBFF', '#AAD1FF', '#94C5FF'];
  switch (data.type) {
    case 'line':
      return (
        <div className="graph-container">
          <h3 className="graph-title">{data.title}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ className: 'chart-tooltip' }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6495ED"
                strokeWidth={2}
                dot={{ fill: '#6495ED' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    case 'bar':
      return (
        <div className="graph-container">
          <h3 className="graph-title">{data.title}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ className: 'chart-tooltip' }} />
              <Legend />
              <Bar dataKey="value" fill="#6495ED" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    case 'pie':
      return (
        <div className="graph-container">
          <h3 className="graph-title">{data.title}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} stroke="#ffffff" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ className: 'chart-tooltip' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    default:
      return <div className="text-gray-500">Unsupported graph type: {data.type}</div>;
  }
};

// -------------------------------------------------------
// 3) TableRenderer Component
// -------------------------------------------------------
const TableRenderer = ({ data }) => {
  if (!data || !data.headers || !data.rows) return null;
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr className="table-header">
            {data.headers.map((header, i) => (
              <th key={i} className="table-header-cell">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="table-row">
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="table-cell">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Add this small helper to interpret *italics* and **bold** in text
function parseAsterisks(text) {
  // Replace **something** with <strong>something</strong>
  let replaced = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Then replace *something* with <em>something</em>
  replaced = replaced.replace(/\*(.*?)\*/g, '<em>$1</em>');
  return replaced;
}

// -------------------------------------------------------
// 4) Message Component
// -------------------------------------------------------
const Message = ({ message, isUser }) => {
  const parts = isUser ? [{ type: 'text', content: message.text }] : parseResponse(message.text);
  return (
    <div className={`message ${isUser ? 'user' : 'assistant'}`}>
      {!isUser && <div className="avatar assistant-avatar">A</div>}
      <div className={`message-bubble ${isUser ? 'user-bubble' : 'assistant-bubble'}`}>
        {parts.map((part, idx) => {
          switch (part.type) {
            case 'text':
              const styledContent = parseAsterisks(part.content);
              return (
                <div
                  key={idx}
                  className="message-text"
                  dangerouslySetInnerHTML={{ __html: styledContent }}
                />
              );
            case 'graph':
              return <GraphRenderer key={idx} data={part.content} />;
            case 'table':
              return <TableRenderer key={idx} data={part.content} />;
            default:
              return null;
          }
        })}
      </div>
      {isUser && <div className="avatar user-avatar">U</div>}
    </div>
  );
};

// -------------------------------------------------------
// 5) Main Chat Component with Conversation Memory
// -------------------------------------------------------
const MinimalistChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const location = useLocation();

  // Generate or retrieve a session ID for memory
  useEffect(() => {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = generateUUID();
      localStorage.setItem('sessionId', sessionId);
    }
  }, []);

  // Read query params for auto-summarize on first load and update the chat title
  const query = new URLSearchParams(location.search);
  const investorName = query.get('name') || 'Chatbot';

  useEffect(() => {
    const name = investorName;
    const investorType = query.get('type') || '';
    const thesis = query.get('thesis') || '';
    const checkSize = query.get('checkSize') || '';
    const geography = query.get('geography') || '';
    const stages = query.get('stages') || '';
    if (name || investorType || thesis || checkSize || geography || stages) {
      autoSummarize(name, investorType, thesis, checkSize, geography, stages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Function for auto-summarize via /api/chat (without conversation history)
  const autoSummarize = async (name, type, thesis, checkSize, geography, stages) => {
    const summaryPrompt = `
Please provide a concise summary of this investor. Include notable portfolio companies, typical founder profiles, average check sizes,
and any unique aspects a startup founder should know.

Name: ${decodeURIComponent(name)}
Type: ${decodeURIComponent(type)}
Investment Thesis: ${decodeURIComponent(thesis)}
Check Size: ${decodeURIComponent(checkSize)}
Region(s): ${decodeURIComponent(geography)}
Stages: ${decodeURIComponent(stages)}
    `.trim();
    setIsTyping(true);
    try {
      const sessionId = localStorage.getItem('sessionId');
      const response = await fetch('https://genaigenissis.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: summaryPrompt }),
      });
      const data = await response.json();
      setIsTyping(false);
      setMessages((prev) => [...prev, { text: data.text, isUser: false }]);
    } catch (error) {
      console.error('Error calling server:', error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { text: "I'm sorry, I encountered a server error. Please try again.", isUser: false },
      ]);
    }
  };

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message (with session memory)
  const handleSend = async () => {
    if (!inputMessage.trim() && attachments.length === 0) return;
    const newUserMessage = {
      text: inputMessage,
      attachments: [...attachments],
      isUser: true,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setAttachments([]);
    setIsTyping(true);
    try {
      const sessionId = localStorage.getItem('sessionId');
      const response = await fetch('https://genaigenissis.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: currentMessage,
          attachments,
        }),
      });
      const data = await response.json();
      setIsTyping(false);
      setMessages((prev) => [...prev, { text: data.text, isUser: false }]);
    } catch (error) {
      console.error('Error calling server:', error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { text: "I'm sorry, I encountered a server error. Please try again.", isUser: false },
      ]);
    }
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          setAttachments((prev) => [
            ...prev,
            {
              type: 'image',
              name: file.name,
              size: file.size,
              preview: evt.target.result,
              file,
            },
          ]);
        };
        reader.readAsDataURL(file);
      } else {
        setAttachments((prev) => [
          ...prev,
          { type: 'file', name: file.name, size: file.size, file },
        ]);
      }
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="chat-container">
      <div className={`chat-window ${isExpanded ? 'expanded' : 'collapsed'}`}>
        {/* Chat Header */}
        <div className="chat-header">
          <div>
            <h2 className="chat-title">{investorName}</h2>
            {isExpanded && <p className="chat-subtitle">Ask anything about {investorName}</p>}
          </div>
          {messages.length > 0 && (
            <button onClick={toggleExpand} className="toggle-button">
              {isExpanded ? <Minimize2 size={18} className="toggle-icon" /> : <Maximize2 size={18} className="toggle-icon" />}
            </button>
          )}
        </div>

        {/* Messages Area */}
        {isExpanded && (
          <div className="messages-container">
            {messages.length === 0 ? (
              <div className="empty-state">
                <p className="empty-state-text">No messages yet</p>
                <p className="empty-state-subtext">Start a conversation by typing a message below</p>
              </div>
            ) : (
              // modify this are to call the function to parse each message and display the double * as bolded html and single * as italics in html appropriately
              messages.map((msg, i) => <Message key={i} message={msg} isUser={msg.isUser} />)
            )}
            {isTyping && (
              <div className="typing-indicator">
                <div className="avatar assistant-avatar">A</div>
                <div className="message-bubble assistant-bubble">
                  <div className="typing-dots">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Attachments Preview */}
        {isExpanded && attachments.length > 0 && (
          <div className="attachments-container">
            {attachments.map((attachment, idx) => (
              <div key={idx} className="attachment">
                {attachment.type === 'image' ? (
                  <div className="image-attachment">
                    <img src={attachment.preview} alt={attachment.name} className="image-preview" />
                    <button className="remove-attachment" onClick={() => removeAttachment(idx)}>
                      <X size={12} className="remove-icon" />
                    </button>
                  </div>
                ) : (
                  <div className="file-attachment">
                    <Paperclip size={14} className="file-icon" />
                    <span className="file-name">{attachment.name}</span>
                    <button className="file-remove" onClick={() => removeAttachment(idx)}>
                      <X size={12} className="remove-icon" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="input-container">
          <div className="input-wrapper">
            <textarea
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={isExpanded ? 2 : 1}
              className="message-textarea"
            />
            <div className="actions-container">
              <input type="file" id="file-upload" multiple ref={fileInputRef} onChange={handleFileUpload} className="hidden" style={{ display: 'none' }} />
              {isExpanded && (
                <button onClick={() => fileInputRef.current.click()} className="attachment-button">
                  <Image size={18} className="attachment-icon" />
                </button>
              )}
              <button onClick={handleSend} className="send-button">
                <Send size={18} className="send-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalistChatbot;
