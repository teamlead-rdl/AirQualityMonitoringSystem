import validate from '../utils/validateUtil';

const LoginFormValidate = (value, type, setErrorObject) => {
  if (type === 'email') {
    setErrorObject((oldErrorState) => {
      let status = {};
      if (!validate('email', value)) {
        status = {
          errorStatus: true,
          helperText: 'Enter a valid email id',
        };
      } else {
        status = {
          errorStatus: false,
          helperText: '',
        };
      }
      return {
        ...oldErrorState,
        emailId: status,
      };
    });
  } else {
    setErrorObject((oldErrorState) => {
      let status = {};
      if (!validate('password', value)) {
        status = {
          errorStatus: true,
          helperText: 'Enter a valid password',
        };
      } else {
        status = {
          errorStatus: false,
          helperText: '',
        };
      }
      return {
        ...oldErrorState,
        password: status,
      };
    });
  }
};

const OTPoptionValidate = (value, type, setErrorObject) => {
  if (type === 'emailId') {
    setErrorObject((oldErrorState) => {
      let status = {};
      if (!validate('emailId', value)) {
        status = {
          errorStatus: true,
          helperText: 'Enter a valid email id',
        };
      } else {
        status = {
          errorStatus: false,
          helperText: '',
        };
      }
      return {
        ...oldErrorState,
        emailId: status,
      };
    });
  } else if (type === 'phoneNo') {
    setErrorObject((oldErrorState) => {
      let status = {};
      if (!validate('phoneNo', value)) {
        status = {
          errorStatus: true,
          helperText: 'Enter a valid phone number',
        };
      } else {
        status = {
          errorStatus: false,
          helperText: '',
        };
      }
      return {
        ...oldErrorState,
        phone: status,
      };
    });
  }
};

const OTPvalidationValidate = (value, setErrorObject) => {
  setErrorObject((oldErrorState) => {
    let status = {};
    if (validate('otp', value)) {
      status = {
        errorStatus: true,
      };
    } else {
      status = {
        errorStatus: false,
      };
    }
    return {
      ...oldErrorState,
      otp: status,
    };
  });
};

const AddUserValidate = (value, type, setErrorObject) => {
  switch (type) {
  case 'email': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('email', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid email id',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      emailId: status,
    };
  });
    break;
  case 'employeeId': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('employeeId', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid EmployeeId Id',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      employeeId: status,
    };
  });
    break;
  case 'phone': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('phone', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid Phone number',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      phone: status,
    };
  });
    break;
  case 'fullName': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('fullName', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a Name',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      fullName: status,
    };
  });
    break;
  default: break;
  }
};

const AddCustomerValidate = (value, type, setErrorObject) => {
  switch (type) {
  case 'email': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('email', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid email id',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      emailID: status,
    };
  });
    break;
  case 'customerID': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('customerID', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid EmployeeId Id',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      customerID: status,
    };
  });
    break;
  case 'phone': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('phone', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid Phone number',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      phone: status,
    };
  });
    break;
  case 'fullName': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('fullName', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a Full Name of the customer',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      fullName: status,
    };
  });
    break;
  case 'address': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a address',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      address: status,
    };
  });
    break;
  case 'customerLogo': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('customerLogo', value)) {
      status = {
        errorStatus: true,
        helperText: 'Please select a Logo',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      customerLogo: status,
    };
  });
    break;
  case 'customerTheme': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('customerTheme', value)) {
      status = {
        errorStatus: true,
        helperText: 'Select a Theme color',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      customerTheme: status,
    };
  });
    break;
  default: break;
  }
};

const PasswordResetValidate = (value, type, setErrorObject) => {
  switch (type) {
  case 'oldPassword': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('password', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid password',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      oldPassword: status,
    };
  });
    break;
  case 'newPassword': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('password', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid password',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      newPassword: status,
    };
  });
    break;
  case 'confirmPassword': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('password', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid password',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      confirmPassword: status,
    };
  });
    break;
  default: break;
  }
};

