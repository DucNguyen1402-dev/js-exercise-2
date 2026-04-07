import { ElementNotFoundError } from "../../dom-system.js";
import { getDependentInputDOM } from "../dom.js";
import { validateDependent } from "../validation/dependent.js";
import { clearDependentErrorState, applyDependentIncomeErrorState } from "../ui/dependent.js";

/*
/**
 * ==========================================
 *           0. DOM SETUP
 * ==========================================
 */

const DOM = (() => {
  try {
    return getDependentInputDOM();
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
 *           1. NAME-RELATED EVENT
 * ==========================================
 */


/* ============ 1.1 DATA CONFIG =============*/

let currentError = null;

/* ============ 1.2 EVENT HANDLER =============*/

function handleIncomeInputInteraction(event) {
  const input = DOM.dependentInput;
  const value = input.value.trim();
  const state = validateDependent(value);

  clearDependentErrorState(input, currentError);

  if (state.isValid) return;

  currentError= applyDependentIncomeErrorState(input, event.type, state.error.type);
}


export function initDependentInputEvent() {
  ["input", "blur"].forEach((eventName) => {
    DOM.dependentInput.addEventListener(eventName, (e) => {
      handleIncomeInputInteraction(e);
    });
  });
}

export function resetDependentInteractionHighlightToDefault(){
  clearDependentErrorState(DOM.dependentInput, currentError);
}
