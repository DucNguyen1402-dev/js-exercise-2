
const ERROR_STATE = {
   empty:{
    type: "empty",
    message: "Account type is required. Please select one from the list."
   }
}


const validator =[
  {
    isInvalid: value => value === "",
    error : ERROR_STATE.empty
  },
]

function processValidation(value){
   for(const v of validator){
    if(v.isInvalid(value)){
      return{
        isValid: false,
        error: v.error
      };
    };
   }
   return {isValid: true, error: null}
}


export function validateCustomerType(customerType){
  return processValidation(customerType);
}