const AddCategoryValidate = (value, type, setErrorObject) => {
  switch (type) {
  case 'deviceName': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid Device Name',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      deviceName: status,
    };
  });
    break;
  case 'deviceTag': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid Device Name',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      deviceTag: status,
    };
  });
    break;
  case 'macAddress': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Mac Address',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      macAddress: status,
    };
  });
    break;
  case 'firmwareVersion': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Firmware Version',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      firmwareVersion: status,
    };
  });
    break;
  case 'pollingPriority': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Polling Priority Value',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      pollingPriority: status,
    };
  });
    break;
  case 'nonPollingPriority': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Non-Polling Priority Value',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      nonPollingPriority: status,
    };
  });
    break;
  case 'sensorTag': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Sensor Tag',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      sensorTag: status,
    };
  });
    break;
  case 'digitalLowAlert': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Low Alert',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      digitalLowAlert: status,
    };
  });
    break;
  case 'digitalHighAlert': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the High Alert',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      digitalHighAlert: status,
    };
  });
    break;
  case 'categoryName': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('categoryName', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid Category name',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      categoryName: status,
    };
  });
    break;
  case 'categoryDescription': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('categoryDescription', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid Category Descriptions',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      categoryDescription: status,
    };
  });
    break;
  case 'sensorName': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid Sensor name',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      sensorName: status,
    };
  });
    break;
  case 'manufacturer': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid Manufacturer name',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      manufacturer: status,
    };
  });
    break;
  case 'partId': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Part Id',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      partId: status,
    };
  });
    break;
  default: break;
  }
};

const AnalogSensorValidate = (value, type, setErrorObject) => {
  switch (type) {
  case 'units': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('fullName', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Unit',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      units: status,
    };
  });
    break;
  case 'minRatedReading': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('number', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Minimum Rated Reading',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      minRatedReading: status,
    };
  });
    break;
  case 'maxRatedReading': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('number', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Maximum Rated Reading',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      maxRatedReading: status,
    };
  });
    break;
  case 'minRatedReadingScale': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('number', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Minimum Rated Reading Scale',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      minRatedReadingScale: status,
    };
  });
    break;
  case 'maxRatedReadingScale': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('number', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Maximum Rated Reading Scale',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      maxRatedReadingScale: status,
    };
  });
    break;
  case 'ipAddress': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the IP Address',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      ipAddress: status,
    };
  });
    break;
  case 'subnetMask': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Subnet Mask',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      subnetMask: status,
    };
  });
    break;
  case 'slaveId': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('number', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Slave Id',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      slaveId: status,
    };
  });
    break;
  case 'registerId': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('number', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Register Id',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      registerId: status,
    };
  });
    break;
  case 'criticalMinValue': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('number', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Critical Minimum Value',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      criticalMinValue: status,
    };
  });
    break;
  case 'criticalMaxValue': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('number', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Critical Maximum Value',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      criticalMaxValue: status,
    };
  });
    break;
  case 'criticalLowAlert': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Critical Low Alert',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      criticalLowAlert: status,
    };
  });
    break;
  case 'criticalHighAlert': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Critical High Alert',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      criticalHighAlert: status,
    };
  });
    break;
  case 'warningMinValue': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('number', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Warning Minimum Value',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      warningMinValue: status,
    };
  });
    break;
  case 'warningMaxValue': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('number', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Warning Maximum Value',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      warningMaxValue: status,
    };
  });
    break;
  case 'warningLowAlert': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Warning Low Alert',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      warningLowAlert: status,
    };
  });
    break;
  case 'warningHighAlert': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Warning High Alert',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      warningHighAlert: status,
    };
  });
    break;
  case 'outofrangeMinValue': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('number', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Out-of-Range Minimum Value',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      outofrangeMinValue: status,
    };
  });
    break;
  case 'outofrangeMaxValue': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('number', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Out-of-Range Maximum Value',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      outofrangeMaxValue: status,
    };
  });
    break;
  case 'outofrangeLowAlert': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Low Alert',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      outofrangeLowAlert: status,
    };
  });
    break;
  case 'outofrangeHighAlert': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the High Alert',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      outofrangeHighAlert: status,
    };
  });
    break;
  default: break;
  }
};

export {
  LoginFormValidate,
  OTPoptionValidate,
  OTPvalidationValidate,
  AddUserValidate,
  AddCustomerValidate,
  PasswordResetValidate,
  AddCategoryValidate,
  AnalogSensorValidate,
};
