import { $, $$, ElementNotFoundError } from "./dom-system.js";


/**
 * ==========================================
 *          0. DOM SETUP
 * ==========================================
 */
const DOM = {};

try {
  DOM.customerName = $(".customer__name__input");
  DOM.kwhInput = $(".kwh__input");
  DOM.checkBtn = $(".electricity__calculator").querySelector(".check__btn");
  DOM.resetBtn = $(".electricity__calculator").querySelector(".reset__btn");
  DOM.warningArea = $(".warning__area");
  DOM.billMessage = $(".bill__message");
  DOM.billValue = DOM.billMessage.querySelector(".bill__value");
} catch (error) {
  if (error instanceof ElementNotFoundError) {
    console.error(error.message);
  } else {
    console.error("Something went wrong: ", error.message);
  }
}




