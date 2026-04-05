import { ElementNotFoundError } from "../../dom-system.js";
import {PRIORITY_POINTS} from "../config-data.js"
import {getSelectInputDOM, getSubjectDOM} from "../dom.js";


/*
 * ==============================
 *      0. DOM SETUP
 * ==============================
 */

const DOM = (() => {
  try {
    return {
      ...getSelectInputDOM(),
      ...getSubjectDOM()
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


/*
 * ==============================
 *   1. MAIN CALCULATE ACTION
 * ==============================
 */

export function calculateFinalScore() {
  const area = DOM.selectArea.value;
  const category = DOM.selectCaterogy.value;

  const priorityPoint =
    PRIORITY_POINTS.area[area] + PRIORITY_POINTS.caterogy[category];

  let totalSubject = 0;
  let hasZeroScore = false;
  DOM.subjectInput.forEach((sub) => {
    const score = sub.valueAsNumber;
    totalSubject += score;
    if (score === 0) hasZeroScore = true;
  });

  return { finalScore: priorityPoint + totalSubject, hasZeroScore };
}
