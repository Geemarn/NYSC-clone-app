const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateEducationInput = data => {
  let errors = {};
  data.state1 = !isEmpty(data.state1) ? data.state1 : "";
  data.state2 = !isEmpty(data.state2) ? data.state2 : "";
  data.state3 = !isEmpty(data.state3) ? data.state3 : "";
  data.medCondition = !isEmpty(data.medCondition) ? data.medCondition : "";

  //state1 validation
  if (validator.isEmpty(data.state1)) {
    errors.state1 = "you must select first choice state";
  }

  //state2 validation
  if (validator.isEmpty(data.state2)) {
    errors.state2 = "you must select second choice state";
  }

  //state3 validation
  if (validator.isEmpty(data.state3)) {
    errors.state3 = "you must select third choice state";
  }
  //medCondition validation
  if (validator.isEmpty(data.medCondition)) {
    errors.medCondition = "select YES or NO";
  }
  //return
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
