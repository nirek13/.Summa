import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, Paperclip, X, Maximize2, Minimize2 } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell
} from 'recharts';
import './MinimalistChatbot.css'; // Import the CSS file

// Parse response to identify special blocks for visualization
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
        const labels = labelsMatch[1]
            .split(',')
            .map((s) => s.trim().replace(/'/g, ''));
        const values = valuesMatch[1]
            .split(',')
            .map((s) => parseFloat(s.trim()));

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

// Component to render different graph types
const GraphRenderer = ({ data }) => {
  if (!data || !data.type) return null;

  const chartData = data.labels.map((label, i) => ({
    name: label,
    value: data.values[i]
  }));

  // COLORS defined outside component to avoid recreating on each render
  const COLORS = [
    '#E6F2FF', '#F0F7FF', '#D9E8FF', '#C2DBFF', '#AAD1FF', '#94C5FF'
  ];

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
                <Tooltip contentStyle={{ className: "chart-tooltip" }} />
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
                <Tooltip contentStyle={{ className: "chart-tooltip" }} />
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
                      <Cell
                          key={`cell-${i}`}
                          fill={COLORS[i % COLORS.length]}
                          stroke="#ffffff"
                      />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ className: "chart-tooltip" }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
      );

    default:
      return <div className="text-gray-500">Unsupported graph type: {data.type}</div>;
  }
};

// Component for rendering tables
const TableRenderer = ({ data }) => {
  if (!data || !data.headers || !data.rows) return null;

  return (
      <div className="table-container">
        <table className="data-table">
          <thead>
          <tr className="table-header">
            {data.headers.map((header, i) => (
                <th key={i} className="table-header-cell">{header}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {data.rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="table-row">
                {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="table-cell">{cell}</td>
                ))}
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

// Component for individual messages
const Message = ({ message, isUser }) => {
  const parts = isUser
      ? [{ type: 'text', content: message.text }]
      : parseResponse(message.text);

  return (
      <div className={`message ${isUser ? 'user' : 'assistant'}`}>
        {!isUser && (
            <div className="avatar assistant-avatar">A</div>
        )}

        <div className={`message-bubble ${isUser ? 'user-bubble' : 'assistant-bubble'}`}>
          {parts.map((part, idx) => {
            switch (part.type) {
              case 'text':
                return <div key={idx} className="message-text">{part.content}</div>;
              case 'graph':
                return <GraphRenderer key={idx} data={part.content} />;
              case 'table':
                return <TableRenderer key={idx} data={part.content} />;
              default:
                return null;
            }
          })}
        </div>

        {isUser && (
            <div className="avatar user-avatar">U</div>
        )}
      </div>
  );
};

// Main Chatbot component
const MinimalistChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send message to your backend
  const handleSend = async () => {
    if (!inputMessage.trim() && attachments.length === 0) return;

    // Add the user's message to the UI
    const newUserMessage = {
      text: inputMessage,
      attachments: [...attachments],
      isUser: true,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage('');
    setAttachments([]);
    setIsTyping(true);

    try {
      // Request the server for an AI response
      const response = await fetch('https://genaigenissis.onrender.com/api/chat', {
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
      setMessages((prev) => [
        ...prev,
        { text: data.text, isUser: false }
      ]);
    } catch (error) {
      console.error('Error calling server:', error);
      setIsTyping(false);

      // In case of server error, show fallback
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm sorry, I encountered a server error. Please try again.",
          isUser: false
        }
      ]);
    }
  };

  // Toggle expanded/collapsed state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle file uploads
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        // Show a preview if it's an image
        const reader = new FileReader();
        reader.onload = (evt) => {
          setAttachments((prev) => [
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
        setAttachments((prev) => [
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

  // Remove attachment
  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
      <div className="chat-container">
        <div className={`chat-window ${isExpanded ? 'expanded' : 'collapsed'}`}>
          {/* Header */}
          <div className="chat-header">
            <div>
              <h2 className="chat-title">Virtual Assistant</h2>
              {isExpanded && <p className="chat-subtitle">How can I help you today?</p>}
            </div>

            {messages.length > 0 && (
                <button
                    onClick={toggleExpand}
                    className="toggle-button"
                >
                  {isExpanded ?
                      <Minimize2 size={18} className="toggle-icon" /> :
                      <Maximize2 size={18} className="toggle-icon" />
                  }
                </button>
            )}
          </div>

          {/* Messages area - only shown when expanded */}
          {isExpanded && (
              <div className="messages-container">
                {messages.length === 0 ? (
                    <div className="empty-state">
                      <p className="empty-state-text">No messages yet</p>
                      <p className="empty-state-subtext">Start a conversation by typing a message below</p>
                    </div>
                ) : (
                    messages.map((msg, i) => (
                        <Message key={i} message={msg} isUser={msg.isUser} />
                    ))
                )}

                {/* Typing indicator */}
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

          {/* Attachments preview */}
          {isExpanded && attachments.length > 0 && (
              <div className="attachments-container">
                {attachments.map((attachment, idx) => (
                    <div key={idx} className="attachment">
                      {attachment.type === 'image' ? (
                          <div className="image-attachment">
                            <img
                                src={attachment.preview}
                                alt={attachment.name}
                                className="image-preview"
                            />
                            <button
                                className="remove-attachment"
                                onClick={() => removeAttachment(idx)}
                            >
                              <X size={12} className="remove-icon" />
                            </button>
                          </div>
                      ) : (
                          <div className="file-attachment">
                            <Paperclip size={14} className="file-icon" />
                            <span className="file-name">{attachment.name}</span>
                            <button
                                className="file-remove"
                                onClick={() => removeAttachment(idx)}
                            >
                              <X size={12} className="remove-icon" />
                            </button>
                          </div>
                      )}
                    </div>
                ))}
              </div>
          )}

          {/* Input area */}
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
                {/* Hidden file input */}
                <input
                    type="file"
                    id="file-upload"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    style={{ display: 'none' }}
                />

                {/* Attachment button */}
                {isExpanded && (
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="attachment-button"
                    >
                      <Image size={18} className="attachment-icon" />
                    </button>
                )}

                {/* Send button */}
                <button
                    onClick={handleSend}
                    className="send-button"
                >
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
