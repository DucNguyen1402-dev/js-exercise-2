import { ElementNotFoundError } from "../dom-system.js";
import { handleNameValidation } from "./validation/name.js";
import { handleIncomeValidation } from "./validation/income.js";
import { handleDependentValidation } from "./validation/dependent.js";
import { getBtnDOM } from "./dom.js";
import { initNameInputEvent } from "./event/name.js";
import { initIncomeInputEvent } from "./event/income.js";
import { initDependentInputEvent } from "./event/dependent.js";
import {getTaxCalculation} from "./calculation.js";
import { displayTaxCalculation, resetResultArea } from "./ui/display.js";
import {resetUI} from "./ui/reset.js";

/**
 * =====================================
 *           0. DOM SETUP 
 * ======================================
 */


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


/**
 * ==========================================
 *  1. HANDLING TAX CALCULATION (ENTRY POINT)
 * ==========================================
 */

function handleTaxCalculation() {
  const isValidName = handleNameValidation();
  const isValidIncome = handleIncomeValidation();
  const isValidDependent = handleDependentValidation();

  if (!isValidName || !isValidIncome || !isValidDependent) {
    resetResultArea();
    return;
  }
  const calculationResult = getTaxCalculation();
  displayTaxCalculation(calculationResult);
}


/**
 * ==========================================
 *    2. BUTTON EVENT SETUP
 * ==========================================
 */

DOM.calculateBtn.addEventListener("click", handleTaxCalculation);




/**
 * ==================================
 *     3. INPUT EVENT SETUP
 * ==================================
 */

initNameInputEvent();
initIncomeInputEvent();
initDependentInputEvent();



/**
 * ==================================
 *     4. RESET BUTTON SETUP
 * ==================================
 */

DOM.resetBtn.addEventListener("click", resetUI);

