import {INPUT_BASE_STATE} from "../ui-config.js";
import {resetNameInteractionHighlightToDefault} from "../event/name.js";

/*
/**
 * =====================================
 *          1. USER INTERACTION
 * =====================================
 */

/*========= 1.1 DATA CONFIG ==========*/

const INTERACTION_ERROR_CLASS = {
  input: {
    empty: ["focus:ring-yellow-500"],
    length: ["focus:ring-yellow-500"],
    format: ["focus:ring-rose-500"],
  },
  blur: {
    empty: ["ring-1", "ring-yellow-500"],
    length: ["ring-1", "ring-yellow-500"],
    format: ["ring-1", "ring-rose-500"],
  },
};


/*========= 1.2 ERROR STATE MANAGEMENT ==========*/

// PUBLIC APIs

export function clearNameInteractionErrorHighlight(input, currentError) {
  if (!currentError) return;

  input.classList.remove(
    ...INTERACTION_ERROR_CLASS[currentError.eventType][currentError.errorType],
  );

  currentError = null;
  input.classList.add(...INPUT_BASE_STATE.focus);
}


export function applyNameInteractionErrorHighlight(input, eventType, errorType) {

  if (eventType === "input") {
    input.classList.remove(...INPUT_BASE_STATE.focus);
  }

  input.classList.add(...INTERACTION_ERROR_CLASS[eventType][errorType]);
  return {eventType, errorType};
}

/*
/**
 * =====================================
 *          2. FORM SUBMISSION 
 * =====================================
 */

/*========= 2.1 DATA CONFIG ==========*/

const SUBMISION_ERROR_CLASS = {
  empty: ["ring-1", "ring-yellow-500"],
  length: ["ring-1", "ring-yellow-500"],
  format: ["ring-1", "ring-rose-500"],
};

let currentErrorType = null;

/*========= 1.2 ERROR STATE MANAGEMENT ==========*/

// PUBLIC API

export function resetNameUI({input, warning}){
  resetNameInputErrorUI({input, warning});
  input.value = "";
  resetNameInteractionHighlightToDefault();
}

export function handleNameError({input, warning, error}) {
  applyErrorHighlight(input, error);
  renderErrorMessage(warning,error );
  clearNameInteractionErrorHighlight(input, )
  currentErrorType = null;
}

export function resetNameInputErrorUI({input, warning}) {
  resetErrorMessage(warning);
  removeErrorHighlight(input, currentErrorType);
  currentErrorType = null;
}


// INTERNAL  – VIEW UPDATES
function applyErrorHighlight(input, error) {
  removeErrorHighlight(currentErrorType);
  input.classList.add(...SUBMISION_ERROR_CLASS[error.type]);
  currentErrorType = error.type;
}
function renderErrorMessage(warning,error) {
  warning.classList.remove("hidden");
  warning.textContent = error.message;
}

// INTERNAL – RESET
function resetErrorMessage(warning) {
  warning.classList.add("hidden");
  warning.textContent = "";
}

function removeErrorHighlight(input, currentErrorType) {
  if (!currentErrorType) return;
  input.classList.remove(...SUBMISION_ERROR_CLASS[currentErrorType]);
}
