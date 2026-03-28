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
  DOM.subjectWarningArea = $(".subject__warning__area");
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
const PRIORITY_POINTS = {
  area: { A: 2, B: 1, C: 0.5, X: 0 },
  caterogy: { 1: 2.5, 2: 1.5, 3: 1, 0: 0 },
};

/**
 * ==========================================
 *          1. VALIDATE LOGIC
 * ==========================================
 */

function validateBenmarkInput() {
  const value = DOM.benchmarkInput.value;

  if (value === "") {
    DOM.benchmarkWarningArea.classList.remove("hidden");
    DOM.benchmarkWarningArea.classList.add("bg-yellow-500");
    DOM.benchmarkWarningArea.textContent =
      "Your benchmark input is empty! Please enter a number";
    DOM.benchmarkInput.classList.add("ring-1", "ring-yellow-500");
    return {
      isValid: false,
    };
  }

  const benchmarkValue = DOM.benchmarkInput.valueAsNumber;

  if (isNaN(benchmarkValue) || benchmarkValue < 0 || benchmarkValue > 30) {
    invalidBenchmark();
    return {
      isValid: false,
    };
  } else {
    resetBenchmarkWarningArea();
    return {
      isValid: true,
    };
  }
}

function validateSubjectInput() {
  let invalidSubject = false;
  const invalidIndex = [];
  DOM.subjectInput.forEach((sub, i) => {
    const subjectValue = sub.valueAsNumber;
    if (isNaN(subjectValue) || subjectValue < 0 || subjectValue > 10) {
      invalidSubject = true;
      invalidIndex.push(i);
    }
  });

  if (invalidSubject) {
    invalidIndex.forEach((i) => {
      DOM.subjectInput[i].classList.add("ring-1", "ring-rose-500");
    });
    invalidSubjectInput();
    return {
      isValid: false,
    };
  } else {
    DOM.subjectInput.forEach((subject) => {
      subject.classList.remove("ring-1", "ring-rose-500");
    });
    resetSubjectWarningArea();
    return {
      isValid: true,
    };
  }
}
/**
 * ==========================================
 *     2. UI & DOM MANIPULATION (Helpers)
 * ==========================================
 */

function invalidSubjectInput() {
  DOM.subjectWarningArea.classList.remove("hidden");
  DOM.subjectWarningArea.classList.add("bg-rose-500");
  DOM.subjectWarningArea.textContent = `Subject input must be a number between 0 and 10.`;
}

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

function resetBenchmark() {
  resetBenchmarkWarningArea();
  resetBenchmarkInput();
}

function resetBenchmarkWarningArea() {
  DOM.benchmarkWarningArea.classList.add("hidden");
  DOM.benchmarkWarningArea.classList.remove("bg-rose-500", "bg-yellow-500");
  DOM.benchmarkWarningArea.textContent = "";
}

function resetBenchmarkInput() {
  DOM.benchmarkInput.classList.remove(
    "ring-1",
    "ring-rose-500",
    "ring-yellow-500",
  );
  DOM.benchmarkInput.classList.remove("focus:ring-1", "focus:ring-rose-500");
  DOM.benchmarkInput.classList.add("focus:ring-2", "focus:ring-blue-500/60");
  DOM.benchmarkInput.classList.replace("border-rose-500", "border-gray-300");
}

function invalidBenchmark() {
  DOM.benchmarkWarningArea.classList.remove("hidden");
  DOM.benchmarkWarningArea.classList.add("bg-rose-500");
  DOM.benchmarkWarningArea.textContent =
    "Benchmark must be a number between 0 and 30.";
  DOM.benchmarkInput.classList.add("ring-1", "ring-rose-500");
}

function resetSubject() {
  resetSubjectWarningArea();
  resetSubjectInput(DOM.subjectInput, true);
}

