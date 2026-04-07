import { ElementNotFoundError } from "../../dom-system.js";
import { getIncomeInputDOM } from "../dom.js";
import { validateIncome } from "../validation/income.js";
import { clearIncomeErrorState, applyIncomeErrorState } from "../ui/income.js";

/*
/**
 * ==========================================
 *           0. DOM SETUP
 * ==========================================
 */

const DOM = (() => {
  try {
    return getIncomeInputDOM();
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
  const input = DOM.incomeInput;
  const value = input.value.trim();
  const state = validateIncome(value);

  clearIncomeErrorState(input, currentError);

  if (state.isValid) return;

  currentError= applyIncomeErrorState(input, event.type, state.error.type);
}


export function initIncomeInputEvent() {
  ["input", "blur"].forEach((eventName) => {
    DOM.incomeInput.addEventListener(eventName, (e) => {
      handleIncomeInputInteraction(e);
    });
  });
}


export function resetIncomeInteractionHighlightToDefault(){
  clearIncomeErrorState(DOM.incomeInput, currentError);
}
