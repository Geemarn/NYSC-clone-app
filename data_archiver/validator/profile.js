const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateProfileInput = data => {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.phoneNo = !isEmpty(data.phoneNo) ? data.phoneNo : "";
  data.DOB = !isEmpty(data.DOB) ? data.DOB : "";
  data.placeOfBirth = !isEmpty(data.placeOfBirth) ? data.placeOfBirth : "";
  data.stateOfOrigin = !isEmpty(data.stateOfOrigin) ? data.stateOfOrigin : "";
  data.maritalStatus = !isEmpty(data.maritalStatus) ? data.maritalStatus : "";

  //title validation
  if (validator.isEmpty(data.title)) {
    errors.title = "title  field is required";
  }

  //firstName validation
  if (validator.isEmpty(data.firstName)) {
    errors.firstName = "firstName field required";
  }

  //lastName validation
  if (validator.isEmpty(data.lastName)) {
    errors.lastName = "lastName field required";
  }

  //address validation
  if (validator.isEmpty(data.address)) {
    errors.address = "address field required";
  }

  //phoneNo validation
  if (validator.isEmpty(data.phoneNo)) {
    errors.phoneNo = "phone No field required";
  }

  //DOB validation
  if (validator.isEmpty(data.DOB)) {
    errors.DOB = "date of birth field required";
  }

  //placeOfBirth validation
  if (validator.isEmpty(data.placeOfBirth)) {
    errors.placeOfBirth = "place of birth field required";
  }

  //state of origin validation
  if (validator.isEmpty(data.stateOfOrigin)) {
    errors.stateOfOrigin = "state of origin field required";
  }

  //maritalStatus validation
  if (validator.isEmpty(data.maritalStatus)) {
    errors.maritalStatus = "marital status field required";
  }

  //return
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
