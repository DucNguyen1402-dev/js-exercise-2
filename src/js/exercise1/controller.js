import { ElementNotFoundError } from "../dom-system.js";
import { getBtnDOM, getBenchmarkDOM, getSubjectDOM } from "./dom.js";
import {
  isBenchmarkInputValid,
  checkAndDisplaySubjectErrors,
} from "./validation.js";
import { resetUI } from "./ui-and-dom.js";

import { handleResult } from "./core-action/handle-result.js";
import { initBenmarkEvent } from "./event/benchmark-event.js";
import { initSubjecEvent } from "./event/subject-event.js";

/*
 * ==============================
 *      0. DOM SETUP
 * ==============================
 */

const DOM = (() => {
  try {
    return {
      ...getBenchmarkDOM(),
      ...getBtnDOM(),
      ...getSubjectDOM(),
    };
  } catch (error) {
    if (error instanceof ElementNotFoundError) {
      console.error(error.message);
    } else {
      console.error("Something went wrong: ", error.message);
    }
    throw error;
  }
})();

/**
 * =========================================
 * 1. Entry point for handling admission check
 * ===========================================
 */

function handleCheckAdmission() {
  const isSubjectValid = checkAndDisplaySubjectErrors();
  const isBenchmarkValid = isBenchmarkInputValid();
  if (!isSubjectValid || !isBenchmarkValid) {
    return;
  }
  handleResult();
}

/**
 * =======================================
 *  2. Attach main action to check button
 * =====================================
 */

DOM.checkBtn.addEventListener("click", handleCheckAdmission);

/**
 * =========================================
 *  3. Init Benchmark and subject event
 * =========================================
 */

initBenmarkEvent();
initSubjecEvent();

/**
 * =========================================
 *  4. Bind reset handler to reset button
 * =========================================
 */

DOM.resetBtn.addEventListener("click", resetUI);