function resetSubjectInput(subject = DOM.subjectInput, shouldClearAll = false) {
  if (shouldClearAll) {
    DOM.subjectInput.forEach((subject) => {
      subject.classList.remove("ring-1", "ring-rose-500");
      subject.classList.replace(
        "focus:ring-rose-500",
        "focus:ring-blue-500/60",
      );
      subject.classList.replace("border-rose-300", "border-gray-300");
    });
  } else {
    subject.classList.remove("ring-1", "ring-rose-500");
    subject.classList.replace("focus:ring-rose-500", "focus:ring-blue-500/60");
    subject.classList.replace("border-rose-300", "border-gray-300");
  }
}

function resetSubjectWarningArea() {
  DOM.subjectWarningArea.classList.add("hidden");
  DOM.subjectWarningArea.classList.remove("bg-rose-500");
  DOM.subjectWarningArea.textContent = "";
}

function resetAllInputValue() {
  const allInputs = [...document.querySelectorAll("input")];

  allInputs.forEach((input) => (input.value = ""));
}

function resetAllSelectValue() {
  const allSelects = [...document.querySelectorAll("select")];
  allSelects.forEach((select) => (select.value = select.dataset.default));
}

/**
 *
 *
 * ==========================================
 *    3. CORE CALCULATION & DISPLAY LOGIC
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
 *          4. EVENT LISTENERS
 * ==========================================
 */

// Main Actions
DOM.checkBtn.addEventListener("click", checkAdmission);

DOM.resetBtn.addEventListener("click", () => {
  resetCheckArea();
  resetBenchmark();
  resetSubject();
  resetAllInputValue();
  resetAllSelectValue();
});

// Input Interactions
DOM.benchmarkInput.addEventListener("input", () => {
  resetBenchmarkInput();

  const value = DOM.benchmarkInput.value;

  if (value === "") {
    resetBenchmarkInput();
    return;
  }

  const benchmark = DOM.benchmarkInput.valueAsNumber;
  if (isNaN(benchmark) || benchmark < 0 || benchmark > 30) {
    DOM.benchmarkInput.classList.remove(
      "focus:ring-2",
      "focus:ring-blue-500/60",
    );
    DOM.benchmarkInput.classList.add("focus:ring-1", "focus:ring-rose-500");
    return;
  }
});

DOM.benchmarkInput.addEventListener("change", () => {
  const value = DOM.benchmarkInput.value;

  if (value === "") {
    resetBenchmarkInput();
    return;
  }

  const benchmark = DOM.benchmarkInput.valueAsNumber;
  if (isNaN(benchmark) || benchmark < 0 || benchmark > 30) {
    DOM.benchmarkInput.classList.replace("border-gray-300", "border-rose-500");
    return;
  } else {
    DOM.benchmarkInput.classList.replace("border-rose-500", "border-gray-300");
  }
});

DOM.subjectInput.forEach((sub) => {
  sub.addEventListener("input", () => {
    DOM.subjectInput.forEach((subject) => {
      subject.classList.remove("ring-1", "ring-rose-500");
    });
    const value = sub.value;
    if (value === "") {
      resetSubjectInput(sub);
      return;
    }
    const subjectValue = sub.valueAsNumber;
    if (isNaN(subjectValue) || subjectValue < 0 || subjectValue > 10) {
      sub.classList.replace("focus:ring-blue-500/60", "focus:ring-rose-500");
    } else {
      sub.classList.replace("focus:ring-rose-500", "focus:ring-blue-500/60");
    }
  });

  sub.addEventListener("change", () => {
    const value = sub.value;
    if (value === "") {
      resetSubjectInput(sub);
      return;
    }
    const subjectValue = sub.valueAsNumber;
    if (isNaN(subjectValue) || subjectValue < 0 || subjectValue > 10) {
      sub.classList.replace("border-gray-300", "border-rose-300");
    } else {
      sub.classList.replace("border-rose-300", "border-gray-300");
    }
  });
});
