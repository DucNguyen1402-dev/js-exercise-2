/**
 * ================================
 *    1. DATA CONFIG
 * ================================
 */


const ERROR_STATE = {
  empty: {
    type: "empty",
    message: "The customer ID can't be empty.",
  },
  format: {
    type: "format",
    message: "Customer ID must contain only letters and numbers, with no spaces.",
  },
  length: {
    type: "length",
    message: "The customer ID must be between 3 and 20 characters long.",
  },
};
const REGEX = /^[a-zA-Z0-9]+$/;




const validator = [
  {
    isInvalid: (value) => value === "",
    error: ERROR_STATE.empty,
  },
  {
    isInvalid: (value) => value.length < 3 || value.length > 20,
    error: ERROR_STATE.length,
  },
  {
    isInvalid: (value) => !REGEX.test(value),
    error: ERROR_STATE.format,
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

export function validateCustomerId(customerId) {
  return processValidation(customerId);
}
