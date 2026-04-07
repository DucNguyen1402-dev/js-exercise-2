import { $ } from "../dom-system.js";

/**
 * ========================================
 *
 * ========================================
 */


export function getResultArea(){
  return{
    taxMessage: $(".tax__message"),
    taxValue : $(".tax__message").querySelector(".tax__value"),
    nameDisplay: $(".tax__message").querySelector(".name__display")
  };
}
export function getBtnDOM() {
  return {
    calculateBtn: $(".calculate__btn"),
    resetBtn: $(".tax__calculator").querySelector(".reset__btn"),
  };
}

export function getNameInputDOM() {
  return {
    nameInput: $(".name__input"),
    nameWarning: $(".tax__calculator").querySelector(".name__warning"),
  };
}

export function getIncomeInputDOM() {
  return {
    incomeInput: $(".income__input"),
    incomeWarning: $(".tax__calculator").querySelector(".income__warning"),
  };
}

export function getDependentInputDOM() {
  return {
    dependentInput: $(".dependent__input"),
    dependentWarning: $(".tax__calculator").querySelector(
      ".dependent__warning"),
  };
}
