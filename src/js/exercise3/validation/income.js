import { ElementNotFoundError } from "../../dom-system.js";
import { getIncomeInputDOM } from "../dom.js";

import { handleInvalidIncome, resetIncomeInputErrorUI } from "../ui/income.js";

/*
 * ====================================
 *         0. DOM SETUP
 * ====================================
 */
const DOM = (() => {
  try {
    return getIncomeInputDOM();
  } catch (error) {
    if (error instanceof ElementNotFoundError) {
      console.error(error.message);
    } else {
      console.error("Something went wrong: ", error.message);
    }
  }
})();

/**
 * ==========================================
 *          1. VALIDATION LOGIC
 * ==========================================
 */

/*============== 1.1 DATA CONFIG ============== */

const ERROR_STATE = {
  empty: {
    type: "empty",
    message: "The income input can't be empty!",
  },
  invalid: {
    type: "invalid",
    message: "The income number must be a positive number!",
  },
  tooLow: {
    type: "tooLow",
    message: "Income is too low for tax calculation.",
  },
  tooHigh: {
    type: "tooHigh",
    message: "The amount is too large. Please verify your input.",
  },
};

const incomeValidator = [
  {
    check: (income) => income.trim() === "",
    error: ERROR_STATE.empty,
  },
  {
    check: (income) => Number.isNaN(income) || Number(income) < 0,
    error: ERROR_STATE.invalid,
  },
  {
    check: (income) => Number(income) < 1,
    error: ERROR_STATE.tooLow,
  },
  {
    check: (income) => Number(income) > 100000,
    error: ERROR_STATE.tooHigh,
  },
];

const incomeUI = {
  input: DOM.incomeInput,
  warning: DOM.incomeWarning,
};

/*============== 1.2 ERROR STATE MANAGEMENT ============== */

export function validateIncome(income) {
  for (const v of incomeValidator) {
    if (v.check(income)) {
      return {
        isValid: false,
        error: v.error,
      };
    }
  }
  return { isValid: true, error: null };
}

export function handleIncomeValidation() {
  const input = DOM.incomeInput;
  const value = input.value.trim();
  const state = validateIncome(value);
  if (!state.isValid) {
    handleInvalidIncome({ ...incomeUI, state });
    return false;
  }
  resetIncomeInputErrorUI({ ...incomeUI });
  return true;
}
