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
    notInteger: ["focus:ring-rose-500"],
    range: ["focus:ring-rose-500"],
  },
  blur: {
    empty: ["ring-1", "ring-yellow-500"],
    notInteger: ["ring-1", "ring-rose-500"],
    range: ["ring-1", "ring-rose-500"],
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

const ERROR_UI_CLASSES = {
  empty: ["ring-1", "ring-yellow-500"],
  notInteger: ["ring-1", "ring-rose-500"],
  range: ["ring-1", "ring-amber-500"],
};

let currentErrorType = null;

/* ========= 2.2 ERROR STATE MANAGEMENT==========  */

// PUBlIC API

export function renderConnectionError({ input, warning }, error) {
  showInputHighlight(input, error);
  showMessage(warning, error);
}

export function resetConnectionError({ input, warning }) {
  hideMessage(warning);
  removeInputHighlight(input, currentErrorType);
}

// INTERNAL - SHOW ERROR

function showInputHighlight(input, error) {
  removeInputHighlight(input, currentErrorType);
  input.classList.add(...ERROR_UI_CLASSES[error.type]);
  currentErrorType = error.type;
}

function showMessage(warning, error) {
  warning.classList.remove("hidden");
  warning.textContent = error.message;
}

function hideMessage(warning) {
  warning.classList.add("hidden");
  warning.textContent = "";
}

function removeInputHighlight(input, currentErrorType) {
  if (!currentErrorType) return;
  input.classList.remove(...ERROR_UI_CLASSES[currentErrorType]);
}
