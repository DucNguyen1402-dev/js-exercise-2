import { initBenchmarkDOM, initSubjectDOM } from "./dom.js";
import {ElementNotFoundError} from "../dom-system.js";
import {subjectInputUI} from "./main.js"


const DOM = (() => {
  try {
    const benchmarkDOM = initBenchmarkDOM();
    const subjectDOM = initSubjectDOM();

    return {
      ...benchmarkDOM,
      ...subjectDOM,
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

/* ==========  Benchmark Input ==========  */


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

/* ========== Subject Input ========== */


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
