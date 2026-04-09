/**
 * =========================================
 *             1 . DATA CONFIG
 * =========================================
 */

let currentErrorType = null;

const ERROR_UI_CLASSES = {
  empty: ["ring-1", "ring-yellow-500"],
};


/**
 * =========================================
 *            2 ERROR STATE MANAGEMENT
 * =========================================
 */


// PUBlIC API

export function renderCustomerTypeError({ input, warning }, error) {
  showInputHighlight(input, error);
  showMessage(warning, error);
}
export function resetCustomerTypeError({input, warning}) {
  hideMessage(warning);
  removeInputHighlight(input, currentErrorType);
}

// INTERNAL - SHOW ERRO
function showInputHighlight(input, error) {
  removeInputHighlight(input, currentErrorType);
  input.classList.add(...ERROR_UI_CLASSES[error.type]);
  currentErrorType = error.type;
}

function showMessage(warning, error) {
    warning.classList.remove("hidden");
    warning.textContent = error.message;
}


// INTERNAL - RESET ERROR
function hideMessage(warning){
    warning.classList.add("hidden");
    warning.textContent = "";
}

function removeInputHighlight(input, currentErrorType) {
  if (!currentErrorType) return;
  input.classList.remove(...ERROR_UI_CLASSES[currentErrorType]);
}



