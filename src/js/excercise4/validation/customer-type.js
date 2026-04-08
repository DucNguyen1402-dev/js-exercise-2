import {ElementNotFoundError} from "../../dom-system";
import {getConnectionDOM} from "../dom.js";

const DOM = (() => {
  try {
    return getConnectionDOM();
  } catch (error) {
    if (error instanceof ElementNotFoundError) {
      console.error(error.message);
    } else {
      console.error("Something went wrong: ", error.message);
    }
  }
})();


