import { ElementNotFoundError } from "../dom-system.js";
import { getIncomeInputDOM, getDependentInputDOM } from "./dom.js";

const DOM = (() => {
  try {
    return {
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

const calculateTax = (taxableIncome) => {

  if (taxableIncome <= 60) return taxableIncome * 0.05;
  if (taxableIncome <= 120) return taxableIncome * 0.1 - 3;
  if (taxableIncome <= 210) return taxableIncome * 0.15 - 9;
  if (taxableIncome <= 384) return taxableIncome * 0.2 - 19.5;
  if (taxableIncome <= 624) return taxableIncome * 0.25 - 38.7;
  if (taxableIncome <= 960) return taxableIncome * 0.3 - 69.9;

  return taxableIncome * 0.35 - 117.9;
};


export function getTaxCalculation() {
  const annualIncome = DOM.incomeInput.valueAsNumber;
  const dependents = DOM.dependentInput.valueAsNumber;

  const taxableIncome = annualIncome - 4 - dependents * 1.6;

  if (taxableIncome <= 0) {
    return 0;
  }

  const finalTax = calculateTax(taxableIncome);

  return finalTax;
}
