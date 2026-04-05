import { ElementNotFoundError } from "../../dom-system.js";
import { getBenchmarkDOM } from "../dom.js";
import { getBenchmarkState } from "../validation.js";
import {
  showErrorHightlight,
  resetBenchmarkInputHighlight,
} from "../ui-and-dom.js";

/*
 * ==============================
 *      0. DOM SETUP
 * ==============================
 */

const DOM = (() => {
  try {
    return getBenchmarkDOM();
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
 *      1. DATA CONFIG
 * ==============================
 */

const ERROR_MODE = {
  input: "input",
  blur: "blur",
};

let isFirstInteract = true;

/*
 * ==================================
 *  2. BENCHMARK-RELATED EVENT SETUP
 * ==================================
 */

function handleBenchmarkEvent(event) {
  const value = DOM.benchmarkInput.value.trim();
  const state = getBenchmarkState(value);

  if (state !== "valid") {
    showErrorHightlight(state, ERROR_MODE[event.type]);
    return;
  }
  resetBenchmarkInputHighlight();
}

export function initBenmarkEvent() {
  ["input", "blur"].forEach((eventName) => {
    DOM.benchmarkInput.addEventListener(eventName, (e) => {
      if (e.target.dataset.interacted === "false") {
        e.target.dataset.interacted = "true";
        return;
      }
      handleBenchmarkEvent(e);
    });
  });
}
