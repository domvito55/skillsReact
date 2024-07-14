/**
 * File: ChatInterface/index.jsx
 * Type: React Component
 * Author: mathteixeira55
 * Description: Main ChatInterface component that composes the chat application.
 * Date: 2024-07-13
 * License: MIT
 * Version: 1.0
 */

import React, { useRef } from "react";
import styles from "./styles.module.css";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { useChatLogic } from "../../hooks/useChatLogic";

/**
 * ChatInterface Component
 *
 * This component serves as the main container for the chat application.
 * It composes the ChatHeader, ChatBody, and ChatFooter components and
 * manages the chat logic through the useChatLogic custom hook.
 *
 * @component
 * @returns {React.ReactElement} The rendered ChatInterface component
 */
const ChatInterface = () => {
  const {
    messages,
    input,
    textareaRows,
    isLoading,
    error,
    chatBodyRef,
    handleInputChange,
    handleSendMessage,
    generatePDF,
  } = useChatLogic();

  return (
    <div className="container-fluid">
      <div className={styles.chatWindow}>
        <ChatHeader />
        <ChatBody messages={messages} chatBodyRef={chatBodyRef} />
        <ChatFooter
          input={input}
          textareaRows={textareaRows}
          handleInputChange={handleInputChange}
          handleSendMessage={handleSendMessage}
          generatePDF={generatePDF}
          isLoading={isLoading}
        />
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
    </div>
  );
};

export default ChatInterface;