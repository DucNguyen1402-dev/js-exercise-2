import { ElementNotFoundError } from "../dom-system.js";
import {getCheckAreaDOM, getBenchmarkDOM, getSubjectDOM} from "./dom.js";



/**
 * ==========================================
 *    00. DOM SETUP
 * ==========================================
 */

const DOM = (() => {
  try {
    return {
       ...getCheckAreaDOM(),
       ...getBenchmarkDOM(),
       ...getSubjectDOM(),
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

/**
 * ==========================================
 *         1. BENCHMARK INPUT
 * ==========================================
 */


/* ============= 1.1 STATE ============= */
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

/* ============= 1.2 UI LOGIC ============= */

// ============= PUBLIC API

export function resetBenchmark() {
  resetBenchmarkWarningArea();
  resetBenchmarkInputHighlight();
}

// ============= INTERNAL

/* 1. CONFIGURATION & CONSTANTS */

const ERROR_BG = {
  empty: {
    input: ["focus:ring-yellow-500"],
    blur: ["ring-1", "ring-yellow-500"],
  },
  invalid: {
    input: ["focus:ring-rose-500"],
    blur: ["ring-1", "ring-rose-500"],
  },
};

/* 2. LOW-LEVEL UI FUNCTIONS (DOM Manipulation) */

//-- reset to default state
function setDefaultState() {
  DOM.benchmarkInput.classList.add("focus:ring-blue-500/60");
}

export function handleBenmarkErrorUI(context) {
  resetCheckArea();
  showBenchmarkError(context);
}

//-- Reset warning text
export function resetBenchmarkWarningArea(
  currentErrorBg = benchmarkContext.currentErrorBg,
) {
  if (!currentErrorBg) return;

  DOM.benchmarkWarningArea.classList.add("hidden");
  DOM.benchmarkWarningArea.textContent = "";
  DOM.benchmarkWarningArea.classList.remove(currentErrorBg);
}

//-- show error hightlight
export function showErrorHightlight(currentError, mode) {
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
export function resetBenchmarkInputHighlight() {
  clearAllBenchmarkInputErrorState();
  setDefaultState();
}

/**
 * ==========================================
 *           2. SUBJECT INPUT
 * ==========================================
 */


// ============== PUBLIC API

export function resetAllInputValue() {
  const allInputs = [...document.querySelectorAll("input")];
  allInputs.forEach((input) => (input.value = ""));
}

export function resetSubjectToDefault() {
  hideAllSubjectErrorMessage();
  subjectInputUI.reset(true);
}

// /============== INTERNAL

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

export function applySubjectInputErrorState(el, { state, type }) {
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

export function hideAllSubjectErrorMessage() {
  Object.keys(ERROR_MAP).forEach(hideSubjectErrorMessage);
}

export function hideSubjectErrorMessage(type) {
  const el = ERROR_MAP[type];
  if (!el) return;

  el.classList.add("hidden");
  el.classList.remove(ERROR_CLASSES[type]);
  el.textContent = "";
}

/* 3. ORCHESTRATION (Logic handlers) */

export function handleSubjectErrorMessage(typeError) {
  resetCheckArea();
  showSubjectErrorMessage(typeError, ERROR_UI[typeError]);
}

export function renderBenchmarkValidation(context) {
  if (context.currentError) {
    handleBenmarkErrorUI(context);
    return;
  }

  resetBenchmarkWarningArea();
}


export function renderSubjectValidation(context) {
  context.empty
    ? handleSubjectErrorMessage("empty")
    : hideSubjectErrorMessage("empty");

  context.invalid
    ? handleSubjectErrorMessage("invalid")
    : hideSubjectErrorMessage("invalid");
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

/**
 * ==========================================
 *           3. CHECK AREA
 * ==========================================
 */

/*=========== 3.1 STATE =========== */
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

/*=========== 3.2 RESET UI =========== */

export function resetCheckArea() {
  const currentState = DOM.checkArea._state;
  if (!currentState) return;

  const config = STATE_CONFIG[currentState];

  DOM.checkArea.classList.remove(config.bg);
  config.emoji.classList.add("hidden");

  DOM.checkAreaText.textContent = "";
}

/**
 * ==========================================
 *           4. SELECT INPUT
 * ==========================================
 */
export function resetAllSelectValue() {
  [...document.querySelectorAll("select")].forEach(
    (select) => (select.value = select.dataset.default),
  );
}


/**
 * ==========================================
 *           5. RESET UI
 * ==========================================
 */

export function resetUI(){
  resetBenchmark();
  resetAllInputValue();
  resetSubjectToDefault();
  resetAllSelectValue();
  resetCheckArea();
}