/**
 * File: PageBPAPI.js
 * Type: API Service
 * Author: mathteixeira55
 * Description: API service for 1 Page Business Plan functionality
 * Date: 2024-07-13
 * License: MIT
 * Version: 1.0
 */ 
const API_BASE_URL = "http://skillsdemo.us-east-1.elasticbeanstalk.com/api";

export async function generateBusinessPlan(businessInfo) {
  return fetch(`${API_BASE_URL}/pagebp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ businessInfo }),
  });
}