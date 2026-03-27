export class ElementNotFoundError extends Error {
  constructor(selector) {
    super(`Element not found for Selector: "${selector}"`);
    this.name = "ElementNotFoundError";
  }
}

export function $(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    throw new ElementNotFoundError(selector);
  }
  return element;
}



export function $$(selector) {
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) {
    throw new ElementNotFoundError(selector);
  }
  return elements;
}

// Export hàm $e
export const $e = (tag, text, cls) => {
  const el = document.createElement(tag);
  if (text) el.textContent = text;
  if (cls) el.classList.add (cls);
  return el;
};
