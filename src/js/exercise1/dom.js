import { $, $$ } from "../dom-system.js";

/*
 * ==============================
 *   1. BUTTON DOM REFERENCE
 * ==============================
 */
export function getBtnDOM() {
  return {
    checkBtn: $(".check__btn"),
    resetBtn: $(".card.admission__management").querySelector(".reset__btn"),
  };
}

/*
 * ==============================
 *   2. SELECT DOM REFERENCE
 * ==============================
 */
export function  getSelectInputDOM() {
  return {
    selectArea: $(".select__area"),
    selectCaterogy: $(".select__caterory"),
  };
}

/*
 * ==============================
 *   3. CHECK AREA DOM REFERENCE
 * ==============================
 */
export function  getCheckAreaDOM() {
  const checkArea = $(".check__area");
  return {
    checkArea: checkArea,
    checkAreaText: checkArea.querySelector(".check__area__text"),
    sadIcon: checkArea.querySelector(".sad__icon"),
    happyIcon: checkArea.querySelector(".happy__icon"),
  };
}
/*
 * ==============================
 *   4. BENCHMARK DOM REFERENCE
 * ==============================
 */
export function  getBenchmarkDOM() {
  return {
    benchmarkInput: $(".input__benchmark"),
    benchmarkWarningArea: $(".benchmark__warning__area"),
  };
}


/*
 * ==============================
 *   5. SUBJECT DOM REFERENCE
 * ==============================
 */
export function  getSubjectDOM() {
  return {
    subjectInput: [...$$(".subject__input")],
    subjectErrorInvalid: $(".subject__error--invalid"),
    subjectWarningEmpty: $(".subject__warning--empty"),
  };
}
