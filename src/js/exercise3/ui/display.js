import { ElementNotFoundError } from "../../dom-system.js";
import { getResultArea, getNameInputDOM } from "../dom.js";

const DOM = (() => {
  try {
    return {
      ...getNameInputDOM(),
      ...getResultArea(),
    };
  } catch (error) {
    if (error instanceof ElementNotFoundError) {
      console.error(error.message);
    } else {
      console.error("Something went wrong: ", error.message);
    }
  }
})();

export function displayTaxCalculation(calculationResult) {
  DOM.nameDisplay.textContent = `${DOM.nameInput.value.trim()}`;
  DOM.taxValue.textContent = `${calculationResult.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  DOM.taxMessage.classList.remove("hidden");
}

export function resetResultArea(){
    DOM.taxMessage.classList.add("hidden");
    DOM.nameDisplay.textContent = "";
    DOM.taxValue.textContent ="";
}