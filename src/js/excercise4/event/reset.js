import {getForm} from "../dom.js";
import {resetConnectionInterationHighlight} from "./connection.js";
import {resetCustomerIdInterationHighlight} from "./customer-id.js";
import {resetPremiumInterationHighlight} from "./premium-channel.js";




const INTERACTION_RESET_MAP = {
  customerId: resetCustomerIdInterationHighlight,
  connection: resetConnectionInterationHighlight,
  premiumChannel: resetPremiumInterationHighlight,
};

export function initFormResetEvent(formInputUI){
    const {form} = getForm();
    const {customerType, ...formUIToReset} = formInputUI;
    form.addEventListener("reset", ()=>{
        object.entries(formUIToReset).forEach(([fieldName, fieldConfig]) =>{
            INTERACTION_RESET_MAP[fieldName]?.(fieldConfig);
        })
    })
}
