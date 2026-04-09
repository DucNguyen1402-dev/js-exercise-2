import {$} from "../dom-system.js";



export function getForm(){
    return{
        form: $(".cable__billing__form")
    };
}

export function getCustomerIdDOM(){
    return{
        customerIdInput: $(".customer__id__input"),
        customerIdWarning: $(".customer__id__warning")
    };
}


export function getCustomerTypeSelectDOM(){
    return{
        customerSelectedType: $(".select__type"),
        customerTypeWarning: $(".customer__type__warning")
    };
}



export function getConnectionDOM(){
    return{
        connectionInput: $(".connections__input"),
        connectionWarning: $(".connection__warning"),
    };
}

export function getConnectionForm(){
    return {
        connectionForm: $(".connections__form")
    }
}

export function getPremiumChannelDOM(){
    return{
        premiumChannelsInput: $(".premium__channel__input"),
        premiumChannelsWarning: $(".premium__channel__warning")
    };
}


export function getResultArea(){
    return{
        resultArea: $(".cable__billing").querySelector(".result__message"),
        idDisplay: $(".cable__billing").querySelector(".id__display"),
        totalValueDisplay: $(".cable__billing").querySelector(".total__value__display")

    };
}

export function getBtn(){
     return{
        calculateBtn: $(".cable__billing").querySelector(".calculate__btn"),
        resetBtn: $(".cable__billing").querySelector(".reset__btn"),
    };
}