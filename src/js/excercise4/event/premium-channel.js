import { ElementNotFoundError } from "../../dom-system.js";
import { getPremiumChannelDOM } from "../dom.js";
import { validatePremiumChannel } from "../validation/premium-channel.js";
import {
  applyInputInteractionHighlightError,
  resetInputInteractionHighlightError,
} from "../ui/premium-channel.js";



/*
/**
 * =====================================
 *           0. DOM SETUP
 * ====================================
 */

const DOM = (() => {
  try {
    return getPremiumChannelDOM();
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
  const state = validatePremiumChannel(value);

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

export function initPremiumChannelEvent() {
  ["input", "blur"].forEach((eventName) => {
    DOM.premiumChannelsInput.addEventListener(eventName, (e) => {
      currentError = handleInteractionError(e, DOM.premiumChannelsInput);
    });
  });
}

export function resetPremiumInterationHighlight({input}){
   resetInputInteractionHighlightError(input, currentError);
}
