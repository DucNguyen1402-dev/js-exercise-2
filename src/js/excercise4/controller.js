import {ElementNotFoundError} from "../dom-system.js";
import {getBtn, getCustomerIdDOM, getCustomerTypeSelectDOM, getConnectionDOM, getPremiumChannelDOM, getResultArea} from "./dom.js";

/**
 * ===========================
 *     0. DOM SETUP
 * ===========================
 */

const DOM = (() => {
  try {
    return getBtn();
  } catch (error) {
    if (error instanceof ElementNotFoundError) {
      console.error(error.message);
    } else {
      console.error("Something went wrong: ", error.message);
    }
  }
})();




/**
 * ====================================================
 *     1. CABEL BILLING CALCUATION HANDLER (ENTRY POINT)
 * ====================================================
 */

function handleCableBilling(){
   const isValid  = validateInputs();
   if(!isValid ) {
    return;
   }
   const result = handleCalculation();
   renderResult(result);
}

/**
 * ===================================
 *     2. CALCULATION BUTTON EVENT
 * =================================
 */

DOM.calculateBtn.addEventListener("click", handleCableBilling);


/**
 * ============================================
 *     3. RESET BTN EVENT
 * =============================================
 */



/**
 * ============================================
 *     4. INPUT EVENT REALTIME VALIDATION SETUP
 * =============================================
 */
