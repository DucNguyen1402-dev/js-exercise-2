import { ElementNotFoundError } from "../../dom-system.js";
import { getCheckAreaDOM } from "../dom.js";
import { resetCheckArea } from "../ui-and-dom.js";

/*
 * ==============================
 *      0. DOM SETUP
 * ==============================
 */

const DOM = (() => {
  try {
    return getCheckAreaDOM();
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
 *        1. DATA CONFIG
 * ==============================
 */

const DISPLAY = {
  hasZeroScore: {
    bg: "bg-rose-500",
    icon: DOM.sadIcon,
    message:
      "Unfortunately, you did not pass due to a score of 0 in one or more subjects.",
  },
  success: {
    bg: "bg-green-500",
    icon: DOM.happyIcon,
    message: `Congratulations! You passed.`,
  },
  failed: {
    bg: "bg-purple-500",
    icon: DOM.sadIcon,
    message: `Unfortunately, you did not pass.`,
  },
};

/*
 * ==============================
 *      2. MAIN DISPLAY ACTION
 * ==============================
 */

export function displayResult(state, finalScore) {
  resetCheckArea();

  const config = DISPLAY[state];
  DOM.checkArea.classList.add(config.bg);
  config.icon.classList.remove("hidden");
  DOM.checkAreaText.textContent = config.message + ` Your score: ${finalScore}`;
}
