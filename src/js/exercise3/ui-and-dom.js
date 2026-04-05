import { ElementNotFoundError } from "../dom-system.js";
import { getNameInputDOM } from "./dom.js";

const DOM = (() => {
  try {
    return {
      ...getNameInputDOM(),
    };
  } catch (error) {
    if (error instanceof ElementNotFoundError) {
      console.error(error.message);
    } else {
      console.error("Something went wrong: ", error.message);
    }
  }
})();
/*
/**
 * ==========================================
 *            1. NAME INPUT
 * ==========================================
 */

/* =========== 1.1 USER INTERACTION ============  */


const INTERACTION_CLASS = {
  input: {
    empty: ["focus:ring-yellow-500"],
    length: ["focus:ring-yellow-500"],
    format: ["focus:ring-rose-500"],
  },
  blur: {
    empty: ["ring-1", "ring-yellow-500"],
    length: ["ring-1", "ring-yellow-500"],
    format: ["ring-1", "ring-rose-500"],
  },
};

export function clearErrorState(input) {
  if (!input._errorType) return;

  input.classList.remove(
    ...INTERACTION_CLASS[input._eventType][input._errorType],
  );

  input._errorType = null;
  input._eventType = null;
  input.classList.add("focus:ring-blue-500/60");
}

export function applyErrorState(input, eventType, errorType) {
  if (eventType === "input") {
    input.classList.remove("focus:ring-blue-500/60");
  }

  input.classList.add(...INTERACTION_CLASS[eventType][errorType]);

  input._errorType = errorType;
  input._eventType = eventType;
}


/* =========== 1.2 FORM SUBMISSION ============  */


export function resetNameInputUI() {
  resetNameInputMessage();
  resetNameInputHightlight(DOM.nameInput._error);
}

function resetNameInputMessage() {
  DOM.nameWarning.classList.add("hidden");
  DOM.nameWarning.textContent = "";
}

function handleInvalidNameMessage(state) {
  DOM.nameWarning.classList.remove("hidden");
  DOM.nameWarning.textContent = state.error.message;
}

const SUBMIT_CLASS = {
  empty: ["ring-1", "ring-yellow-500"],
  length: ["ring-1", "ring-yellow-500"],
  format: ["ring-1", "ring-rose-500"],
};

function handInvalidNameHighlight(state) {
  const currentError = state.error.type;
  if (DOM.nameInput._error) {
    resetNameInputHightlight(DOM.nameInput._error);
  }
  DOM.nameInput.classList.add(...SUBMIT_CLASS[state.error.type]);
  DOM.nameInput._error = currentError;
}

function resetNameInputHightlight(type) {
  DOM.nameInput.classList.remove(...SUBMIT_CLASS[type]);
}

export function handleInvalidName(state) {
  handInvalidNameHighlight(state);
  handleInvalidNameMessage(state);
}
