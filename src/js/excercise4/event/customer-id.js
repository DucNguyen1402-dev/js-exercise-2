import { ElementNotFoundError } from "../../dom-system.js";
import { getCustomerIdDOM } from "../dom.js";
import { validateCustomerId } from "../validation/customer-id.js";
import {
  applyInputInteractionHighlightError,
  resetInputInteractionHighlightError,
} from "../ui/customer-id.js";

/*
/**
 * =====================================
 *           0. DOM SETUP
 * ====================================
 */

const DOM = (() => {
  try {
    return getCustomerIdDOM();
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

/* ========== 1.1 EVEN HANDLER ========= */

function handleInteractionError(event, input) {
  const value = input.value.trim();
  const state = validateCustomerId(value);

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

export function initCustomerIdEvent() {
  ["input", "blur"].forEach((eventName) => {
    DOM.customerIdInput.addEventListener(eventName, (e) => {
      currentError = handleInteractionError(e, DOM.customerIdInput);
    });
  });
}

export function resetCustomerIdInterationHighlight({input}){
   resetInputInteractionHighlightError(input, currentError);
}