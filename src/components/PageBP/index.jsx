/**
 * File: PageBP/index.jsx
 * Type: React Component
 * Author: mathteixeira55
 * Description: 1-page BP form component for the React application.
 * Date: 2024-07-29
 * License: MIT
 * Version: 1.0.0
 */

// ### Imports ###
import React from "react";
import { useOutletContext } from "react-router-dom";

import { usePageBPLogic } from "../../hooks/usePageBPLogic";
import { fillForm } from "../../utils/fillForm";

import styles from "./styles.module.css";
import sendIcon from "../../assets/send-icon.png";
// ### end Imports ###

export default function PageBP() {
  const { setStreamData, setError } = useOutletContext();

  const { handleSubmit } = usePageBPLogic({
    setStreamData,
    setError,
  });

  return (
    <form className={`mx-4 ${styles.formStyle}`} id="businessForm">
      <div className="mb-3">
        <label htmlFor="question1" className="form-label">
          What is the name of your business?
        </label>
        <textarea className="form-control" id="question1" rows="1"></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="question2" className="form-label">
          What product or service will your business offer?
        </label>
        <textarea className="form-control" id="question2" rows="3"></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="question3" className="form-label">
          What problem does your product or service solve for your target
          market?
        </label>
        <textarea className="form-control" id="question3" rows="3"></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="question4" className="form-label">
          Who is your target market? Please provide details such as
          demographics, location, and specific needs.
        </label>
        <textarea className="form-control" id="question4" rows="3"></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="question5" className="form-label">
          What is your unique selling proposition (USP) or competitive
          advantage?
        </label>
        <textarea className="form-control" id="question5" rows="3"></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="question6" className="form-label">
          What are your short-term and long-term business goals?
        </label>
        <textarea className="form-control" id="question6" rows="3"></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="question7" className="form-label">
          What marketing strategies will you use to promote your product or
          service?
        </label>
        <textarea className="form-control" id="question7" rows="3"></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="question8" className="form-label">
          What is your revenue model? How will your business make money?
        </label>
        <textarea className="form-control" id="question8" rows="3"></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="question9" className="form-label">
          Who are your main competitors, and what differentiates you from them?
        </label>
        <textarea className="form-control" id="question9" rows="3"></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="question10" className="form-label">
          What are your initial funding requirements and how do you plan to use
          the funds?
        </label>
        <textarea className="form-control" id="question10" rows="3"></textarea>
      </div>
      <div className="text-end">
        <button
          type="button"
          id="fillFormButton"
          className="btn btn-primary mb-3"
          onClick={fillForm}
        >
          Fill Form
        </button>
        <button
          type="submit"
          className="btn btn-secondary mb-3"
          onClick={handleSubmit}
        >
          <img
            src={sendIcon}
            alt="Send icon"
            width="24"
            height="24"
            className="d-inline-block align-text-top rounded-circle"
          />
        </button>
      </div>
    </form>
  );
}
