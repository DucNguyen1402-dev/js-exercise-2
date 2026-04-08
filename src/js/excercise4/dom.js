import {$, ElementNotFoundError} from "../dom-system.js";



export function getCustomerIdDOM(){
    return{
        customerIdInput: $(".customer__id__input"),
        customerIdWarning: $(".customer__id__warning")
    };
}


export function getCustomerTypeSelectDOM(){
    return{
        customerSelectedType: $(".select__type"),
        customerTypeWarning: $(".customer_type__warning")
    };
}

export function getConnectionDOM(){
    return{
        connectionInput: $(".connections__input"),
        connectionWarning: $(".connection__warning")
    };
}

export function getPremiumChannelDOM(){
    return{
        premiumChannelsInput: $(".premium__channel__input"),
        premiumChannelsWarning: $(".premium__channel__warning")
    };
}


export function getResultArea(){
    return{
        resultMessage: $(".cable__billing").querySelector(".result__message"),
        idDisplay: $(".cable__billing").querySelector("id__display"),
        totalValueDisplay: $(".cable__billing").querySelector(".total__value__display")

    };
}

export function getBtn(){
     return{
        calculateBtn: $(".cable__billing").querySelector(".calculate__btn"),
        resetBtn: $(".cable__billing").querySelector(".calculate__btn"),
    };
}