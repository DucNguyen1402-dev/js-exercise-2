import { ElementNotFoundError } from "../../dom-system.js";
import { getNameInputDOM } from "../dom.js";
import { validateName } from "../validation/name.js";
import { clearNameInteractionErrorHighlight, applyNameInteractionErrorHighlight } from "../ui/name.js";

/*
/**
 * ==========================================
 *           0. DOM SETUP
 * ==========================================
 */

const DOM = (() => {
  try {
    return getNameInputDOM();

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

/* ============ 1.1 DATA CONFIG ============= */

let currentError = null;

/* ============ 1.2 EVENT HANDLERS ============= */


function handleNameInputInteraction(event) {
  const input = DOM.nameInput;
  const value = input.value.trim();
  const state = validateName(value);

  clearNameInteractionErrorHighlight(input, currentError);

  if (state.isValid) return;

  currentError = applyNameInteractionErrorHighlight(input, event.type, state.error.type);
}

export function initNameInputEvent() {
  ["input", "blur"].forEach((eventName) => {
    DOM.nameInput.addEventListener(eventName, (e) => {
      handleNameInputInteraction(e);
    });
  });
}


export function resetNameInteractionHighlightToDefault(){
  clearNameInteractionErrorHighlight(DOM.nameInput, currentError);
}
