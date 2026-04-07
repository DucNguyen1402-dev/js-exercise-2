import { INPUT_BASE_STATE } from "../ui-config.js";
import {resetDependentInteractionHighlightToDefault} from "../event/dependent.js";
/*
/**
 * ==========================================
 *          1. USER INTERACTION
 * ==========================================
 */

/* =========== 1.1 DATA CONFIG ============  */

const INTERACTION_ERROR_CLASSES = {
  input: {
    empty: ["focus:ring-yellow-500"],
    invalid: ["focus:ring-rose-500"],
    tooHigh: ["focus:ring-yellow-500"],
  },
  blur: {
    empty: ["ring-1", "ring-yellow-500"],
    invalid: ["ring-1", "ring-rose-500"],
    tooHigh: ["ring-1", "ring-yellow-500"],
  },
};

/* =========== 1.2 ERROR STATE MANAGERMENT ============  */

export function clearDependentErrorState(input, currentError) {
  if (!currentError) return;
  input.classList.remove(
    ...INTERACTION_ERROR_CLASSES[currentError.eventType][
      currentError.errorType
    ],
  );
  input.classList.add(...INPUT_BASE_STATE.focus);
  currentError = null;
}

export function applyDependentIncomeErrorState(input, eventType, errorType) {
  clearDependentErrorState(input);

  if (eventType === "input") {
    input.classList.remove(...INPUT_BASE_STATE.focus);
  }

  input.classList.add(...INTERACTION_ERROR_CLASSES[eventType][errorType]);
  return { eventType, errorType };
}

/*
/**
 * 
 * ==========================================
 *          1. FORM SUBMISSION
 * ==========================================
 */

/* =========== 1.1 DATA CONFIG ============  */

let currentErrorType = null;

const SUBMISSION_ERROR_CLASSES = {
  empty: ["ring-1", "ring-yellow-500"],
  invalid: ["ring-1", "ring-rose-500"],
  tooHigh: ["ring-1", "ring-yellow-500"],
};

/* ========= 1.2 ERROR STATE MANAGEMENT==========  */

// PUBlIC API

export function resetDependentUI({input, warning}){
  resetDependentErrorUI({input, warning});
  input.value ="";
  resetDependentInteractionHighlightToDefault();  
}



export function handleErrorDependent({ input, warning, error }) {
  applyErrorHighlight(input, error);
  renderErrorMessage(warning, error);
}

export function resetDependentErrorUI({ input, warning }) {
  resetErrorMessage(warning);
  remveErrorHighlight(input, currentErrorType);
  currentErrorType = null;
}

// INTERNAL - SHOW ERROR
function applyErrorHighlight(input, error ) {
  remveErrorHighlight(input, currentErrorType);

  input.classList.add(...SUBMISSION_ERROR_CLASSES[error.type]);
  currentErrorType = error.type;
}

function renderErrorMessage(warning, error) {
  warning.classList.remove("hidden");
  warning.textContent = error.message;
}

// INTERNAL - RESET ERROR
function resetErrorMessage(warning) {
  warning.classList.add("hidden");
  warning.textContent = "";
}

function remveErrorHighlight(input, currentErrorType) {
  if (!currentErrorType) return;
  input.classList.remove(...SUBMISSION_ERROR_CLASSES[currentErrorType]);
}
