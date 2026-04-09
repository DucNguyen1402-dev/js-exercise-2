import { ElementNotFoundError } from "../../dom-system.js";
import { getConnectionDOM } from "../dom.js";
import { validateConnection } from "../validation/connection.js";
import {
  applyInputInteractionHighlightError,
  resetInputInteractionHighlightError,
} from "../ui/connection.js";

/*
/**
 * =====================================
 *           0. DOM SETUP
 * ====================================
 */

const DOM = (() => {
  try {
    return getConnectionDOM();
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
 *           1. CONNECTION-RELATED EVENT
 * ==========================================
 */

/* ========== 1.1 DATA CONFIG ========= */

let currentError = null;

/* ========== 1.2 EVEN HANDLER ========= */

function handleInteractionError(event, input) {
  const value = input.value.trim();
  const state = validateConnection(value);

  resetInputInteractionHighlightError(input, currentError);
  if (state.isValid) {
    return;
  }
  const currentErrorState = applyInputInteractionHighlightError(
    input,
    event.type,
    state.error.type,
  );
  return currentErrorState;
}

export function initConnectionEvent() {
  ["input", "blur"].forEach((eventName) => {
    DOM.connectionInput.addEventListener(eventName, (e) => {
      currentError = handleInteractionError(e, DOM.connectionInput);
    });
  });
}


export function resetConnectionInterationHighlight({input}){
   resetInputInteractionHighlightError(input, currentError);
}