import { resetDependentUI } from "./dependent.js";
import { resetIncomeUI } from "./income.js";
import { resetNameUI } from "./name.js";
import { resetResultArea } from "./display.js";
import {
  getNameInputDOM,
  getIncomeInputDOM,
  getDependentInputDOM,
} from "../dom.js";

const DOM = (() => {
  try {
    return {
      ...getNameInputDOM(),
      ...getIncomeInputDOM(),
      ...getDependentInputDOM(),
    };
  } catch (error) {
    if (error instanceof ElementNotFoundError) {
      console.error(error.message);
    } else {
      console.error("Something went wrong: ", error.message);
    }
  }
})();

const NAME_UI = {
  input: DOM.nameInput,
  warning: DOM.nameWarning,
};

const INCOME_UI = {
  input: DOM.incomeInput,
  warning: DOM.incomeWarning,
};

const DEPENDENT_UI = {
  input: DOM.dependentInput,
  warning: DOM.dependentWarning,
};

export function resetUI() {
  resetNameUI({ ...NAME_UI });
  resetIncomeUI({ ...INCOME_UI });
  resetDependentUI({ ...DEPENDENT_UI });
  resetResultArea();
}
