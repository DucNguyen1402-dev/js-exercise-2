import { $, $$, ElementNotFoundError } from "./dom-system.js";

const DOM = {};

try {
  DOM.benchmarkInput = $(".input__benchmark");
  DOM.subjectInput = [...$$(".subject__input")];
  DOM.selectArea = $(".select__area");
  DOM.selectCaterogy = $(".select__caterory");
  DOM.checkBtn = $(".check__btn");
  DOM.resetBtn = $(".card.admission__management").querySelector(".reset__btn");
  DOM.benchmarkWarningArea = $(".benchmark__warning__area");
  DOM.subjectErrorInvalid = $(".subject__error--invalid");
  DOM.subjectWarningEmpty = $(".subject__warning--empty");
  DOM.checkArea = $(".check__area");
  DOM.checkAreaText = DOM.checkArea.querySelector(".check__area__text");
  DOM.sadIcon = DOM.checkArea.querySelector(".sad__icon");
  DOM.happyIcon = DOM.checkArea.querySelector(".happy__icon");
} catch (error) {
  if (error instanceof ElementNotFoundError) {
    console.error(error.message);
  } else {
    console.error("Something went wrong: ", error.message);
  }
}

/**
 * ==========================================
 *          1. CONFIG (DATA)
 * ==========================================
 */

const PRIORITY_POINTS = {
  area: { A: 2, B: 1, C: 0.5, X: 0 },
  caterogy: { 1: 2.5, 2: 1.5, 3: 1, 0: 0 },
};

/**
 * ==========================================
 *          2. VALIDATE LOGIC
 * ==========================================
 */

/* --  Benchmark Input -- */
function validateBenmarkInput() {
  const value = DOM.benchmarkInput.value.trim();

  const context = { currentError: null };

  if (value === "") {
    context.currentError = "empty";
  }

  const num = Number(value);

  if (Number.isNaN(num) || num < 0 || num > 30) {
    context.currentError = "invalid";
  }

  if (context.currentError) {
    handleBenmarkErrorUI(context);
    return {
      isValid: false,
    };
  }

  resetBenchmarkWarningArea();
  return {
    isValid: true,
  };
}

/* --  Subject Input -- */

const ERROR_CONFIG = {
  empty: {
    highlightClasses: ["ring-1", "ring-yellow-500"],
  },
  invalid: {
    highlightClasses: ["ring-1", "ring-rose-500"],
  },
};

function validateSubjectInput() {
  const errorState = {
    empty: false,
    invalid: false,
  };

  DOM.subjectInput.forEach((sub, i) => {
    subjectInputUI.reset(false, [i]);

    const value = sub.value.trim();
    const error = getSubjectError(value);
    if (!error.state) return;
    errorState[error.state] = true;
    setSubjectErrorHightlight(i, ERROR_CONFIG[error.state].highlightClasses);
  });

  errorState.empty ? handleSubjectError("empty") : resetSubjectError("empty");

  errorState.invalid
    ? handleSubjectError("invalid")
    : resetSubjectError("invalid");

  if (errorState.invalid || errorState.empty) {
    return {
      isValid: false,
    };
  }

  // The happy path

  return {
    isValid: true,
  };
}

/**
 * ==========================================
 *     3. UI & DOM MANIPULATION (Helpers)
 * ==========================================
 */

/* =============BENCHMARK INPUT============= */

/* -- benchmark state -- */
const BENCHMARK_INVALID = {
  empty: {
    bg: "bg-yellow-500",
    text: "Your benchmark input is empty! Please enter a number",
    ring: "ring-yellow-500",
  },
  invalid: {
    bg: "bg-rose-500",
    text: "Benchmark must be a number between 0 and 30.",
    ring: "ring-rose-500",
  },
};

const benchmarkContext = {
  currentErrorBg: null,
};

/* ---- benchmark UI logic ---- */

// PUBLIC API

function resetBenchmark() {
  resetBenchmarkWarningArea();
  resetBenchmarkInputHighlight();
}

// INTERNAL

/* handle context */
function getBenchmarkState(value) {
  if (value === "") return "empty";

  const number = Number(value);
  if (Number.isNaN(number) || number < 0 || number > 30) {
    return "invalid";
  }
  return "valid";
}
function setDefaultState() {
  DOM.benchmarkInput.classList.add("focus:ring-blue-500/60");
}

function handleBenmarkErrorUI(context) {
  resetCheckArea();
  showBenchmarkError(context);
}

/* reset state */
function clearAllBenchmarkInputState() {
  const inputStates = {
    invalid: {
      input: ["focus:ring-rose-500"],
      blur: ["ring-1", "ring-rose-500"],
    },
    empty: {
      input: ["focus:ring-yellow-500"],
      blur: ["ring-1", "ring-yellow-500"],
    },
  };
  const BENCHMARK_INPUT_HIGHLIGHT_CLASSES = [
    ...new Set(
      Object.values(inputStates)
        .flatMap((state) => Object.values(state))
        .flat(),
    ),
  ];

  DOM.benchmarkInput.classList.remove(...BENCHMARK_INPUT_HIGHLIGHT_CLASSES);
}

