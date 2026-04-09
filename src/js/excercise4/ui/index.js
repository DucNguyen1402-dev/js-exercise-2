export { renderCustomerIdError, resetCustomerIdError } from "./customer-id.js";
export {
  renderCustomerTypeError,
  resetCustomerTypeError,
} from "./customer-type.js";
export { renderConnectionError, resetConnectionError } from "./connection.js";
export {
  renderPremiumChannelError,
  resetPremiumChannelError,
} from "./premium-channel.js";

import { resetResultUI } from "./display.js";
import { resetInputUI } from "./reset-form-ui.js";

export function resetAllUI(formUI, resultArea) {
  resetInputUI(formUI);
  resetResultUI(resultArea);
}
