import { INPUT_BASE_STATE } from "../ui-config.js";
import {resetIncomeInteractionHighlightToDefault} from "../event/income.js";
/**
 * ==========================================
 *           1. USER INTERACTION
 * ==========================================
 */

/* =========== 1.1 DATA CONFIG ======== */

const INTERACTION_ERROR_TYPE_GROUP = {
  empty: "warning",
  tooLow: "warning",
  tooHigh: "warning",
  invalid: "error",
};

const INTERACTION_ERROR_CLASSES = {
  input: {
    warning: ["focus:ring-yellow-500"],
    error: ["focus:ring-rose-500"],
  },
  blur: {
    warning: ["ring-1", "ring-yellow-500"],
    error: ["ring-1", "ring-rose-500"],
  },
};

function getInteractionErrorClass(eventType, errorType) {
  return INTERACTION_ERROR_CLASSES[eventType][
    INTERACTION_ERROR_TYPE_GROUP[errorType]
  ];
}

/*========= 1.2 ERROR STATE MANAGEMENT ==========*/

// PUBLIC API

export function clearIncomeErrorState(input, currentError) {
  if (!currentError) return;

  input.classList.remove(
    ...getInteractionErrorClass(currentError.eventType, currentError.errorType),
  );

  currentError = null;
  input.classList.add(...INPUT_BASE_STATE.focus);
}

export function applyIncomeErrorState(input, eventType, errorType) {
  if (eventType === "input") {
    input.classList.remove(...INPUT_BASE_STATE.focus);
  }

  input.classList.add(...getInteractionErrorClass(eventType, errorType));
  return { eventType, errorType };
}

/*
/**
 * ==========================================
 *           2. FORM SUBMISSION
 * ==========================================
 */

/* =========== 2.1 DATA CONFIG ======== */

const SUBMISSION_ERROR_TYPE_GROUP = {
  empty: "warning",
  tooLow: "warning",
  tooHigh: "warning",
  invalid: "error",
};

const SUBMISSION_ERROR_CLASSES = {
  warning: "ring-yellow-500",
  error: "ring-rose-500",
};

let currentErrorType = null;

/*=========== 2.1 ERROR STATE MANAGEMENT ======== */

// PUBLIC

export function resetIncomeUI({input, warning}){
  resetIncomeInputErrorUI({input, warning});
  input.value ="";
  resetIncomeInteractionHighlightToDefault();
  
}

export function handleInvalidIncome({ input, warning, state }) {
  applyErrorHighlight(input, state);
  renderErrorMessage(warning, state);
}
export function resetIncomeInputErrorUI({ input, warning }) {
  resetErrorMessage(warning);
  removeErrorHighlight(input, currentErrorType);
  currentErrorType = null;
}

// INTERNAL - VIEW UPDATES
export function getSubmitErrorClass(type) {
  return [
    "ring-1",
    SUBMISSION_ERROR_CLASSES[SUBMISSION_ERROR_TYPE_GROUP[type]],
  ];
}

function applyErrorHighlight(input, { error }) {
  removeErrorHighlight(input, currentErrorType);
  input.classList.add(...getSubmitErrorClass(error.type));
  currentErrorType = error.type;
}

function renderErrorMessage(warning, { error }) {
  warning.classList.remove("hidden");
  warning.textContent = error.message;
}

// INTERNAL - RESET
function resetErrorMessage(warning) {
  warning.classList.add("hidden");
  warning.textContent = "";
}

function removeErrorHighlight(input, currentErrorType) {
  if (!currentErrorType) return;
  input.classList.remove(...getSubmitErrorClass(currentErrorType));
}
