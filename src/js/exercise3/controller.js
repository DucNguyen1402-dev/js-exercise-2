import { ElementNotFoundError } from "../dom-system.js";
import { handleNameValidation} from "./validation.js";
import {getBtnDOM} from "./dom.js"
import {initNameInputEvent} from "./event/name.js";

const DOM = (() => {
  try {
    return {
      ...getBtnDOM(),
    };
  } catch (error) {
    if (error instanceof ElementNotFoundError) {
      console.error(error.message);
    } else {
      console.error("Something went wrong: ", error.message);
    }
  }
})();


/* =========== INCOME INPUT ============  */

// function handleInvalidIncome() {
//   handleInvalidIncome;
// }

/* =========== DEPENDENT INPUT ============  */

// function handleInvalidDependent() {}

/**
 * ==========================================
 *     3. CORE CALCULATE & DISPLAY LOGIC
 * ==========================================
 */

// function handleCalculation() {}

function handleTaxCalculation() {
  const isValidName = handleNameValidation();
  // const isValidIncome = handleIncomeValidation();
  // const isValidDependent = handleDependentValidation();

  if (!isValidName ) {
    return;
  }
  // handleCalculation();
}

/**
 * ==========================================
 *         4. EVENT LISTENER
 * ==========================================
 */

DOM.calculateBtn.addEventListener("click", handleTaxCalculation);

initNameInputEvent();