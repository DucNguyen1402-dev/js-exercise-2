/**
 * ================================
 *    1. DATA CONFIG
 * ================================
 */

/**
 * UI style mapping for different validation error input types.
 * @type {Object<string, string[]>}
 */

const ERROR_UI_CLASSES = {
  empty: ["ring-1", "ring-yellow-500"],
  length: ["ring-1", "ring-amber-500"],
  format: ["ring-1", "ring-rose-500"],
};

/** * Tracks the currently active error type to facilitate style cleanup.
 * @type {string|null}
 */
let currentErrorType = null;

/**
 * =========================================
 *  2.  UI CONTROLLER (FOR VALIDATION STATE)
 * =========================================
 */

/**
 * Updates input styling based on error type.
 * @param {HTMLElement} input - {customerId}
 * @param {Object} error - { type: string, message: string }
 */
function showInputHighlight(input, error) {
  removeInputHighlight(input, currentErrorType);
  input.classList.add(...ERROR_UI_CLASSES[error.type]);
  currentErrorType = error.type;
}

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
  input.classList.remove(...ERROR_UI_CLASSES[currentErrorType]);
}

export function resetCustomerIdError({ input, warning }) {
  hideMessage(warning);
  removeInputHighlight(input, currentErrorType);
}
