import { ElementNotFoundError } from "../../dom-system.js";
import { getDependentInputDOM } from "../dom.js";
import { handleErrorDependent, resetDependentErrorUI } from "../ui/dependent.js";


/*
 * ====================================
 *         0. DOM SETUP
 * ====================================
 */
const DOM = (() => {
  try {
    return getDependentInputDOM();
  } catch (error) {
    if (error instanceof ElementNotFoundError) {
      console.error(error.message);
    } else {
      console.error("Something went wrong: ", error.message);
    }
  }
})();

/*
 * ====================================
 *         1. VALIDATION LOGIC
 * ====================================
 */

/*============== 1.1. DATA CONFIG ============== */

const ERROR_STATE = {
  empty: {
    type: "empty",
    message:
      "Dependents must be a number (0 allowed, not empty).",
  },
  invalid: {
    type: "invalid",
    message: "The dependent number must be a positive number!",
  },
  tooHigh: {
    type: "tooHigh",
    message: "Please enter a realistic number of dependents (max 50).",
  },
};

const validator = [
  {
    check: (dependent) => dependent === "",
    error: ERROR_STATE.empty,
  },
  {
    check: (dependent) => isNaN(dependent) || Number(dependent) < 0,
    error: ERROR_STATE.invalid,
  },
  {
    check: (dependent) => Number(dependent) > 50,
    error: ERROR_STATE.tooHigh,
  },
];

const dependentUI = {
  input: DOM.dependentInput,
  warning: DOM.dependentWarning,
};


/*============== 1.2. ERROR STATE MANAGEMENT ============== */

export function validateDependent(dependentValue) {
  for (const v of validator) {
    if (v.check(dependentValue)) {
      return {
        isValid: false,
        error: v.error,
      };
    }
  }
  return { isValid: true, error: null };
}

export function handleDependentValidation() {
  const input = DOM.dependentInput;
  const value = input.value.trim();
  const state = validateDependent(value);
  if (!state.isValid) {
    handleErrorDependent({ ...dependentUI, error: state.error });
    return false;
  }
  resetDependentErrorUI({ ...dependentUI });
  return true;
}
