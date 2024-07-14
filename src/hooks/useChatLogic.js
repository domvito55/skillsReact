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
import { sendMessage } from '../services/api';

export const useChatLogic = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [textareaRows, setTextareaRows] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const placeholderIndexRef = useRef(null);
  const chatBodyRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);
  const handleInputChange = useCallback((e) => {
    const textareaLineHeight = 24;
    const previousRows = e.target.rows;
    e.target.rows = 1;
    const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    setInput(e.target.value);
    setTextareaRows(currentRows > 1 ? currentRows : 1);
  }, []);
  
const handleSendMessage = useCallback(async () => {
  if (input.trim() === '') return;

  const newMessage = {
    text: input,
    sender: 'You',
    timestamp: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };

  setMessages((prevMessages) => [...prevMessages, newMessage]);
  setInput('');
  setTextareaRows(1); // Reset textarea rows to 1

  // Add placeholder for assistant's response
  const placeholderMessage = {
    text: '...',
    sender: 'skillsladder assistant',
    timestamp: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
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
    const response = await sendMessage(input);
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let receivedMessage = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      receivedMessage += decoder.decode(value, { stream: true });

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const messageIndex = placeholderIndexRef.current;
        if (messageIndex !== null) {
          updatedMessages[messageIndex] = {
            ...updatedMessages[messageIndex],
            text: receivedMessage,
          };
        }
        return updatedMessages;
      });
    }
  } catch (err) {
    setError('Failed to send message. Please try again.');
    console.error('Error sending message:', err);
  } finally {
    setIsLoading(false);
  }
}, [input]);

  const generatePDF = useCallback(() => {
    // Implement PDF generation logic here
    console.log('Generating PDF...');
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