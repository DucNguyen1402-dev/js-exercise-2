import { ElementNotFoundError } from "../../dom-system.js";
import {getCheckAreaDOM, getBenchmarkDOM} from "../dom.js";
import {calculateFinalScore} from "./calculate.js"
import {displayResult} from "./display.js"

/*
 * ==============================
 *   0. DOM SETUP
 * ==============================
 */
const DOM = (() => {
  try {
    return{
      ...getBenchmarkDOM(),
      ...getCheckAreaDOM()
    }
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
 * ==============================
 *   1. CHECK AREA DATA CONFIG
 * ==============================
 */
const areaState = {
  success: "success",
  failed: "failed",
  hasZeroScore: "hasZeroScore",
};

DOM.checkArea._state = null;

/*
 * ==========================================
 *  2. STATE MANAGEMENT AND RESULT HANDLING
 * =============================================
 */

function getState(result) {
  if (result.hasZeroScore) {
    return areaState.hasZeroScore;
  }
  const benchmark = DOM.benchmarkInput.valueAsNumber;
  if (result.finalScore >= benchmark) {
    return areaState.success;
  }

  if (result.finalScore < benchmark) {
    return areaState.failed;
  }
}

export function handleResult() {
  const result = calculateFinalScore();

  const state = getState(result);

  displayResult(state, result.finalScore);

  DOM.checkArea._state = state;
}