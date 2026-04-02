import { initDOM } from "./dom.js";
import {
  validateBenchmarkInput,
  getBenchmarkState,
  getSubjectError,
  subjectValidation,
} from "./validation.js";
import { ElementNotFoundError } from "../dom-system.js";

const DOM = (() => {
  try {
    return initDOM();
  } catch (error) {
    if (error instanceof ElementNotFoundError) {
      console.error(error.message);
    } else {
      console.error("Something went wrong: ", error.message);
    }
    throw error;
  }
})();

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
 *     2. UI & DOM MANIPULATION (Helpers)
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

/* 1. CONFIGURATION & CONSTANTS */

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

/* 2. LOW-LEVEL UI FUNCTIONS (DOM Manipulation) */

//-- reset to default state
function setDefaultState() {
  DOM.benchmarkInput.classList.add("focus:ring-blue-500/60");
}

function handleBenmarkErrorUI(context) {
  resetCheckArea();
  showBenchmarkError(context);
}

//-- Reset warning text
function resetBenchmarkWarningArea(
  currentErrorBg = benchmarkContext.currentErrorBg,
) {
  if (!currentErrorBg) return;

  DOM.benchmarkWarningArea.classList.add("hidden");
  DOM.benchmarkWarningArea.textContent = "";
  DOM.benchmarkWarningArea.classList.remove(currentErrorBg);
}

//-- show error hightlight
function showErrorHightlight(currentError, mode) {
  clearAllBenchmarkInputErrorState();
  DOM.benchmarkInput.classList.add(...ERROR_BG[currentError][mode]);
}

//-- show error text
function showBenchmarkError(context) {
  const config = BENCHMARK_INVALID[context.currentError];

  resetBenchmarkWarningArea(benchmarkContext.currentErrorBg);

  DOM.benchmarkWarningArea.classList.remove("hidden");
  DOM.benchmarkWarningArea.classList.add(config.bg);
  DOM.benchmarkWarningArea.textContent = config.text;
  DOM.benchmarkInput.classList.add("ring-1", config.ring);
  benchmarkContext.currentErrorBg = config.bg;
}

//-- clear all input error state
function clearAllBenchmarkInputErrorState() {
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

/* 3. ORCHESTRATION (Logic handlers) */
function resetBenchmarkInputHighlight() {
  clearAllBenchmarkInputErrorState();
  setDefaultState();
}

/* =============SUBJECT INPUT============= */

// PUBLIC API

function resetAllInputValue() {
  const allInputs = [...document.querySelectorAll("input")];
  allInputs.forEach((input) => (input.value = ""));
}

function resetSubjectToDefault() {
  hideAllSubjectErrorMessages();
  subjectInputUI.reset(true);
}

//INTERNAL

/* 1. CONFIGURATION & CONSTANTS */
const ERROR_CLASSES = {
  empty: "bg-rose-500",
  invalid: "bg-yellow-500",
};

const ERROR_MAP = {
  empty: DOM.subjectWarningEmpty,
  invalid: DOM.subjectErrorInvalid,
};

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

/* 2. LOW-LEVEL UI FUNCTIONS (DOM Manipulation) */

function applySubjectInputErrorState(el, { state, type }) {
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

function showSubjectErrorMessage(typeError, { bg, message }) {
  const el = ERROR_MAP[typeError];
  el.classList.remove("hidden");
  el.classList.add(bg);
  el.textContent = message;
}

function hideAllSubjectErrorMessage() {
  Object.keys(ERROR_MAP).forEach(hideSubjectErrorMessage);
}

function hideSubjectErrorMessage(type) {
  const el = ERROR_MAP[type];
  if (!el) return;

  el.classList.add("hidden");
  el.classList.remove(ERROR_CLASSES[type]);
  el.textContent = "";
}

/* 3. ORCHESTRATION (Logic handlers) */

function handleSubjectErrorMessage(typeError) {
  resetCheckArea();
  showSubjectErrorMessage(typeError, ERROR_UI[typeError]);
}

/* 4. MODULE / EXPORT OBJECT */
export const subjectInputUI = {
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
  _setDefault: function (index) {
    DOM.subjectInput[index].classList.add("focus:ring-blue-500/60");
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
      el.classList.remove(...this.highlightClasses);
      this._setDefault(index);
    });
  },
};

