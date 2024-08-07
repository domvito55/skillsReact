/**
 * File: useChatLogic.js
 * Type: Custom React Hook
 * Author: mathteixeira55
 * Description: Custom hook for managing chat logic and state
 * Date: 2024-07-13
 * License: MIT
 * Version: 1.0
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { sendMessage } from '../services/ideationApi';

/**
 * Message object type definition
 * @typedef {Object} Message
 * @property {string} text - The message text.
 * @property {string} sender - The sender of the message.
 * @property {string} timestamp - The timestamp of the message.
 */

/**
 * Custom hook for managing chat logic and state
 * @returns {{
 *   messages: Message[],
 *   input: string,
 *   textareaRows: number,
 *   isLoading: boolean,
 *   error: string | null,
 *   chatBodyRef: React.MutableRefObject<null>,
 *   handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
 *   handleSendMessage: () => Promise<void>,
 *   generatePDF: () => void
 * }}
 */
export const useChatLogic = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [textareaRows, setTextareaRows] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reference to the chat body element
  const chatBodyRef = useRef(null);
  // This one doesn't refer to a DOM element, but a value that will persist
  // It is similar to useState(null), but it doesn't trigger re-renders
  // when the value changes. It's useful for storing values across renders.
  // It is like a class property that persists across renders.
  const placeholderIndexRef = useRef(null);

  // ------------------------- Scroll to Bottom Logic --------------------------
  // When passing functions down to child components or in useEffect dependencies,
  // it's important to use useCallback to memoize the function and prevent unnecessary
  // re-renders or effects due to function reference changes.
  const scrollToBottom = useCallback(() => {
    // current is the DOM element
    // scrollTop and scrollHeight are properties of the DOM element
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  // ------------------------- Footer: textarea logic --------------------------
  const handleInputChange = useCallback((e) => {
    // Dynamically adjust textarea rows based on content
    const textareaLineHeight = 24;
    const previousRows = e.target.rows;
    e.target.rows = 1;
    const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    // If the user type something in the textarea, update the input state
    setInput(e.target.value);
    setTextareaRows(currentRows > 1 ? currentRows : 1);
  }, []);


  // ------------------------- Footer: submit button ---------------------------
  const handleSendMessage = useCallback(async () => {
    if (input.trim() === "") return;

    const newMessage = {
      text: input,
      sender: "You",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
    // Reset textarea rows to 1
    setTextareaRows(1);

    // Add placeholder for assistant's response
    const placeholderMessage = {
      text: "...",
      sender: "skillsladder assistant",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, placeholderMessage];
      placeholderIndexRef.current = updatedMessages.length - 1;
      return updatedMessages;
    });

    setIsLoading(true);
    setError(null);

    try {
      // send message is defined in the API service
      const response = await sendMessage(input);
      // response.body is a readable stream, and getReader() returns a reader
      // that allows reading the stream in chunks
      const reader = response.body.getReader();
      // TextDecoder is used to decode the stream data, which normally comes
      // in Uint8Array format
      const decoder = new TextDecoder("utf-8");
      let receivedMessage = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        // Append each chunk of data to the receivedMessage
        receivedMessage += decoder.decode(value, { stream: true });

        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const messageIndex = placeholderIndexRef.current;
          if (messageIndex !== null) {
            // Update the placeholder message with the received message
            // The spread operator copies the properties of the previous message object
            // and then we update the text property with the received message
            updatedMessages[messageIndex] = {
              ...updatedMessages[messageIndex],
              text: receivedMessage,
            };
          }
          return updatedMessages;
        });
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error("Error sending message:", err);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const messageIndex = placeholderIndexRef.current;
        if (
          messageIndex !== null &&
          updatedMessages[messageIndex].text === "..."
        ) {
          // Change the placeholder message content to blank
          updatedMessages[messageIndex] = {
            ...updatedMessages[messageIndex],
            text: "",
          };
        }
        return updatedMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, [input]);


  // ------------------------- Footer: generate PDF ----------------------------
  const generatePDF = useCallback(() => {
    // Implement PDF generation logic here
    console.log("Generating PDF...");
  }, []);

  return {
    messages,
    input,
    textareaRows,
    isLoading,
    error,
    chatBodyRef,
    handleInputChange,
    handleSendMessage,
    generatePDF,
  };
};