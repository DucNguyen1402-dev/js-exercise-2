// import { initDOM } from "./dom.js";

// const DOM = initDOM();


// function calculateFinalScore() {
//   const area = DOM.selectArea.value;
//   const category = DOM.selectCaterogy.value;

//   const priorityPoint =
//     PRIORITY_POINTS.area[area] + PRIORITY_POINTS.caterogy[category];

//   let totalSubject = 0;
//   let hasZeroScore = false;
//   DOM.subjectInput.forEach((sub) => {
//     const score = sub.valueAsNumber;
//     totalSubject += score;
//     if (score === 0) hasZeroScore = true;
//   });

//   return { finalScore: priorityPoint + totalSubject, hasZeroScore };
// }

// const areaState = {
//   success: "success",
//   failed: "failed",
//   hasZeroScore: "hasZeroScore",
// };
// DOM.checkArea._state = null;


// const DISPLAY = {
//   hasZeroScore: {
//     bg: "bg-rose-500",
//     icon: DOM.sadIcon,
//     message:
//       "Unfortunately, you did not pass due to a score of 0 in one or more subjects.",
//   },
//   success: {
//     bg: "bg-green-500",
//     icon: DOM.happyIcon,
//     message: `Congratulations! You passed.`,
//   },
//   failed: {
//     bg: "bg-purple-500",
//     icon: DOM.sadIcon,
//     message: `Unfortunately, you did not pass.`,
//   },
// };

// function displayResult(state, finalScore) {

//   resetCheckArea();

//   const config = DISPLAY[state];
//   DOM.checkArea.classList.add(config.bg);
//   config.icon.classList.remove("hidden");
//   DOM.checkAreaText.textContent = config.message + `Your score: ${finalScore}`;
// }

// function getState(result){

//   if (result.hasZeroScore) {
//     return areaState.hasZeroScore;
//   }
//   const benchmark = DOM.benchmarkInput.valueAsNumber;
//   if (result.finalScore >= benchmark) {
//     return areaState.success;
//   }

//   if (result.finalScore < benchmark) {
//     return areaState.failed;
//   }
 
// }

// function handleResult() {
//   const result = calculateFinalScore();

//   const state = getState(result);

//   displayResult(state, result.finalScore);

//   DOM.checkArea._state = state;
// }

// function checkAdmission() {
//   const isValidBenmarkInput = validateBenmarkInput();
//   const isValidSubjectInput = subjectValidation.validate();
//   if (!isValidBenmarkInput.isValid || !isValidSubjectInput.isValid) {
//     return;
//   }
//   handleResult();
// }