/* =============CHECK AREA============= */

const STATE_CONFIG = {
  success: {
    bg: "bg-green-500",
    emoji: DOM.happyIcon,
  },
  failed: {
    bg: "bg-purple-500",
    emoji: DOM.sadIcon,
  },
  hasZeroScore: {
    bg: "bg-rose-500",
    emoji: DOM.sadIcon,
  },
};

function resetCheckArea() {
  const currentState = DOM.checkArea._state;
  if (!currentState) return;

  const config = STATE_CONFIG[currentState];

  DOM.checkArea.classList.remove(config.bg);
  config.emoji.classList.add("hidden");

  DOM.checkAreaText.textContent = "";
}

/* =============SELECT INPUT============= */

function resetAllSelectValue() {
  [...document.querySelectorAll("select")].forEach(
    (select) => (select.value = select.dataset.default),
  );
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

const areaState = {
  success: "success",
  failed: "failed",
  hasZeroScore: "hasZeroScore",
};
DOM.checkArea._state = null;

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

function displayResult(state, finalScore) {
  resetCheckArea();

  const config = DISPLAY[state];
  DOM.checkArea.classList.add(config.bg);
  config.icon.classList.remove("hidden");
  DOM.checkAreaText.textContent = config.message + `Your score: ${finalScore}`;
}

function getState(result) {
  if (result.hasZeroScore) {
    return areaState.hasZeroScore;
  }
  const benchmark = DOM.benchmarkInput.valueAsNumber;
  if (result.finalScore >= benchmark) {
    return areaState.success;
  }

  if (result.finalScore < benchmark) {
    return areaState.failed;
  }
}

function handleResult() {
  const result = calculateFinalScore();

  const state = getState(result);

  displayResult(state, result.finalScore);

  DOM.checkArea._state = state;
}

function renderBenchmarkValidation(context) {
  if (context.currentError) {
    handleBenmarkErrorUI(context);
    return;
  }

  resetBenchmarkWarningArea();
}

function isBenchmarkInputValid() {
  const context = validateBenchmarkInput();
  renderBenchmarkValidation(context);
  return !context.currentError;
}

function renderSubjectValidation(context) {
  context.empty ?
   handleSubjectErrorMessage("empty")
   :hideSubjectErrorMessage("empty");

  context.invalid ?
    handleSubjectErrorMessage("invalid")
    :hideSubjectErrorMessage("invalid");
  
}

function validateSubject() {
  const result = subjectValidation.validate();
  const isValid = !(result.empty || result.invalid);
  return {
    result,
    isValid,
  };
}

function checkAndDisplaySubjectErrors() {
  const { result, isValid } = validateSubject();
  if (!isValid) {
    renderSubjectValidation(result);
    return false;
  }
  hideAllSubjectErrorMessage();
  return true;
}


function handleCheckAdmission() {
  const isSubjectValid = checkAndDisplaySubjectErrors();
  const isBenchmarkValid = isBenchmarkInputValid();
  if (!isSubjectValid || !isBenchmarkValid) {
    return;
  }
  handleResult();
}

/**
 * ==========================================
 *          5. EVENT LISTENERS
 * ==========================================
 */

/* ==========  Main Actions ==========*/
DOM.checkBtn.addEventListener("click", handleCheckAdmission);

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
  applySubjectInputErrorState(inputEl, error);
}

DOM.subjectInput.forEach((inputEl, index) => {
  ["input", "blur"].forEach((eventName) => {
    inputEl.addEventListener(eventName, (e) =>
      handleSubjectEvent(e, inputEl, index),
    );
  });
});
