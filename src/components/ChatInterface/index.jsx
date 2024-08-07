/**
 * File: ChatInterface/index.jsx
 * Type: React Component
 * Author: mathteixeira55
 * Description: Main ChatInterface component that composes the chat application.
 * Date: 2024-07-13
 * License: MIT
 * Version: 1.0
 */

// ### Imports ###
import React from "react";

import styles from "./styles.module.css";

import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

import { useChatLogic } from "../../hooks/useChatLogic";
// ### end Imports ###

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
    // state - passed for the scroll to bottom useEffect
    messages,
    // state - passed to handleInputChange and handleSendMessage
    input,
    // state - passed to handleInputChange and handleSendMessage
    textareaRows,
    // state - passed to handleSendMessage
    isLoading,
    // state - passed to handleSendMessage (holds error message)
    error,
    // ref - passed to scrollToBottom (reference to the chat body element
    // the outter div that contains all messages)
    chatBodyRef,
    // function - to be used by the ChatFooter component
    handleInputChange,
    // function - to be used by the ChatFooter component
    handleSendMessage,
    // function - to be used by the ChatFooter component
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