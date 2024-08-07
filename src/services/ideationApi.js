/**
 * File: PageBPAPI.js
 * Type: API Service
 * Author: mathteixeira55
 * Description: API service for chat functionality
 * Date: 2024-07-13
 * License: MIT
 * Version: 1.0
 */

const API_BASE_URL = "http://localhost:8000/api";

/**
 * Sends a message to the chat API
 * @param {string} message - The message to send
 * @returns {Promise<Object>} - The response from the API
 * @throws {Error} - If the API call fails
 */
export const sendMessage = async (message) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ideation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // stringify will use the name "message" for the key, so the output will
      //  be like { "message": "your message here" }
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

/**
 * Retrieves chat history from the API
 * @param {string} sessionId - The ID of the chat session
 * @returns {Promise<Array>} - An array of message objects
 * @throws {Error} - If the API call fails
 */
export const getChatHistory = async (sessionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chathistory/${sessionId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch chat history");
    }

    const data = await response.json();
    return data.messages;
  } catch (error) {
    console.error("Error fetching chat history:", error);
    throw error;
  }
};
