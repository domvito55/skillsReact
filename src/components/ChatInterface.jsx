/**
 * File: ChatInterface.jsx
 * Type: JavaScript
 * Author: mathteixeira55
 * Description: Chat interface component for the React application.
 * Date: 2024-06-18
 * License: MIT
 * Version: 1.0
 */

import React, { useState, useEffect, useRef } from "react";
import "./ChatInterface.css";
import logo from "../assets/skillsladder-logo.png";
import userIcon from "../assets/user-icon.png";

/**
 * ChatInterface component renders a chat interface with message input and display area.
 * @component
 * @returns {JSX.Element} The ChatInterface component.
 */
const ChatInterface = () => {
  // --------------- State variables ---------------
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [textareaRows, setTextareaRows] = useState(1);
  const chatBodyRef = useRef(null);
  const textareaRef = useRef(null);

  // --------------- Functions ---------------
  /**
   * Handles sending a new message.
   * Adds the new message to the messages state and clears the input field.
   */
  const handleSendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = {
        text: input,
        sender: "You",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInput("");
      setTextareaRows(1);
    }
  };

  /**
   * Emulates receiving a message.
   * Adds a predefined message from "skillsladder assistant" to the messages state.
   */
  const handleReceiveMessage = () => {
    const newMessage = {
      text: "Hi, I am skillsladder assistant I am skillsladder assistant I am skillsladder assistant I am skillsladder assistant I am skillsladder assistant",
      sender: "skillsladder assistant",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);
  };

  /**
   * Scrolls the chat body and the page to the bottom whenever messages change.
   */
  useEffect(() => {
    if (messages.length > 0 && chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [messages]);

  /**
   * Adjusts the number of rows in the textarea as the user types.
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - The change event for the textarea.
   */
  const handleInputChange = (e) => {
    const textareaLineHeight = 24;
    const previousRows = e.target.rows;
    e.target.rows = 1;
    const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    setInput(e.target.value);
    setTextareaRows(currentRows > 1 ? currentRows : 1);
  };

  // --------------- Rendering ---------------
  return (
    <div className="container-fluid">
      <div className="chat-window">
        <div className="chat-header">
          <h5 className="m-0">Ideation Chat</h5>
        </div>
        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((message, index) =>
            message.sender === "You" ? (
              <div key={index} className="message-wrapper sent">
                <div className="message-bubble sent">
                  <img
                    src={userIcon}
                    alt="SkillsLadder Logo"
                    width="24"
                    height="24"
                    className="d-inline-block align-text-top rounded-circle"
                  />
                  {message.text}
                </div>
                <div className="timestamp">{message.timestamp}</div>
              </div>
            ) : (
              <div key={index} className="message-wrapper received">
                <div className="message-bubble received">
                  <img
                    src={logo}
                    alt="Sender Logo"
                    width="24"
                    height="24"
                    className="d-inline-block align-text-top rounded-circle"
                  />
                  {message.text}
                </div>
                <div className="timestamp">{message.timestamp}</div>
              </div>
            )
          )}
        </div>
        <div className="chat-footer">
          <textarea
            ref={textareaRef}
            className="form-control"
            placeholder="Type your message..."
            value={input}
            rows={textareaRows}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <button className="btn btn-primary mx-1" onClick={handleSendMessage}>
            Send
          </button>
          <button className="btn btn-secondary" onClick={handleReceiveMessage}>
            Emulate Receive
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