function resetBenchmarkInputHighlight() {
  clearAllBenchmarkInputState();
  setDefaultState();
}

const ERROR_BG = {
  empty: {
    focus: ["focus:ring-yellow-500"],
    blur: ["ring-1", "ring-yellow-500"],
  },
  invalid: {
    focus: ["focus:ring-rose-500"],
    blur: ["ring-1", "ring-rose-500"],
  },
};

function resetBenchmarkWarningArea(
  currentErrorBg = benchmarkContext.currentErrorBg,
) {
  if (!currentErrorBg) return;

  DOM.benchmarkWarningArea.classList.add("hidden");
  DOM.benchmarkWarningArea.textContent = "";
  DOM.benchmarkWarningArea.classList.remove(currentErrorBg);
}

/* show error context */
function showBenchmarkError(context) {
  const config = BENCHMARK_INVALID[context.currentError];

  resetBenchmarkWarningArea(benchmarkContext.currentErrorBg);

  DOM.benchmarkWarningArea.classList.remove("hidden");
  DOM.benchmarkWarningArea.classList.add(config.bg);
  DOM.benchmarkWarningArea.textContent = config.text;
  DOM.benchmarkInput.classList.add("ring-1", config.ring);
  benchmarkContext.currentErrorBg = config.bg;
}

function showErrorHightlight(currentError, mode) {
  clearAllBenchmarkInputState();
  DOM.benchmarkInput.classList.add(...ERROR_BG[currentError][mode]);
}

/* =============SUBJECT INPUT============= */

// PUBLIC API

function resetAllInputValue() {
  const allInputs = [...document.querySelectorAll("input")];
  allInputs.forEach((input) => (input.value = ""));
}

function resetSubjectToDefault() {
  resetSubjectArea();
  reset(true);
}

//INTERNAL

/*  */
function setSubjectInteractionDefault(index) {
  DOM.subjectInput[index].classList.add("focus:ring-blue-500/60");
}

function getSubjectError(value) {
  if (value === "") {
    return {
      state: "empty",
      type: null,
    };
  }

  const number = Number(value);
  if (Number.isNaN(number) || number < 0 || number > 10) {
    return {
      state: "invalid",
      type: null,
    };
  }

  return {
    state: null,
    type: null,
  };
}

const INPUT_CLASSES = {
  input: {
    default: ["focus:ring-blue-500/60"],
    empty: ["focus:ring-yellow-500"],
    invalid: ["focus:ring-rose-500"],
  },
  blur: {
    empty: ["ring-1", "ring-yellow-500"],
    invalid: ["ring-1", "ring-rose-500"],
  },
};

function applyErrorState(el, { state, type }) {
  const prev = el._errorState;

  if (prev) {
    const prevConfig = INPUT_CLASSES[prev.type];
    el.classList.remove(...(prevConfig?.[prev.state] || []));
  }

  const config = INPUT_CLASSES[type];
  const classes = config?.[state];

  if (config?.default) {
    el.classList.remove(...config.default);
  }
  if (!classes) return;

  el.classList.add(...classes);
  el._errorState = { state, type };
}

const ERROR_UI = {
  empty: {
    bg: "bg-yellow-500",
    message: "Subject input can't be empty! please try again!",
  },
  invalid: {
    bg: "bg-rose-500",
    message: "Subject input must be a number between 0 and 10.",
  },
};

function setSubjectErrorHightlight(index, errorState) {
  DOM.subjectInput[index].classList.add(...errorState);
}

function handleSubjectError(typeError) {
  resetCheckArea();
  showError(typeError, ERROR_UI[typeError]);
}
function showError(typeError, { bg, message }) {
  const sub =
    typeError === "empty" ? DOM.subjectWarningEmpty : DOM.subjectErrorInvalid;
  sub.classList.remove("hidden");
  sub.classList.add(bg);
  sub.textContent = message;
}

const subjectInputUI = {
  inputStates: {
    invalid: {
      input: ["focus:ring-rose-500"],
      blur: ["ring-1", "ring-rose-500"],
    },
    empty: {
      input: ["focus:ring-yellow-500"],
      blur: ["ring-1", "ring-yellow-500"],
    },
  },
 get highlightClasses() {
  if (!this._highlightClasses) {
    this._highlightClasses = [
      ...new Set(
        Object.values(this.inputStates)
          .flatMap((s) => Object.values(s))
          .flat(),
      ),
    ];
  }
  return this._highlightClasses;
},
  reset: function (clearAll = false, indexes = []) {
    const targets = clearAll ? DOM.subjectInput.map((_, i) => i) : indexes;

    targets.forEach((index) => {
      const el = DOM.subjectInput[index];
      el.classList.remove(... this.highlightClasses);
      setSubjectInteractionDefault(index);
    });
  },
};





