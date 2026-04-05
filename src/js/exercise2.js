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

/**
 * ==========================================
 *          1. VALIDATION LOGIC
 * ==========================================
 */
function validateKwh(kwhValue) {
  if (isNaN(kwhValue) || kwhValue < 0) {
    return {
      isValid: false,
      message: "Please enter a valid kWh (must be a positive number).",
    };
  }

  if (kwhValue > 100000) {
    return {
      isValid: false,
      message: "The kWh count is too high, please double-check.",
    };
  }
  if (kwhValue === 0) {
    return {
      isValid: false,
      message: "The kWh value cannot be zero. Please enter a valid number",
    };
  }

  return { isValid: true, message: null };
}

function validateCustomerName(name){
  if(name.trim() === "") {
    return {
      isValid: false,
    message: "The Customer name form can't be empty!"
    };  
  }

  if(name.length < 2 || name.length > 50){
    return{
      isValid: false,
      message: "Name must be between 2 and 50 characters."
    };
  }
const regex = /^[a-zA-ZÀ-ỹ\s]+$/;
  if(!regex.test(name)){
    return{
      isValid: false,
      message: "Name can only contain letters and spaces."
    };
  }

  return  { isValid: true, message: null };
}
/**
 * ==========================================
 *     2. UI & DOM MANIPULATION (Helpers)
 * ==========================================
 */
function setInvalidKwhInputHightlight() {
  DOM.kwhInput.classList.replace("border-gray-300", "border-rose-500");
}

function resetKwhInputHightlight() {
  DOM.kwhInput.classList.replace("border-rose-500", "border-gray-300");
  DOM.kwhInput.classList.replace(
    "focus:ring-rose-500/60",
    "focus:ring-blue-500/60",
  );
}

 function setInvalidNameInputHightlight(){
    DOM.customerName.classList.replace("border-gray-300", "border-rose-500");
 }

  function resetNameInputHightlight(){
    DOM.customerName.classList.replace( "border-rose-500", "border-gray-300");
   DOM.customerName.classList.replace(
    "focus:ring-rose-500",
    "focus:ring-blue-500/60",
  );
 }

function resetAllInputValue() {
  const allInput = [...$$("input")];
  allInput.forEach((input) => (input.value = ""));
}

function resetResultArea() {
  DOM.warningArea.classList.add("hidden");
  DOM.warningArea.textContent = "";
  DOM.billMessage.classList.add("hidden");
  DOM.billValue.textContent = "";

}

/**
 * ==========================================
 *    3. CORE CALCULATION & DISPLAY LOGIC
 * ==========================================
 */
function electricityCalculator() {
  const kwhValue = DOM.kwhInput.valueAsNumber;

  const error = validateKwh(kwhValue);
  if (!error.isValid) {
    resetResultArea();
    setInvalidKwhInputHightlight();
    DOM.warningArea.classList.remove("hidden");
    DOM.warningArea.textContent = error.message;
    return;
  }

  const steps = [0, 50, 100, 200, 350];
  const prices = [500, 650, 850, 1100, 1300];

  const total = prices.reduce((acc, price, i) => {
    if (kwhValue > steps[i]) {
      const nextStep = steps[i + 1] || Infinity;
      const billable = Math.min(kwhValue, nextStep) - steps[i];
      return acc + billable * price;
    }
    return acc;
  }, 0);
   return total;
}

function showBill(value) {
  resetResultArea();
  DOM.billMessage.classList.remove("hidden");
  DOM.billMessage.querySelector(".customer__name__display").textContent =
    DOM.customerName.value;
  DOM.billValue.textContent = `${value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  })}`;
}

function handleCheck(){
   const customerName = DOM.customerName.value;
   const nameChecking = validateCustomerName(customerName);
   if(!nameChecking.isValid){
      resetResultArea();
     setInvalidNameInputHightlight();
      DOM.warningArea.classList.remove("hidden");
      DOM.warningArea.textContent = nameChecking.message;
     return;
   }
   const bill =  electricityCalculator();
   if(bill){
    showBill(bill);
   }

}
/**
 * ==========================================
 *          4. EVENT LISTENERS
 * ==========================================
 */

// Main Actions
DOM.checkBtn.addEventListener("click", handleCheck);

DOM.resetBtn.addEventListener("click", () => {
  resetAllInputValue();
  resetKwhInputHightlight();
  resetResultArea();
  resetNameInputHightlight();

});

// Input Interactions 
DOM.kwhInput.addEventListener("focus", () => {
  resetKwhInputHightlight();
});

DOM.kwhInput.addEventListener("input", () => {
  resetKwhInputHightlight();
  const value = DOM.kwhInput.value;

  if (value === "") return;

  const kwhValue = DOM.kwhInput.valueAsNumber;
  if (!validateKwh(kwhValue).isValid) {
    DOM.kwhInput.classList.replace(
      "focus:ring-blue-500/60",
      "focus:ring-rose-500/60",
    );
  }
});

DOM.kwhInput.addEventListener("change", () => {
  resetKwhInputHightlight();
  const value = DOM.kwhInput.value;

  if (value === "") return;

  const kwhValue = DOM.kwhInput.valueAsNumber;
  if (!validateKwh(kwhValue).isValid) {
    setInvalidKwhInputHightlight();
  }
});


DOM.customerName.addEventListener("focus", ()=>{
  resetNameInputHightlight();

});


DOM.customerName.addEventListener("input", ()=>{
  resetNameInputHightlight();

  const name = DOM.customerName.value;
  const error = validateCustomerName(name);
  if(!error.isValid){
     DOM.customerName.classList.replace("focus:ring-blue-500/60", "focus:ring-rose-500");
  }
});



DOM.customerName.addEventListener("change", ()=>{
  resetNameInputHightlight();

  const name = DOM.customerName.value;
  const error = validateCustomerName(name);
  if(!error.isValid){
     DOM.customerName.classList.replace("border-gray-300", "border-rose-500");
  }
});
