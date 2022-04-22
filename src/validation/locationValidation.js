import validate from '../utils/validateUtil';

const LocationFormValidate = (value, type, setErrorObject) => {
  switch (type) {
  case 'buildingDescription': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the description',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      buildingDescription: status,
    };
  });
    break;
  case 'buildingName': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid Name',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      buildingName: status,
    };
  });
    break;

  case 'buildingTotalFloors': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the total number of floors',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      buildingTotalFloors: status,
    };
  });
    break;
  case 'buildingTag': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Building tag',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      buildingTag: status,
    };
  });
    break;
  case 'buildingImg': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('customerLogo', value)) {
      status = {
        errorStatus: true,
        helperText: 'Select the Building Image',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      buildingImg: status,
    };
  });
    break;

  default: break;
  }
};

const AddVendorValidate = (value, type, setErrorObject) => {
  switch (type) {
  case 'vendorName': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('vendorName', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid Vendor Name',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      vendorName: status,
    };
  });
    break;
  case 'companyCode': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('companyCode', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid Company Code',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      companyCode: status,
    };
  });
    break;
  case 'phoneNumber': setErrorObject((oldErrorState) => {
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
      phoneNumber: status,
    };
  });
    break;
  case 'emailId': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('email', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a Valid Email Id',
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
  case 'contactPerson': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('contactPerson', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid Contact Person',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      contactPerson: status,
    };
  });
    break;
  default: break;
  }
};

const LocationAddFormValidate = (value, type, setErrorObject) => {
  switch (type) {
  case 'stateName': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('stateName', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the description',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      stateName: status,
    };
  });
    break;
  case 'latitude': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('latitude', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid Name',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      latitude: status,
    };
  });
    break;
  case 'longitude': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('longitude', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the total number of floors',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      longitude: status,
    };
  });
    break;
  default: break;
  }
};

const BranchFormValidate = (value, type, setErrorObject) => {
  switch (type) {
  case 'branchName': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('branchName', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the description',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      branchName: status,
    };
  });
    break;
  case 'latitude': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('latitude', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid Name',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      latitude: status,
    };
  });
    break;
  case 'longitude': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('longitude', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the total number of floors',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      longitude: status,
    };
  });
    break;
  default: break;
  }
};

const FacilityAddFormValidate = (value, type, setErrorObject) => {
  switch (type) {
  case 'facilityName': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('facilityName', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the description',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      facilityName: status,
    };
  });
    break;
  case 'latitude': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('latitude', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid Name',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      latitude: status,
    };
  });
    break;
  case 'longitude': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('longitude', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the total number of floors',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      longitude: status,
    };
  });
    break;
  default: break;
  }
};

const LabFormValidate = (value, type, setErrorObject) => {
  switch (type) {
  case 'labDepName': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('address', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter the Laboratory Name',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      labDepName: status,
    };
  });
    break;
  case 'labDepMap': setErrorObject((oldErrorState) => {
    let status = {};
    if (!validate('labDepMap', value)) {
      status = {
        errorStatus: true,
        helperText: 'Enter a valid Name',
      };
    } else {
      status = {
        errorStatus: false,
        helperText: '',
      };
    }
    return {
      ...oldErrorState,
      labDepMap: status,
    };
  });
    break;
  default: break;
  }
};

export {
  LocationFormValidate, AddVendorValidate, LocationAddFormValidate, FacilityAddFormValidate, BranchFormValidate, LabFormValidate,
};
