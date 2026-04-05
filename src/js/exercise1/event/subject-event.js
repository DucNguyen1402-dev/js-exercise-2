import { ElementNotFoundError } from "../../dom-system.js";
import { getSubjectDOM } from "../dom.js";
import { getSubjectError } from "../validation.js";
import { subjectInputUI, applySubjectInputErrorState } from "../ui-and-dom.js";

/*
 * ==============================
 *   0. DOM SETUP
 * ==============================
 */

const DOM = (() => {
  try {
    return getSubjectDOM();
  } catch (error) {
    if (error instanceof ElementNotFoundError) {
      console.error(error.message);
    } else {
      console.error("Something went wrong: ", error.message);
    }
    throw error;
  }
})();

/*
 * ===================================
 *   1. SUBJECT-RELATED EVENT HANDLING
 * ===================================
 */

function handleSubjectEvent(e, inputEl, index) {
  const value = inputEl.value.trim();
  const error = getSubjectError(value);

  if (!error.state) {
    subjectInputUI.reset(false, [index]);
    return;
  }

  error.type = e.type;
  applySubjectInputErrorState(inputEl, error);
}

export function initSubjecEvent() {
  DOM.subjectInput.forEach((inputEl, index) => {
    ["input", "blur"].forEach((eventName) => {
      inputEl.addEventListener(eventName, (e) => {
        if (e.target.dataset.interacted === "false") {
          e.target.dataset.interacted = "true";
          return; 
        }
        handleSubjectEvent(e, inputEl, index);
      });
    });
  });
}
