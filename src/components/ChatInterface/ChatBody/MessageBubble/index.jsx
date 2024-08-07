/**
 * File: MessageBubble/index.jsx
 * Type: React Component
 * Author: mathteixeira55
 * Description: Component for rendering individual message bubbles in the chat interface.
 * Date: 2024-07-13
 * License: MIT
 * Version: 1.0
 */

import React from "react";
import styles from "./styles.module.css";
import ReactMarkdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import LoadingMessage from "./LoadingMessage";
import logo from "../../../../assets/skillsladder-logo.png";
import userIcon from "../../../../assets/user-icon.png";

/**
 * MessageBubble Component
 *
 * This component renders an individual message bubble, handling both sent and received messages.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} props.text - The message text
 * @param {string} props.sender - The sender of the message ('You' or 'skillsladder assistant')
 * @param {string} props.timestamp - The timestamp of the message
 * @returns {React.ReactElement} The rendered MessageBubble component
 */
const MessageBubble = ({ text, sender, timestamp }) => {
  // Determine if the message was sent by the user
  const isSent = sender === "You";
  // Choose the appropriate CSS class based on whether the message was sent or received
  const bubbleClass = isSent ? styles.sent : styles.received;

  return (
    <div className={`${styles.messageWrapper} ${bubbleClass}`}>
      <div className={`${styles.messageBubble} ${bubbleClass}`}>
        {/* Display the appropriate icon based on the sender */}
        <img
          src={isSent ? userIcon : logo}
          alt={isSent ? "User Icon" : "skillsladder Icon"}
          width="24"
          height="24"
          className="d-inline-block align-text-middle rounded-circle"
        />
        {/* Render the message content */}
        {isSent ? (
          // For sent messages, render plain text
          text
        ) : text !== "..." ? (
          // For received messages, use ReactMarkdown to render formatted text
          <ReactMarkdown
            className={styles.markdownContent}
            rehypePlugins={[
              [
                rehypeExternalLinks,
                {
                  target: "_blank",
                  rel: ["nofollow", "noopener", "noreferrer"],
                },
              ],
            ]}
            allowedElements={[
              "p",
              "h1", "h2", "h3", "h4", "h5", "h6",
              "ul", "ol", "li",
              "strong", "em",
            ]}
          >
            {text}
          </ReactMarkdown>
        ) : (
          // If the message is "...", render the loading symbol
          <LoadingMessage />
        )}
      </div>
      {/* Display the timestamp for the message */}
      <div className={styles.timestamp}>{timestamp}</div>
    </div>
  );
};

export default MessageBubble;
