export function renderResult(displayUI, result) {
  displayUI.message.classList.remove("hidden");
  displayUI.id.textContent = result.id;
  displayUI.total.textContent = result.total;
}

export function resetResultUI({ area, id, value }) {
  area.classList.add("hidden");
  id.textContent = "";
  value.textContent = "";
}