const ERROR_CLASSES = {
  empty: "bg-rose-500",
  invalid: "bg-yellow-500",
};

function resetSubjectError(type) {
  const sub =
    type === "empty" ? DOM.subjectWarningEmpty : DOM.subjectErrorInvalid;
  if (!sub) return;

  sub.classList.add("hidden");
  sub.classList.remove(ERROR_CLASSES[type]);
  sub.textContent = "";
}

/* Check Area */

function resetCheckArea() {
  DOM.checkArea.classList.remove(
    "bg-green-500",
    "bg-yellow-500",
    "bg-rose-500",
  );
  DOM.happyIcon.classList.add("hidden");
  DOM.sadIcon.classList.add("hidden");
  DOM.checkAreaText.textContent = "";
}

/* =============SELECT INPUT============= */

function resetAllSelectValue() {
  const allSelects = [...document.querySelectorAll("select")];
  allSelects.forEach((select) => (select.value = select.dataset.default));
}

/**
 *
 *
 * ==========================================
 *    4. CORE CALCULATION & DISPLAY LOGIC
 * ==========================================
 */

function calculateFinalScore() {
  const area = DOM.selectArea.value;
  const caterogry = DOM.selectCaterogy.value;

  const priorityPoint =
    PRIORITY_POINTS.area[area] + PRIORITY_POINTS.caterogy[caterogry];

  const scores = DOM.subjectInput.map((sub) => sub.valueAsNumber);
  const hasZeroScore = scores.some((score) => score === 0);
  const totalSubject = scores.reduce((acc, score) => acc + score, 0);

  const finalScore = priorityPoint + totalSubject;
  return { finalScore: finalScore, hasZeroScore: hasZeroScore };
}

function displayResult() {
  resetCheckArea();
  const result = calculateFinalScore();
  if (result.hasZeroScore) {
    DOM.checkArea.classList.add("bg-rose-500");
    DOM.sadIcon.classList.remove("hidden");
    DOM.checkAreaText.textContent =
      "Unfortunately, you did not pass due to a score of 0 in one or more subjects.";
    return;
  }

  const benchmarkValue = DOM.benchmarkInput.valueAsNumber;
  resetCheckArea();

  if (result.finalScore >= benchmarkValue) {
    DOM.checkArea.classList.add("bg-green-500");
    DOM.happyIcon.classList.remove("hidden");
    DOM.checkAreaText.textContent = `Congratulations! You passed. Your score: ${result.finalScore}`;
  } else {
    DOM.checkArea.classList.add("bg-yellow-500");
    DOM.sadIcon.classList.remove("hidden");
    DOM.checkAreaText.textContent = `Unfortunately, you did not pass. Your score: ${result.finalScore}`;
  }
}

function checkAdmission() {
  const isValidBenmarkInput = validateBenmarkInput();
  const isValidSubjectInput = validateSubjectInput();
  if (!isValidBenmarkInput.isValid || !isValidSubjectInput.isValid) {
    return;
  }
  displayResult();
}

/**
 * ==========================================
 *          5. EVENT LISTENERS
 * ==========================================
 */

/* ==========  Main Actions ==========*/
DOM.checkBtn.addEventListener("click", checkAdmission);

DOM.resetBtn.addEventListener("click", () => {
  resetCheckArea();
  resetBenchmark();
  resetSubjectToDefault();
  resetAllInputValue();
  resetAllSelectValue();
  hasInteracted = false;
});

/* ==========  Input Interactions ==========*/

/* Benchmark interations */

const ERROR_MODE = {
  FOCUS: "focus",
  BLUR: "blur",
};

let hasInteracted = false;
DOM.benchmarkInput.addEventListener("input", () => {
  hasInteracted = true;

  const value = DOM.benchmarkInput.value.trim();
  const state = getBenchmarkState(value);
  if (state !== "valid") {
    showErrorHightlight(state, ERROR_MODE.FOCUS);
    return;
  }

  resetBenchmarkInputHighlight();
});

DOM.benchmarkInput.addEventListener("blur", () => {
  if (!hasInteracted) return;

  const value = DOM.benchmarkInput.value.trim();

  const state = getBenchmarkState(value);

  if (state !== "valid") {
    showErrorHightlight(state, ERROR_MODE.BLUR);
    return;
  }
  resetBenchmarkInputHighlight();
});

/* Subject interations */

function handleSubjectEvent(e, inputEl, index) {
  const value = inputEl.value.trim();
  const error = getSubjectError(value);

  if (!error.state) {
    subjectInputUI.reset(false, [index]);
    return;
  }

  error.type = e.type;
  applyErrorState(inputEl, error);
}

DOM.subjectInput.forEach((inputEl, index) => {
  ["input", "blur"].forEach((eventName) => {
    inputEl.addEventListener(eventName, (e) =>
      handleSubjectEvent(e, inputEl, index),
    );
  });
});
