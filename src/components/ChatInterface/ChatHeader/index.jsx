/**
 * File: ChatHeader/index.jsx
 * Type: React Component
 * Author: mathteixeira55
 * Description: Header component for the chat interface.
 * Date: 2024-07-13
 * License: MIT
 * Version: 1.0
 */

import React from "react";
import styles from "./styles.module.css";

/**
 * ChatHeader Component
 *
 * This component renders the header of the chat interface,
 * displaying the title "Ideation Chat".
 *
 * @component
 * @returns {React.ReactElement} The rendered ChatHeader component
 */
const ChatHeader = () => {
  return (
    <div className={styles.chatHeader}>
      <h5 className="m-0">Ideation Chat</h5>
    </div>
  );
};

export default ChatHeader;
