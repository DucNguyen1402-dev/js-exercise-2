/**
 * ================================
 *    1. DATA CONFIG
 * ================================
 */


const ERROR_STATE = {
  empty: {
    type: "empty",
    message: "Please enter the number of connections for Business accounts.",
  },
  notInteger: {
    type: "notInteger",
    message: "Number of premium channels must be a whole number.",
  },
  range: {
    type: "range",
    message: "Number of connections must be between 0 and 10,000.",
  },
};


const validator = [
  {
    isInvalid: (value) => value === "",
    error: ERROR_STATE.empty,
  },
  {
    isInvalid: (value) => !Number.isInteger(Number(value)),
    error:  ERROR_STATE.notInteger
  },
  {
    isInvalid: (value) => Number(value) < 0 || Number(value) > 10000,
    error: ERROR_STATE.range,
  },
];


/**
 * ================================
 *    1. VALIDATION LOGIC
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

export function validateConnection(connection) {
  return processValidation(connection);
}
