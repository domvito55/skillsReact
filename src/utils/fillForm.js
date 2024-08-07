/**
 * File: fillForm.js
 * Type: JavaScript
 * Author: mathteixeira55
 * Description: Fill the form textareas with predefined values.
 * Date: 2024-05-30
 * License: MIT
 * Version: 1.0
 */

export function fillForm() {
  let textareas = document.querySelectorAll("textarea");

  let array = [
    "JobSwipe",
    "An app similar to tinder where candidates will create profiles and companies will create job descriptions. The candidates will swipe to the right the job posting they like, and the companies will swipe to the right the candidates they like. When a candidate swipe a job to the right and the company swipe that candidate to the right it will be a match.",
    "It makes easier and more fun to find good positions and candidates who fits well for that position",
    "People looking for job, and companies looking for employees, specially young people who are used to use smartphone apps. The initial focus will be on Canadian job market.",
    "The app will use and algorithm to higher the chances of a good match between candidates skills and job positions, lessening HR work and candidates repetitive tasks.",
    "In a short term, we want to gain as many users as possible, starting with Ontario market. Final goal is to make the app be used worldwide and make a sustainable business that will make profits out of advertising, sponsoring, subscriptions, and so on...",
    "First, approach colleges to get their COOP companies partners and their students to use the app. Later use social media and other kind of internet advertising.",
    "We will make profits out of advertising, sponsoring, subscriptions, and so on...",
    "Indeed and LinkedIn, maybe. The idea is to facilitate the application and the matches, which are basically done manually on those platforms.",
    "Initially, I will need to pay the developers, and the cloud infrastructure, but I am not sure how much that would cost me.",
  ];

  textareas.forEach((textarea, index) => {
    if (index < array.length) {
      textarea.value = array[index];
    }
  });
}
