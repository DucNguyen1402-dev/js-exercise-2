/**
 * ================================
 *    1. DATA CONFIG
 * ================================
 */

const ERROR_STATE = {
  empty: {
    type: "empty",
    message: "Please enter the number of premium channels (enter 0 if none).",
  },
  notInteger: {
    type: "notInteger",
    message: "Number of premium channels must be a whole number.",
  },
  range: {
    type: "range",
    message: "Number of premium channels must be between 0 and 100.",
  },
};

const validator = [
  {
    isInvalid: (value) => value === "",
    error: ERROR_STATE.empty,
  },
  {
    isInvalid: (value) => value < 0 || value > 100,
    error: ERROR_STATE.range,
  },
];


/**
 * ================================
 *    2. VALIDATION LOGIC
 * ================================
 */


function processValidation(value) {
  for (const v of validator) {
    if (v.isInvalid(value)) {
      return {
        isValid: false,
        error: v.error,
      };
    }
  }
  return { isValid: true, error: null };
}

export function validatePremiumChannel(premiumChannel) {
  return processValidation(premiumChannel);
}
