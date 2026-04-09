import { getForm } from "../dom.js";
import { resetCustomerIdError } from "./customer-id.js";
import { resetCustomerTypeError } from "./customer-type.js";
import { resetConnectionError } from "./connection.js";
import { resetPremiumChannelError } from "./premium-channel.js";

const RESET_UI_MAP = {
  customerId: resetCustomerIdError,
  customerType: resetCustomerTypeError,
  connection: resetConnectionError,
  premiumChannel: resetPremiumChannelError,
};

export function resetInputUI(formUI) {
  Object.entries(formUI).forEach(([fieldName, fieldConfig]) => {
    RESET_UI_MAP[fieldName]?.(fieldConfig);
  });
  const { form } = getForm();
  form.reset();

}
