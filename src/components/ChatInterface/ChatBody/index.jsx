/**
 * File: ChatBody/index.jsx
 * Type: React Component
 * Author: mathteixeira55
 * Description: Body component for the chat interface, displaying messages.
 * Date: 2024-07-13
 * License: MIT
 * Version: 1.0
 */

import React from "react";
import styles from "./styles.module.css";
import MessageBubble from "../MessageBubble";

/**
 * ChatBody Component
 *
 * This component renders the body of the chat interface, displaying all messages.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Array} props.messages - Array of message objects to display
 * @param {React.RefObject} props.chatBodyRef - Ref object for the chat body element
 * @returns {React.ReactElement} The rendered ChatBody component
 */
const ChatBody = ({ messages, chatBodyRef }) => {
  return (
    <div className={styles.chatBody} ref={chatBodyRef}>
      {/* Map through the messages array. 
          'index' is automatically provided by the map function and used as a key.
          In a production app, consider using a unique ID if available. */}
      {messages.map((message, index) => (
        <MessageBubble
          key={index}
          text={message.text}
          sender={message.sender}
          timestamp={message.timestamp}
        />
      ))}
    </div>
  );
};

export default ChatBody;
