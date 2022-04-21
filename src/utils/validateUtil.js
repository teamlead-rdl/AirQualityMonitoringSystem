/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
export default function validate(typeToValidate, valueToValidate) {
  switch (typeToValidate) {
  case 'email':
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      .test(valueToValidate);
  case 'password':
    return valueToValidate.length > 4;
  case 'otp':
    return (/^$|\s+/).test(valueToValidate);
  case 'employeeId':
    return (/^(?!\s*$).+/).test(valueToValidate);
  case 'customerID':
    return (/^(?!\s*$).+/).test(valueToValidate);
  case 'phone':
    return (/^[789]\d{9}$/).test(valueToValidate);
  case 'phoneNo':
  case 'phoneNumber':
    return (/^[789]\d{9}$|^$/).test(valueToValidate);
  case 'fullName':
    return (/^[a-zA-Z][a-zA-Z.\s]+$/).test(valueToValidate);
  case 'address':
    return (/^(?!\s*$).+/).test(valueToValidate);
  case 'customerLogo':
    return (/^(?!\s*$).+/).test(valueToValidate);
  case 'customerTheme':
    return (/^(?!\s*$).+/).test(valueToValidate);
  case 'vendorName':
    return (/^[a-zA-Z][a-zA-Z.\s]+$/).test(valueToValidate);
  case 'companyCode':
    return (/^(?!\s*$).+/).test(valueToValidate);
  case 'emailId':
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      .test(valueToValidate);
  case 'contactPerson':
    return (/^[a-zA-Z][a-zA-Z.\s]+$/).test(valueToValidate);
  case 'categoryName':
    return (/^(?!\s*$).+/).test(valueToValidate);
  case 'categoryDescription':
    return (/^(?!\s*$).+/).test(valueToValidate);
  case 'stateName':
    return (/^[a-zA-Z][a-zA-Z.\s]+$/).test(valueToValidate);
  case 'branchName':
    return (/^[a-zA-Z][a-zA-Z.\s]+$/).test(valueToValidate);
  case 'facilityName':
    return (/^[a-zA-Z][a-zA-Z.\s]+$/).test(valueToValidate);
  case 'labDepName':
    return (/^[a-zA-Z][a-zA-Z.\s]+$/).test(valueToValidate);
  case 'labDepMap':
    return (/^(?!\s*$).+/).test(valueToValidate);
  case 'number':
    return (/^\d+$/).test(valueToValidate);
  default:
    return false;
  }
}
