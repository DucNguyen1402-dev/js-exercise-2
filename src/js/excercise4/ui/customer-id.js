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
    format: ["focus:ring-rose-500"],
    length: ["focus:ring-amber-500"],
  },
  blur: {
    empty: ["ring-1", "ring-yellow-500"],
    format: ["ring-1", "ring-rose-500"],
    length: ["ring-1", "ring-amber-500"],
  },
};

/* =========== 1.2 ERROR STATE MANAGERMENT ============  */

export function applyInputInteractionHighlightError(
  input,
  eventType,
  errorType,
) {
  if (eventType === "focus") {
    input.classList.remove("focus:ring-blue-500/60");
  }

  input.classList.add(...INTERACTION_ERROR_CLASSES[eventType][errorType]);

  return { eventType, errorType };
}

export function resetInputInteractionHighlightError(input, currentError) {
  if (!currentError) return;
  input.classList.remove(
    ...INTERACTION_ERROR_CLASSES[currentError.eventType][
      currentError.errorType
    ],
  );
  input.classList.add("focus:ring-blue-500/60");
  currentError = null;
}

/*
/**
 * 
 * ==========================================
 *          2. FORM SUBMISSION
 * ==========================================
 */

/* =========== 2.1 DATA CONFIG ============  */

/**
 * UI style mapping for different validation error input types.
 * @type {Object<string, string[]>}
 */

const SUBMISSION_ERROR_CLASSES = {
  empty: ["ring-1", "ring-yellow-500"],
  length: ["ring-1", "ring-amber-500"],
  format: ["ring-1", "ring-rose-500"],
};

/** * Tracks the currently active error type to facilitate style cleanup.
 * @type {string|null}
 */
let currentErrorType = null;


/* ========= 2.2 ERROR STATE MANAGEMENT==========  */

// PUBlIC API

/**
 * Updates input styling based on error type.
 * @param {HTMLElement} input - {customerId}
 * @param {Object} error - { type: string, message: string }
 */
function showInputHighlight(input, error) {
  removeInputHighlight(input, currentErrorType);
  input.classList.add(...SUBMISSION_ERROR_CLASSES[error.type]);
  currentErrorType = error.type;
}

export function resetCustomerIdError({ input, warning }) {
  hideMessage(warning);
  removeInputHighlight(input, currentErrorType);
}


// INTERNAL - SHOW ERROR
/**
 * Renders Customer ID error state.
 * @param {{input: HTMLElement, warning: HTMLElement}} elements
 * @param {Object} error
 */
export function renderCustomerIdError({ input, warning }, error) {
  showInputHighlight(input, error);
  showMessage(warning, error);
}

/**
 * Displays error message text.
 * @param {HTMLElement} warning
 * @param {Object} error
 */
function showMessage(warning, error) {
  warning.classList.remove("hidden");
  warning.textContent = error.message;
}

// INTERNAL - RESET ERROR
function hideMessage(warning) {
  warning.classList.add("hidden");
  warning.textContent = "";
}
/**
 * Clears existing error styles.
 * @param {HTMLElement} input
 * @param {string} currentErrorType
 */

function removeInputHighlight(input, currentErrorType) {
  if (!currentErrorType) return;
  input.classList.remove(...SUBMISSION_ERROR_CLASSES[currentErrorType]);
}
