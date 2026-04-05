import { ElementNotFoundError } from "../dom-system.js";
import {
  getNameInputDOM,
  getIncomeInputDOM,
  getDependentInputDOM,
} from "./dom.js";

import {resetNameInputUI,handleInvalidName } from "./ui-and-dom.js"

/*
 * ====================================
 *         0. DOM SETUP
 * ====================================
 */
const DOM = (() => {
  try {
    return {
      ...getNameInputDOM(),
      ...getIncomeInputDOM(),
      ...getDependentInputDOM(),
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
 * ==========================================
 *          1. VALIDATION LOGIC
 * ==========================================
 */

/*============== NAME ============== */
const NAME_ERROR = {
  EMPTY: {
    type: "empty",
    message: "The Customer name form can't be empty!",
  },
  LENGTH: {
    type: "length",
    message: "Name must be between 2 and 50 characters.",
  },
  FORMAT: {
    type: "format",
    message: "Name can only contain letters and spaces.",
  },
};

const NAME_REGEX = /^[a-zA-ZÀ-ỹ]+(\s[a-zA-ZÀ-ỹ]+)*$/;

const validators = [
  {
    check: (name) => name === "",
    error: NAME_ERROR.EMPTY,
  },
  {
    check: (name) => !NAME_REGEX.test(name),
    error: NAME_ERROR.FORMAT,
  },
  {
    check: (name) => name.length < 2 || name.length > 50,
    error: NAME_ERROR.LENGTH,
  },
];

export function validateName(name) {
  for (const v of validators) {
    if (v.check(name)) {
      return { isValid: false, error: v.error };
    }
  }
  return { isValid: true, error: null };
}

export function handleNameValidation() {
  const value = DOM.nameInput.value.trim();
  const state = validateName(value);
  if (!state.isValid) {
    handleInvalidName(state);
    return false;
  }
  resetNameInputUI();
  return true;
}


// /*============== INCOME ============== */
//  function validateIncome(income) {
//   if (income.trim() === "") {
//     return {
//       isValid: false,
//       message: "The income input can't be empty!",
//     };
//   }
//   if (Number.isNaN(income) || Number(income) < 0) {
//     return {
//       isValid: false,
//       message: "The income number must be a positive number!",
//     };
//   }
//   if (Number(income) < 50000) {
//     return {
//       isValid: false,
//       message: "Income is too low for tax calculation.",
//     };
//   }
//   if (Number(income) > 1000000000000) {
//     return {
//       isValid: false,
//       message: "The amount is too large. Please verify your input.",
//     };
//   }
// }

// export function handleIncomeValidation() {
//   const value = DOM.incomeInput.value;
//   const state = validateIncome(value);
//   if (!state.isValid) {
//     handleInvalidIncome(state);
//     return false;
//   }
//   return true;
// }

// /*============== DEPENDENT ============== */
// function validateDependent(dependent) {
//   if (Number.isNaN(dependent) || Number(dependent) < 0) {
//     return {
//       isValid: false,
//       message: "The dependent number must be a positive number!",
//     };
//   }
//   if (Number(dependent) > 50) {
//     return {
//       isValid: false,
//       message: "Please enter a realistic number of dependents (max 50).",
//     };
//   }
//   return { isValid: true, message: null };
// }

// export function handleDependentValidation() {
//   const value = DOM.dependent.value;
//   const state = validateDependent(value);
//   if (!state.isValid) {
//     handleInvalidDependent(state);
//     return false;
//   }

//   return true;
// }