import { ElementNotFoundError } from "../../dom-system.js";
import { getNameInputDOM } from "../dom.js";
import { validateName } from "../validation.js";
import { clearErrorState, applyErrorState } from "../ui-and-dom.js";

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

function handleNameInputInteraction(event) {
  const input = DOM.nameInput;
  const value = input.value.trim();
  const state = validateName(value);

  clearErrorState(input);

  if (state.isValid) return;

  if (event.type === "input") {
    input.classList.remove("focus:ring-blue-500/60");
  }

  applyErrorState(input, event.type, state.error.type);
}

export function initNameInputEvent() {
  ["input", "blur"].forEach((eventName) => {
    DOM.nameInput.addEventListener(eventName, (e) => {
      handleNameInputInteraction(e);
    });
  });
}
