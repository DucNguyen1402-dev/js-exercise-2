import { $, $$ } from "../dom-system.js";

export function initDOM() {
  const checkArea = $(".check__area");
  return {
    benchmarkInput: $(".input__benchmark"),
    subjectInput: [...$$(".subject__input")],
    selectArea: $(".select__area"),
    selectCaterogy: $(".select__caterory"),
    checkBtn: $(".check__btn"),
    resetBtn: $(".card.admission__management").querySelector(".reset__btn"),
    benchmarkWarningArea: $(".benchmark__warning__area"),
    subjectErrorInvalid: $(".subject__error--invalid"),
    subjectWarningEmpty: $(".subject__warning--empty"),
    checkArea: checkArea,
    checkAreaText: checkArea.querySelector(".check__area__text"),
    sadIcon: checkArea.querySelector(".sad__icon"),
    happyIcon: checkArea.querySelector(".happy__icon"),
  };
}

export function initBenchmarkDOM() {
  return {
    benchmarkInput: $(".input__benchmark"),
    benchmarkWarningArea: $(".benchmark__warning__area"),
  };
}

export function initSubjectDOM() {
  return {
    subjectInput: [...$$(".subject__input")],
    subjectErrorInvalid: $(".subject__error--invalid"),
    subjectWarningEmpty: $(".subject__warning--empty"),
  };
}
