import { ElementNotFoundError } from "../../dom-system.js";
import { getNameInputDOM } from "../dom.js";

import { resetNameInputErrorUI, handleNameError } from "../ui/name.js";

/*
 * ====================================
 *         0. DOM SETUP
 * ====================================
 */
const DOM = (() => {
  try {
    return getNameInputDOM();
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

/*============ 1.1 DATA CONFIG ============ */

const ERROR_STATE = {
  EMPTY: {
    type: "empty",
    message: "The customer name form can't be empty!",
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

const REGEX = /^[a-zA-ZÀ-ỹ]+(\s[a-zA-ZÀ-ỹ]+)*$/;

const NAME_VALIDATORS = [
  {
    check: (name) => name === "",
    error: ERROR_STATE.EMPTY,
  },
  {
    check: (name) => !REGEX.test(name),
    error: ERROR_STATE.FORMAT,
  },
  {
    check: (name) => name.length < 2 || name.length > 50,
    error: ERROR_STATE.LENGTH,
  },
];

const nameUI = {
  input: DOM.nameInput,
  warning: DOM.nameWarning
}

/*============ 1.2  VALIDATION FLOW  ============ */


export function validateName(name) {
  for (const v of NAME_VALIDATORS) {
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
    handleNameError({...nameUI, error: state.error});
    return false;
  }
  resetNameInputErrorUI({...nameUI});
  return true;
}
