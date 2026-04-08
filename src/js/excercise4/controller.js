import { ElementNotFoundError } from "../dom-system.js";
import {
  getBtn,
  getCustomerIdDOM,
  getCustomerTypeSelectDOM,
  getConnectionDOM,
  getPremiumChannelDOM,
  getResultArea,
} from "./dom.js";

import {
  validateCustomerId,
  validateCustomerType,
  validateConnection,
  validatePremiumChannel,
} from "./validation/index.js";

import {
  renderCustomerIdError,
  resetCustomerIdError,
  renderCustomerTypeError,
  resetCustomerTypeError,
  renderConnectionError,
  resetConnectionError,
  renderPremiumChannelError,
  resetPremiumChannelError,
} from "./ui/index.js";

import { resetResultArea } from "./ui/display.js";
// import {resetAllUIError} from "./ui/index.js"

/**
 * =================================
 *         0. DOM SETUP
 * =================================
 */

const DOM = (() => {
  try {
    return {
      ...getBtn(),
      ...getCustomerIdDOM(),
      ...getCustomerTypeSelectDOM(),
      ...getConnectionDOM(),
      ...getPremiumChannelDOM(),
      ...getResultArea(),
    };
  } catch (error) {
    if (error instanceof ElementNotFoundError) {
      console.error(error.message);
    } else {
      console.error("Something went wrong: ", error.message);
    }
  }
})();

/**
 * ================================================
 *  1. PREPARE REQUIRED DATA (FOR MAIN ACTIONS)
 * ================================================
 */

function getFormUI() {
  return {
    customerId: {
      input: DOM.customerIdInput,
      warning: DOM.customerIdWarning,
    },
    customerType: {
      input: DOM.customerSelectedType,
      warning: DOM.customerTypeWarning,
    },
    connection: {
      input: DOM.connectionInput,
      warning: DOM.connectionWarning,
    },
    premiumChannel: {
      input: DOM.premiumChannelsInput,
      warning: DOM.premiumChannelsWarning,
    },
  };
}

function getResultForm() {
  return {
    message: DOM.resultMessage,
    id: DOM.idDisplay,
    value: DOM.totalValueDisplay,
  };
}

function getInputValues() {
  return {
    customerId: DOM.customerIdInput.value.trim(),
    customerType: DOM.customerSelectedType.value,
    connection: DOM.connectionInput.value.trim(),
    premiumChannel: DOM.premiumChannelsInput.value.trim(),
  };
}

/**
 * ==========================================
 *       2. VALIDATION LOGIC
 * ==========================================
 */

const validators = {
  customerId: validateCustomerId,
  customerType: validateCustomerType,
  connection: validateConnection,
  premiumChannel: validatePremiumChannel,
};

export function validateInputs(data) {
  const validationResults = Object.fromEntries(
    Object.entries(validators).map(([key, validateFn]) => [
      key,
      validateFn(data[key]),
    ]),
  );

  const isValid = Object.values(validationResults).every((r) => r.isValid);

  return { isValid, validationResults };
}

/**
 * ==========================================
 *         3. UI LOGIC
 * ==========================================
 */

const ERROR_UI_MAP = {
  customerId: renderCustomerIdError,
  customerType: renderCustomerTypeError,
  connection: renderConnectionError,
  premiumChannel: renderPremiumChannelError,
};

const VALID_UI_MAP = {
  customerId: resetCustomerIdError,
  customerType: resetCustomerTypeError,
  connection: resetConnectionError,
  premiumChannel: resetPremiumChannelError,
};

function processErrorUI(errorInputs) {
  const formUI = getFormUI();
  Object.entries(errorInputs).forEach(([key, result]) => {
    ERROR_UI_MAP[key]?.(formUI[key], result.error);
  });
}

function resetErrorUI(validInputs) {
  const formUI = getFormUI();
  Object.entries(validInputs).forEach(([key, result]) => {
    VALID_UI_MAP[key]?.(formUI[key]);
  });
}
function handleErrorUI({ validationResults }) {
  const errorInputs = {};
  const validInputs = {};

  for (const [key, result] of Object.entries(validationResults)) {
    if (result.isValid) {
      validInputs[key] = result;
    } else {
      errorInputs[key] = result;
    }
  }

  processErrorUI(errorInputs);
  resetErrorUI(validInputs);
}

/**
 * ==========================================
 *     4. CORE ACTION DISPLAY
 * ==========================================
 */

function handleCalculation({
  customerId,
  customerType,
  connection,
  premiumChannel,
}) {}

function renderResult(result) {}

function handleCableBilling() {
  const inputValues = getInputValues();
  const stateInput = validateInputs(inputValues);
  if (!stateInput.isValid) {
    resetResultArea();
    handleErrorUI(stateInput);
    return;
  }
  const result = handleCalculation(inputValues);
  renderResult(result);
}

/**
 * =====================================
 *      5. EVENT SETUP
 * =====================================
 */

/*====== 5.1 Calculation button event ====== */

DOM.calculateBtn.addEventListener("click", handleCableBilling);

/*====== 5.2 Reset button event ====== */

// DOM.resetBtn.addEventListener("click", resetAllUIError);

/**
 * =====================================
 *   6. REAL-TIME INPUT VALIDATION INIT
 * =====================================
 */
