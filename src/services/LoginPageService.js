import ApplicationStore from './../utils/localStorageUtil';
const successCaseCode = [200, 201];

const _fetchService = (PATH, serviceMethod, data, successCallback, errorCallBack) => {
    const { user_token, userDetails } = ApplicationStore().getStorage('userDetails');
    const END_POINT = 'https://varmatrix.com/Aqms/api/';
    const {emailId, userRole, companyCode} = userDetails;
        
    const headers = {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${user_token}`,
        'companyCode' : `${companyCode}`,
        'userId': `${emailId}`,
        'userRole': `${userRole}`
    };
    const body = (serviceMethod === 'GET') || (serviceMethod === 'DELETE') ? {} : { body: JSON.stringify(data) };

    const bodyParameters = {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        headers,
        ...body,
    }

    const bodyObject = {
        method: serviceMethod,
        ...bodyParameters
    }

    return fetch(END_POINT + PATH, bodyObject)
        .then(response => {
            if (successCaseCode.indexOf(response.status) > -1) {
                return response.json();
            } else {
                throw {
                    errorStatus: response.status,
                    errorObject: response.json()
                }
            }
        })
        .then((data) => successCallback(data))
        .catch(error => {
            error.errorObject.then(errorResponse => {
                const errorMessage = errorResponse.error ? errorResponse.error : errorResponse.message;
                errorCallBack(error.errorStatus, errorMessage);
            });
        });
}

export const LoginService = (data) => {
    const PATH = 'login';
    const END_POINT = 'https://varmatrix.com/Aqms/api/';
    const SERVICE_METHOD = 'POST';
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    
    return fetch(END_POINT + PATH, {
        method: SERVICE_METHOD,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers,
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
}

export const LogoutService = (successCallback, errorCallBack) => {
    return _fetchService('logout', 'POST', {}, successCallback, errorCallBack);
}

export const ReceiveOTPService = (data, successCallback, errorCallBack) => {
    return _fetchService('sendOtp', 'POST', data, successCallback, errorCallBack);
}

export const ValidateOTPService = (data, successCallback, errorCallBack) => {
    return _fetchService('requestToken', 'POST', data, successCallback, errorCallBack);
}

export const FetchCustomerService = (successCallback, errorCallBack) => {
    return _fetchService('customers', 'GET', {}, successCallback, errorCallBack);
}

export const FetchEmployees = (successCallback, errorCallBack) => {
    return _fetchService('empuser', 'GET', {}, successCallback, errorCallBack);
}

//--------- User--------------//
export const FetchUserService = (successCallback, errorCallBack) => {
    return _fetchService('empuser', 'GET', {}, successCallback, errorCallBack);
}

export const UserAddService = (data, successCallback, errorCallBack) => {
    return _fetchService('empuser/add', 'POST', data, successCallback, errorCallBack);
}

export const UserUpdateService = (data, successCallback, errorCallBack) => {
    return _fetchService(`empuser/${data.id}/update`, 'POST', data, successCallback, errorCallBack);
}

export const UserDeleteService = (data, successCallback, errorCallBack) => {
    return _fetchService('empuser/' + data.id + '/delete', 'POST', data, successCallback, errorCallBack);
}
//--- Unblock user ----//
export const UnblockUserService = (data, successCallback, errorCallBack) => {
    return _fetchService('blockedUserPasswordAutogenerate', 'POST', data, successCallback, errorCallBack);
}

//------------- Customer -----------//
export const CustomerAddService = (data, successCallback, errorCallBack) => {
    return _fetchService('customer/add', 'POST', data, successCallback, errorCallBack);
}

export const CustomerEditService = (data, successCallback, errorCallBack) => {
    return _fetchService('customer/' + (data.id) + '/update', 'POST', data, successCallback, errorCallBack);
}

export const CustomerDeleteService = (data, successCallback, errorCallBack) => {
    return _fetchService('customer/' + data.id + '/delete', 'POST', data, successCallback, errorCallBack);
}

export const PasswordResetService = (data, successCallback, errorCallBack) => {
    return _fetchService('resetUserPassword', 'POST', data, successCallback, errorCallBack);
}

// ---------------------- Location -----------------

export const FetchLocationService = (successCallback, errorCallBack) => {
    return _fetchService('search', 'POST', {}, successCallback, errorCallBack);
}

export const LocationAddService = (data, successCallback, errorCallBack) => {
    return _fetchService('location/add', 'POST', data, successCallback, errorCallBack);
}

export const LocationEditService = (data, successCallback, errorCallBack) => {
    return _fetchService('location/' + data.locationId + '/update', 'POST', data, successCallback, errorCallBack);
}

export const LocationDeleteService = (data, successCallback, errorCallBack) => {
    return _fetchService('location/' + data.id + '/delete', 'DELETE', {}, successCallback, errorCallBack);
}

//-------------------- Branch ----------------------

export const FetchBranchService = (data, successCallback, errorCallBack) => {
    return _fetchService('search', 'POST', data, successCallback, errorCallBack);
}

export const BranchAddService = (data, successCallback, errorCallBack) => {
    return _fetchService('branch/add', 'POST', data, successCallback, errorCallBack);
}

export const BranchEditService = (data, successCallback, errorCallBack) => {
    return _fetchService('branch/' + (data.branch_id) + '/update', 'POST', data, successCallback, errorCallBack);
}

export const BranchDeleteService = (data, successCallback, errorCallBack) => {
    return _fetchService('branch/' + (data.id) + '/delete', 'DELETE', {}, successCallback, errorCallBack);
}

//--------------- Facility ---------------

export const FetchFacilitiyService = (data, successCallback, errorCallBack) => {
    return _fetchService('search', 'POST', data, successCallback, errorCallBack);
}

export const FacilitiyAddService = (data, successCallback, errorCallBack) => {
    return _fetchService('facility/add', 'POST', data, successCallback, errorCallBack);
}

export const FacilityEditService = (data, successCallback, errorCallBack) => {
    return _fetchService('facility/' + (data.facilityId) + '/update', 'POST', data, successCallback, errorCallBack);
}

export const FacilityDeleteService = (data, successCallback, errorCallBack) => {
    return _fetchService('facility/' + (data.id) + '/delete', 'DELETE', {}, successCallback, errorCallBack);
}

//----------- Building -------------

export const BuildingFetchService = (data, successCallback, errorCallBack) => {
    return _fetchService('search', 'POST', data, successCallback, errorCallBack);
}
export const BuildingAddService = (data, successCallback, errorCallBack) => {
    return _fetchService('building/add', 'POST', data, successCallback, errorCallBack);
}

export const BuildingEditService = (data, successCallback, errorCallBack) => {
    return _fetchService('building/' + (data.buildingId) + '/update', 'POST', data, successCallback, errorCallBack);
}

export const BuildingDeleteService = (data, successCallback, errorCallBack) => {
    return _fetchService('building/' + (data.id) + '/delete', 'DELETE', {}, successCallback, errorCallBack);
}

//----------- Floor -------------

export const FloorfetchService = (data, successCallback, errorCallBack) => {
    return _fetchService('search', 'POST', data, successCallback, errorCallBack);
}
export const FloorAddService = (data, successCallback, errorCallBack) => {
    return _fetchService('floor/add', 'POST', data, successCallback, errorCallBack);
}

export const FloorEditService = (data, successCallback, errorCallBack) => {
    return _fetchService('floor/' + (data.floor_id) + '/update', 'POST', data, successCallback, errorCallBack);
}
export const FloorDeleteService = (data,successCallback, errorCallBack) => {
    return _fetchService('floor/' + (data.id) + '/delete', 'DELETE', {}, successCallback, errorCallBack);
}
// ------------ Lab --------------

export const LabfetchService = (data, successCallback, errorCallBack) => {
    return _fetchService('search', 'POST', data, successCallback, errorCallBack);
}

export const LabAddService = (data, successCallback, errorCallBack) => {
    return _fetchService('labDepartment/add', 'POST', data, successCallback, errorCallBack);
}

export const LabEditService = (data, successCallback, errorCallBack) => {
    return _fetchService('labDepartment/' + (data.labid) + '/update', 'POST', data, successCallback, errorCallBack);
}

export const LabDeleteService = (data, successCallback, errorCallBack) => {
    return _fetchService('labDepartment/' + (data.id) + '/delete', 'DELETE', {}, successCallback, errorCallBack);
}


export const FetchCategoryService = (successCallback, errorCallBack) => {
    return _fetchService('category', 'GET', {}, successCallback, errorCallBack);
}

export const FetchDeviceLocationService = (successCallback, errorCallBack) => {
    return _fetchService('deviceloc', 'GET', {}, successCallback, errorCallBack);
}

export const AddDeviceLocationService = (data, successCallback, errorCallBack) => {
    return _fetchService('deviceloc/add', 'POST', data, successCallback, errorCallBack);
}

export const EditDeviceLocationService = (data, successCallback, errorCallBack) => {
    return _fetchService('deviceloc/'+ (data.devicelocationId) + '/update', 'POST', data, successCallback, errorCallBack);
}

export const DeleteDeviceLocationService = (successCallback, errorCallBack, data) => {
    return _fetchService('deviceloc/' + (data.id) + '/delete', 'DELETE', {}, successCallback, errorCallBack);
}

// -------- Category -------------
export const CategoryFetchService = (successCallback, errorCallBack) => {
    return _fetchService('category', 'GET', {}, successCallback, errorCallBack);
}
export const CategoryAddService = (data, successCallback, errorCallBack) => {
    return _fetchService('category/add', 'POST', data, successCallback, errorCallBack);
}
export const CategoryEditService = (data, successCallback, errorCallBack) => {
    return _fetchService('category/' + (data.id) + '/update', 'POST', data, successCallback, errorCallBack);
}
export const CategoryDeleteService = (data, successCallback, errorCallBack) =>{
    return _fetchService('category/' + (data.id) + '/delete', 'DELETE', {}, successCallback, errorCallBack);
}


//---------- Device ---------
export const DeviceFetchService = (data, successCallback, errorCallBack) => {
    return _fetchService('search', 'POST', data, successCallback, errorCallBack);
}
export const DeviceAddService = (data, successCallback, errorCallBack) => {
    return _fetchService('device/add', 'POST', data, successCallback, errorCallBack);
}
export const DeviceEditService = (data, successCallback, errorCallBack) => {
    return _fetchService('device/' + (data.id) + '/update', 'POST', data, successCallback, errorCallBack);
}
export const DeviceDeleteService = (data, successCallback, errorCallBack) =>{
    return _fetchService('device/' + (data.id) + '/delete', 'DELETE', {}, successCallback, errorCallBack);
}

// ------------ Vendor --------

export const VendorDeleteService = (data, successCallback, errorCallBack) => {
    return _fetchService('vendor/'+data.id+'/delete', 'DELETE', {}, successCallback, errorCallBack);
}

export const VendorEditService = (data, successCallback, errorCallBack) => { 
    return _fetchService('vendor/'+(data.id)+'/update', 'POST', data, successCallback, errorCallBack);
}

export const FetchVendorService = (successCallback, errorCallBack) => {
    return _fetchService('vendor', 'GET', {}, successCallback, errorCallBack);
}

export const VendorAddService = (data, successCallback, errorCallBack) => {
    return _fetchService('vendor/add', 'POST', data, successCallback, errorCallBack);
}

//------- Sensor category ---------------//
export const SensorCategoryFetchService = (successCallback, errorCallBack) => {
    return _fetchService('sensorCategory', 'GET', {}, successCallback, errorCallBack);
}

export const SensorCategoryAddService = (data, successCallback, errorCallBack) => {
    return _fetchService('sensorCategory/add', 'POST', data, successCallback, errorCallBack);
}

export const SensorCategoryEditService = (data, successCallback, errorCallBack) => {
    return _fetchService('sensorCategory/' + (data.id) + '/update', 'POST', data, successCallback, errorCallBack);
}

export const SensorCategoryDeleteService = (data, successCallback, errorCallBack) =>{
    return _fetchService('sensorCategory/' + (data.id) + '/delete', 'DELETE', {}, successCallback, errorCallBack);
}
//--------------- Sensor Adding ---------------------//

export const SensorAddService = (data, successCallback, errorCallBack) => {
    return _fetchService('sensorUnit/add', 'POST', data, successCallback, errorCallBack);
}

export const SensorEditService = (data, successCallback, errorCallBack) => {
    return _fetchService('sensorUnit/' + (data.id) + '/update', 'POST', data, successCallback, errorCallBack);
}
export const SensorFetchService = (data, successCallback, errorCallBack) => {
    return _fetchService('sensorUnit/'+data, 'GET', {}, successCallback, errorCallBack);
}

export const SensorDeleteService = (data, successCallback, errorCallBack) =>{
    return _fetchService('sensorUnit/' + (data.id) + '/delete', 'DELETE', {}, successCallback, errorCallBack);
}

export const SensorListFetchService = (successCallback, errorCallBack) => {
    return _fetchService('sensorUnit', 'GET', {}, successCallback, errorCallBack);
}

//------------ Sensor deploying ------------------//
export const SensorDeployAddService = (data, successCallback, errorCallBack) => {
    return _fetchService('sensor/add', 'POST', data, successCallback, errorCallBack);
}

export const SensorDeployDeleteService = (data, successCallback, errorCallBack) =>{
    return _fetchService('sensor/' + (data.id) + '/delete', 'DELETE', {}, successCallback, errorCallBack);
}

export const SensorDeployFetchService = (data, successCallback, errorCallBack) => {
    return _fetchService('search', 'POST', data, successCallback, errorCallBack);
}
//------------ Config setup ------------------//

export const ConfigSetupFetchService = (successCallback, errorCallBack) => {
    return _fetchService('configSetup', 'GET', {}, successCallback, errorCallBack);
}

export const ConfigSetupAddService = (data, successCallback, errorCallBack) => {
    return _fetchService('configSetup/add', 'POST', data, successCallback, errorCallBack);
}

export const ConfigSetupEditService = (data, successCallback, errorCallBack) => {
    return _fetchService('configSetup/' + (data.id) + '/update', 'POST', data, successCallback, errorCallBack);
}

export const ConfigSetupDeleteService = (data, successCallback, errorCallBack) =>{
    return _fetchService('configSetup/' + (data.id) + '/delete', 'DELETE', {}, successCallback, errorCallBack);
}

//------------ Device Config setup ------------------//

export const DeviceConfigSetupAddService = (data, successCallback, errorCallBack) => {
    return _fetchService('DeviceConfigSetup/add', 'POST', data, successCallback, errorCallBack);
}

export const DeviceConfigSetupFetchService = (data, successCallback, errorCallBack) => {
    return _fetchService('DeviceConfigSetup/'+ data.id +'/getDeviceConfigData', 'GET', {}, successCallback, errorCallBack);
}