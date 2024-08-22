/**
 * File: usePageBPLogic.js
 * Type: React Custom Hook
 * Author: mathteixeira55
 * Description: Custom hook to handle the logic for the PageBP component.
 * Date: 2024-07-29
 * License: MIT
 * Version: 1.0.0
 */

// ### Imports ###
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { generateBusinessPlan } from "../services/pageBPAPI";
// ### end Imports ###

/**
 * Custom hook to handle the logic for the PageBP component.
 * @param {Object} param0 - Object containing the setStreamData and setError functions.
 * @returns {Object} - Object containing the handleSubmit and generateDoc functions.
 */
export function usePageBPLogic({ setStreamData, setError }) {
  const navigate = useNavigate();

  /**
   * Function to handle the form submission.
   * @param {Object} e - Event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    //--------------- Extract business information from form -------------------
    let businessInfo = "";
    let textareas = document.querySelectorAll("textarea");

    textareas.forEach((textarea) => {
      let label = document.querySelector(`label[for="${textarea.id}"]`);
      if (label) {
        businessInfo +=
          label.textContent.replace(/\s+/g, " ").trim() +
          " " +
          textarea.value +
          "\n";
      }
    });
    //----------- end Extract business information from form -------------------

    // Navigate to preview
    navigate("preview");

    // Generate the business plan
    generateDoc(businessInfo);
  };

  /**
   * Function to generate the business plan document.
   * @param {string} businessInfo - Information about the business.
   * @returns {Promise<void>}
   * @throws {Error} - Error message if network response is not ok.
   */
  const generateDoc = async (businessInfo) => {
    setError(null);
    try {
      // Call the API to generate the business plan
      const response = await generateBusinessPlan(businessInfo);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      // Read the stream data
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const decodedChunk = decoder.decode(value, { stream: true });
        handleStream(decodedChunk);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStream = useCallback(
    (chunk) => {
      setStreamData((prevData) => prevData + chunk);
    },
    [setStreamData]
  );

  return { handleSubmit };
}
