import { ElementNotFoundError } from "../dom-system.js";
import {
  getBtn,
  getCustomerIdDOM,
  getCustomerTypeSelectDOM,
  getConnectionDOM,
  getConnectionForm,
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

import { renderResult, resetResultUI } from "./ui/display.js";
import { resetAllUI } from "./ui/index.js";

import {
  initCustomerIdEvent,
  initConnectionEvent,
  initPremiumChannelEvent,
} from "./event/index.js";

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
      ...getConnectionForm(),
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

function getResultFormUI() {
  return {
    area: DOM.resultArea,
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

const PRICE = {
  RESIDENTIAL: { fee: 4.5, service: 20.5, channel: 7.5 },
  BUSINESS: {
    fee: 15,
    serviceLimit: 75,
    serviceAdditional: 5,
    channel: 50,
  },
};

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
function syncErrorUI({ validationResults }) {
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

const resultUI = getResultFormUI();

function handleCalculation({
  customerId,
  customerType,
  connection = 0,
  premiumChannel,
}) {
  let totalBill = 0;

  if (customerType === "residential") {
    totalBill =
      PRICE.RESIDENTIAL.fee +
      PRICE.RESIDENTIAL.service +
      PRICE.RESIDENTIAL.channel * premiumChannel;
  } else if (customerType === "business") {
    const additionalConnections = Math.max(0, connection - 10);
    const serviceFee =
      PRICE.BUSINESS.serviceLimit +
      additionalConnections * PRICE.BUSINESS.serviceAdditional;

    totalBill =
      PRICE.BUSINESS.fee + serviceFee + PRICE.BUSINESS.channel * premiumChannel;
  }

  return {
    id: customerId,
    total: totalBill.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  };
}

function handleCableBilling() {
  const inputValues = getInputValues();
  if (inputValues.customerType === "residential") {
    inputValues.connection = 0;
  }

  const stateInput = validateInputs(inputValues);

  if (!stateInput.isValid) {
    resetResultUI(resultUI);
  }

  syncErrorUI(stateInput);

  if (!stateInput.isValid) return;

  const result = handleCalculation(inputValues);
  const displayUI = {
    message: DOM.resultArea,
    id: DOM.idDisplay,
    total: DOM.totalValueDisplay,
  };
  renderResult(displayUI, result);
}

/**
 * =====================================
 *      5. EVENT SETUP
 * =====================================
 */

/*====== 5.1 Calculation button event ====== */

DOM.calculateBtn.addEventListener("click", handleCableBilling);

/*====== 5.2 Reset button event ====== */

DOM.resetBtn.addEventListener("click", () => {
  const formUI = getFormUI();
  const resultFormUI = getResultFormUI();
  resetAllUI(formUI, resultFormUI);
});

/*====== 5.3 Customer Selected Type Event ====== */

// -- Show/hide connection input based on selected customer type
DOM.customerSelectedType.addEventListener("change", (e) => {
  const isBusiness = e.target.value === "business";
  DOM.connectionForm.classList.toggle("hidden", !isBusiness);

  !isBusiness && (DOM.connectionInput.value = "");
});

/**
 * =====================================
 *   6. REAL-TIME INPUT VALIDATION INIT
 * =====================================
 */

initCustomerIdEvent();
initConnectionEvent();
initPremiumChannelEvent();
