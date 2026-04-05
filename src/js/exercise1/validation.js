import {ElementNotFoundError} from "../dom-system.js";
import { getBenchmarkDOM, getSubjectDOM } from "./dom.js";
import {subjectInputUI, renderBenchmarkValidation, renderSubjectValidation, hideAllSubjectErrorMessage} from "./ui-and-dom.js";


/**
 * ==========================================
 *          0. DOM SETUP
 * ==========================================
 */

const DOM = (() => {
  try {
    return {
      ...getBenchmarkDOM(),
      ...getSubjectDOM(),
    };
  } catch (error) {
    if (error instanceof ElementNotFoundError) {
      console.error(error.message);
    } else {
      console.error("Something went wrong: ", error.message);
    }
    throw error;
  }
})();

/**
 * ==========================================
 *          2. VALIDATE LOGIC
 * ==========================================
 */

/* ============= 2.1 Benchmark input =============== */


export function getBenchmarkState(value) {
  if (value === "") return "empty";

  const number = Number(value);
  if (Number.isNaN(number) || number < 0 || number > 30) {
    return "invalid";
  }
  return "valid";
}


export function validateBenchmarkInput() {
  const value = DOM.benchmarkInput.value.trim();

  const context = { currentError: null };

  if (value === "") {
    context.currentError = "empty";
  }

  const num = Number(value);

  if (Number.isNaN(num) || num < 0 || num > 30) {
    context.currentError = "invalid";
  }

  return context;
}

export function isBenchmarkInputValid() {
  const context = validateBenchmarkInput();
  renderBenchmarkValidation(context);
  return !context.currentError;
}




export function checkAndDisplaySubjectErrors() {
  const { result, isValid } = validateSubject();
  if (!isValid) {
    renderSubjectValidation(result);
    return false;
  }
  hideAllSubjectErrorMessage();
  return true;
}



/* ===============2.2  Subject Input===============  */


function setSubjectInputErrorHighlight(index, errorState) {
  DOM.subjectInput[index].classList.add(...errorState);
}

export function getSubjectError(value) {
  if (value === "") {
    return {
      state: "empty",
      type: null,
    };
  }

  const number = Number(value);
  if (Number.isNaN(number) || number < 0 || number > 10) {
    return {
      state: "invalid",
      type: null,
    };
  }

  return {
    state: null,
    type: null,
  };
}


export function validateSubject() {
  const result = subjectValidation.validate();
  const isValid = !(result.empty || result.invalid);
  return {
    result,
    isValid,
  };
}

export const subjectValidation = {
  ERROR_CONFIG: {
    empty: {
      highlightClasses: ["ring-1", "ring-yellow-500"],
    },
    invalid: {
      highlightClasses: ["ring-1", "ring-rose-500"],
    },
  },

  validate: function () {
    const errorState = {
      empty: false,
      invalid: false,
    };

    DOM.subjectInput.forEach((sub, i) => {
      subjectInputUI.reset(false, [i]);

      const value = sub.value.trim();
      const error = getSubjectError(value);

      if (!error.state) return;
      errorState[error.state] = true;
      setSubjectInputErrorHighlight(
        i,
        this.ERROR_CONFIG[error.state].highlightClasses,
      );
    });

    return errorState;
  },
};
