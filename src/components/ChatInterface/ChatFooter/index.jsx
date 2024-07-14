/**
 * File: ChatFooter/index.jsx
 * Type: React Component
 * Author: mathteixeira55
 * Description: Footer component for the chat interface, including input and send functionality.
 * Date: 2024-07-13
 * License: MIT
 * Version: 1.0
 */

import React from "react";
import styles from "./styles.module.css";
import sendIcon from "../../../assets/send-icon.png";

/**
 * ChatFooter Component
 *
 * This component renders the footer of the chat interface, including the message input
 * area, send button, and PDF generation button.
 *
 * @component
 * @param {Object} props
 * @param {string} props.input - The current input value
 * @param {number} props.textareaRows - The number of rows for the textarea
 * @param {React.RefObject} props.textareaRef - Ref for the textarea element
 * @param {Function} props.handleInputChange - Function to handle input changes
 * @param {Function} props.handleSendMessage - Function to handle sending messages
 * @param {Function} props.generatePDF - Function to generate PDF
 * @param {boolean} props.isLoading - Flag indicating if the chat is loading
 */
const ChatFooter = ({
  input,
  textareaRows,
  textareaRef,
  handleInputChange,
  handleSendMessage,
  generatePDF,
  isLoading,
}) => {
  return (
    <div className={styles.chatFooter}>
      <textarea
        ref={textareaRef}
        className={`form-control ${styles.textarea}`}
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
      <button
        className="btn btn-primary mx-1"
        onClick={handleSendMessage}
        disabled={isLoading}
      >
        <img
          src={sendIcon}
          alt="Send icon"
          width="24"
          height="24"
          className="d-inline-block align-text-top rounded-circle"
        />
      </button>
      <button className="btn btn-secondary" onClick={generatePDF}>
        Get PDF
      </button>
    </div>
  );
};

export default ChatFooter;