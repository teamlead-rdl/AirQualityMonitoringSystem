/* eslint-disable max-len */
import ApplicationStore from '../utils/localStorageUtil';

const successCaseCode = [200, 201];

const _fetchService = (PATH, serviceMethod, data, successCallback, errorCallBack) => {
  const { user_token, userDetails } = ApplicationStore().getStorage('userDetails');
  const END_POINT = 'https://varmatrix.com/Aqms/api/';
  const { emailId, userRole, companyCode } = userDetails;

  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${user_token}`,
    companyCode: `${companyCode}`,
    userId: `${emailId}`,
    userRole: `${userRole}`,
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
  };

  const bodyObject = {
    method: serviceMethod,
    ...bodyParameters,
  };

  return fetch(END_POINT + PATH, bodyObject)
    .then((response) => {
      if (successCaseCode.indexOf(response.status) > -1) {
        return response.json();
      }
      // eslint-disable-next-line no-throw-literal
      throw {
        errorStatus: response.status,
        errorObject: response.json(),
      };
    })
    .then((dataResponse) => successCallback(dataResponse))
    .catch((error) => {
      error.errorObject.then((errorResponse) => {
        if (error.errorStatus === 401 && errorResponse.message === 'Unable to access the page, Token Expired') {
          ApplicationStore().clearStorage();
          location.reload();
        }
        errorCallBack(error.errorStatus, errorResponse.message);
      });
    });
};

export const LoginService = (data) => {
  const PATH = 'login';
  const END_POINT = 'https://varmatrix.com/Aqms/api/';
  const SERVICE_METHOD = 'POST';
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return fetch(END_POINT + PATH, {
    method: SERVICE_METHOD,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
};

export const LogoutService = (successCallback, errorCallBack) => _fetchService('logout', 'POST', {}, successCallback, errorCallBack);

export const ReceiveOTPService = (data, successCallback, errorCallBack) => _fetchService('sendOtp', 'POST', data, successCallback, errorCallBack);

export const ValidateOTPService = (data, successCallback, errorCallBack) => _fetchService('requestToken', 'POST', data, successCallback, errorCallBack);

export const FetchCustomerService = (successCallback, errorCallBack) => _fetchService('customers', 'GET', {}, successCallback, errorCallBack);

export const FetchEmployees = (successCallback, errorCallBack) => _fetchService('empuser', 'GET', {}, successCallback, errorCallBack);

// --------- User--------------//
export const FetchUserService = (successCallback, errorCallBack) => _fetchService('empuser', 'GET', {}, successCallback, errorCallBack);

export const UserAddService = (data, successCallback, errorCallBack) => _fetchService('empuser/add', 'POST', data, successCallback, errorCallBack);

export const UserUpdateService = (data, successCallback, errorCallBack) => _fetchService(`empuser/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const UserDeleteService = (data, successCallback, errorCallBack) => _fetchService(`empuser/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);

// --- Unblock user ----//
export const UnblockUserService = (data, successCallback, errorCallBack) => _fetchService('blockedUserPasswordAutogenerate', 'POST', data, successCallback, errorCallBack);

// ------------- Customer -----------//
export const CustomerAddService = (data, successCallback, errorCallBack) => _fetchService('customer/add', 'POST', data, successCallback, errorCallBack);

export const CustomerEditService = (data, successCallback, errorCallBack) => _fetchService(`customer/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const CustomerDeleteService = (data, successCallback, errorCallBack) => _fetchService(`customer/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);

export const PasswordResetService = (data, successCallback, errorCallBack) => _fetchService('resetUserPassword', 'POST', data, successCallback, errorCallBack);

// ---------------------- Location -----------------
export const FetchLocationService = (successCallback, errorCallBack) => _fetchService('search', 'POST', {}, successCallback, errorCallBack);

export const LocationAddService = (data, successCallback, errorCallBack) => _fetchService('location/add', 'POST', data, successCallback, errorCallBack);

export const LocationEditService = (data, successCallback, errorCallBack) => _fetchService(`location/${data.locationId}/update`, 'POST', data, successCallback, errorCallBack);

export const LocationDeleteService = (id, successCallback, errorCallBack) => _fetchService(`location/${id}/delete`, 'DELETE', {}, successCallback, errorCallBack);

// -------------------- Branch ----------------------
export const FetchBranchService = (data, successCallback, errorCallBack) => _fetchService('search', 'POST', data, successCallback, errorCallBack);

export const BranchAddService = (data, successCallback, errorCallBack) => _fetchService('branch/add', 'POST', data, successCallback, errorCallBack);

export const BranchEditService = (data, successCallback, errorCallBack) => _fetchService(`branch/${data.branch_id}/update`, 'POST', data, successCallback, errorCallBack);

export const BranchDeleteService = (id, successCallback, errorCallBack) => _fetchService(`branch/${id}/delete`, 'DELETE', {}, successCallback, errorCallBack);

// --------------- Facility ---------------
export const FetchFacilitiyService = (data, successCallback, errorCallBack) => _fetchService('search', 'POST', data, successCallback, errorCallBack);

export const FacilitiyAddService = (data, successCallback, errorCallBack) => _fetchService('facility/add', 'POST', data, successCallback, errorCallBack);

export const FacilityEditService = (data, successCallback, errorCallBack) => _fetchService(`facility/${data.facilityId}/update`, 'POST', data, successCallback, errorCallBack);

export const FacilityDeleteService = (id, successCallback, errorCallBack) => _fetchService(`facility/${id}/delete`, 'DELETE', {}, successCallback, errorCallBack);

// ----------- Building -------------
export const BuildingFetchService = (data, successCallback, errorCallBack) => _fetchService('search', 'POST', data, successCallback, errorCallBack);

export const BuildingAddService = (data, successCallback, errorCallBack) => _fetchService('building/add', 'POST', data, successCallback, errorCallBack);

export const BuildingEditService = (data, successCallback, errorCallBack) => _fetchService(`building/${data.buildingId}/update`, 'POST', data, successCallback, errorCallBack);

export const BuildingDeleteService = (id, successCallback, errorCallBack) => _fetchService(`building/${id}/delete`, 'DELETE', {}, successCallback, errorCallBack);

// ----------- Floor -------------
export const FloorfetchService = (data, successCallback, errorCallBack) => _fetchService('search', 'POST', data, successCallback, errorCallBack);

export const FloorAddService = (data, successCallback, errorCallBack) => _fetchService('floor/add', 'POST', data, successCallback, errorCallBack);

export const FloorEditService = (data, successCallback, errorCallBack) => _fetchService(`floor/${data.floor_id}/update`, 'POST', data, successCallback, errorCallBack);

export const FloorDeleteService = (id, successCallback, errorCallBack) => _fetchService(`floor/${id}/delete`, 'DELETE', {}, successCallback, errorCallBack);

// ------------ Lab --------------
export const LabfetchService = (data, successCallback, errorCallBack) => _fetchService('search', 'POST', data, successCallback, errorCallBack);

export const LabAddService = (data, successCallback, errorCallBack) => _fetchService('labDepartment/add', 'POST', data, successCallback, errorCallBack);

export const LabEditService = (data, successCallback, errorCallBack) => _fetchService(`labDepartment/${data.labid}/update`, 'POST', data, successCallback, errorCallBack);

export const LabDeleteService = (id, successCallback, errorCallBack) => _fetchService(`labDepartment/${id}/delete`, 'DELETE', {}, successCallback, errorCallBack);

export const FetchCategoryService = (successCallback, errorCallBack) => _fetchService('category', 'GET', {}, successCallback, errorCallBack);

export const FetchDeviceLocationService = (successCallback, errorCallBack) => _fetchService('deviceloc', 'GET', {}, successCallback, errorCallBack);

export const AddDeviceLocationService = (data, successCallback, errorCallBack) => _fetchService('deviceloc/add', 'POST', data, successCallback, errorCallBack);

export const EditDeviceLocationService = (data, successCallback, errorCallBack) => _fetchService(`deviceloc/${data.devicelocationId}/update`, 'POST', data, successCallback, errorCallBack);

export const DeleteDeviceLocationService = (successCallback, errorCallBack, data) => _fetchService(`deviceloc/${data.id}/delete`, 'DELETE', {}, successCallback, errorCallBack);

// -------- Category -------------
export const CategoryFetchService = (successCallback, errorCallBack) => _fetchService('category', 'GET', {}, successCallback, errorCallBack);

export const CategoryAddService = (data, successCallback, errorCallBack) => _fetchService('category/add', 'POST', data, successCallback, errorCallBack);

export const CategoryEditService = (data, successCallback, errorCallBack) => _fetchService(`category/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const CategoryDeleteService = (id, successCallback, errorCallBack) => _fetchService(`category/${id}/delete`, 'DELETE', {}, successCallback, errorCallBack);

// ---------- Device ---------
export const DeviceFetchService = (data, successCallback, errorCallBack) => _fetchService('search', 'POST', data, successCallback, errorCallBack);

export const DeviceAddService = (data, successCallback, errorCallBack) => _fetchService('device/add', 'POST', data, successCallback, errorCallBack);

export const DeviceEditService = (data, successCallback, errorCallBack) => _fetchService(`device/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const DeviceDeleteService = (id, successCallback, errorCallBack) => _fetchService(`device/${id}/delete`, 'DELETE', {}, successCallback, errorCallBack);

// ------------ Vendor --------
export const VendorDeleteService = (id, successCallback, errorCallBack) => _fetchService(`vendor/${id}/delete`, 'DELETE', {}, successCallback, errorCallBack);

export const VendorEditService = (data, successCallback, errorCallBack) => _fetchService(`vendor/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const FetchVendorService = (successCallback, errorCallBack) => _fetchService('vendor', 'GET', {}, successCallback, errorCallBack);

export const VendorAddService = (data, successCallback, errorCallBack) => _fetchService('vendor/add', 'POST', data, successCallback, errorCallBack);

// ------- Sensor category ---------------//
export const SensorCategoryFetchService = (successCallback, errorCallBack) => _fetchService('sensorCategory', 'GET', {}, successCallback, errorCallBack);

export const SensorCategoryAddService = (data, successCallback, errorCallBack) => _fetchService('sensorCategory/add', 'POST', data, successCallback, errorCallBack);

export const SensorCategoryEditService = (data, successCallback, errorCallBack) => _fetchService(`sensorCategory/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const SensorCategoryDeleteService = (id, successCallback, errorCallBack) => _fetchService(`sensorCategory/${id}/delete`, 'DELETE', {}, successCallback, errorCallBack);
// --------------- Sensor Adding ---------------------//

export const SensorAddService = (data, successCallback, errorCallBack) => _fetchService('sensorUnit/add', 'POST', data, successCallback, errorCallBack);

export const SensorEditService = (data, successCallback, errorCallBack) => _fetchService(`sensorUnit/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const SensorFetchService = (data, successCallback, errorCallBack) => _fetchService(`sensorUnit/${data}`, 'GET', {}, successCallback, errorCallBack);

export const SensorDeleteService = (id, successCallback, errorCallBack) => _fetchService(`sensorUnit/${id}/delete`, 'DELETE', {}, successCallback, errorCallBack);

export const SensorListFetchService = (successCallback, errorCallBack) => _fetchService('sensorUnit', 'GET', {}, successCallback, errorCallBack);

// ------------ Sensor deploying ------------------//
export const SensorDeployAddService = (data, successCallback, errorCallBack) => _fetchService('sensor/add', 'POST', data, successCallback, errorCallBack);

export const SensorDeployEditService = (data, successCallback, errorCallBack) => _fetchService(`sensor/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const SensorDeployDeleteService = (id, successCallback, errorCallBack) => _fetchService(`sensor/${id}/delete`, 'DELETE', {}, successCallback, errorCallBack);

export const SensorDeployFetchService = (data, successCallback, errorCallBack) => _fetchService('search', 'POST', data, successCallback, errorCallBack);

export const SensorPropertiesUpdateService = (data, successCallback, errorCallBack) => _fetchService(`sensorProperties/${data.id}/update`, 'POST', data, successCallback, errorCallBack);
// ------------ Config setup ------------------//

export const ConfigSetupFetchService = (successCallback, errorCallBack) => _fetchService('configSetup', 'GET', {}, successCallback, errorCallBack);

export const ConfigSetupAddService = (data, successCallback, errorCallBack) => _fetchService('configSetup/add', 'POST', data, successCallback, errorCallBack);

export const ConfigSetupEditService = (data, successCallback, errorCallBack) => _fetchService(`configSetup/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const ConfigSetupDeleteService = (id, successCallback, errorCallBack) => _fetchService(`configSetup/${id}/delete`, 'DELETE', {}, successCallback, errorCallBack);

// ------------ Device Config setup ------------------//

export const DeviceConfigSetupAddService = (data, successCallback, errorCallBack) => _fetchService('DeviceConfigSetup/add', 'POST', data, successCallback, errorCallBack);

export const DeviceConfigSetupFetchService = (data, successCallback, errorCallBack) => { return _fetchService(`DeviceConfigSetup/${data.id}/getDeviceConfigData`, 'GET', {}, successCallback, errorCallBack); };

// ----------- STEL & TWA setup -----------------------//

export const StelEditService = (data, successCallback, errorCallBack) => { return _fetchService(`stel/${data.id}/update`, 'POST', data, successCallback, errorCallBack); };

// ------------ Change Device Mode -------------------//

export const ChangeDeviceMode = (data, successCallback, errorCallBack) => { return _fetchService(`deviceMode/${data.id}/update`, 'POST', data, successCallback, errorCallBack); };

// ------------- Dashboard Chart Display ------------//

export const DisplayLineChart = (successCallback, errorCallBack) => { return _fetchService('aqmiSensorValues', 'POST', {}, successCallback, errorCallBack); };

// ------------- Calibration Result ---------------//

export const CalibrationAddService = (data, successCallback, errorCallBack) => _fetchService('calibrationTestResult/add', 'POST', data, successCallback, errorCallBack);

// -------------DeployedSensor List --------------//
export const deviceDeployedSensors = (id, successCallback, errorCallBack) => _fetchService(`deviceDeployedSensors/${id}`, 'GET', {}, successCallback, errorCallBack);

// -------------DeployedSensorTable List --------------//
export const DeployedSensorsDetailsList = (data, successCallback, errorCallBack) => _fetchService('calibrationTestResult', 'POST', data, successCallback, errorCallBack);

// ------------- Bump Test ----------------------------//
export const BumpTestAddService = (data, successCallback, errorCallBack) => _fetchService('bumpTestResult/add', 'POST', data, successCallback, errorCallBack);

export const BumpTestFetchService = (data, successCallback, errorCallBack) => _fetchService('bumpTestResult', 'POST', data, successCallback, errorCallBack);

// --------------User Logs ---------------------------//
export const FetchUserLogService = (data, successCallback, errorCallBack) => _fetchService('userListDetails', 'POST', data, successCallback, errorCallBack);

export const FetchUserLogDetails = (data, successCallback, errorCallBack) => _fetchService('userLog', 'POST', data, successCallback, errorCallBack);

// ----- Dashboard API ------------------------------- //

export const DashboardSensorListDetails = (data, successCallback, errorCallBack) => _fetchService('lastUpdatedData', 'POST', data, successCallback, errorCallBack);

export const DashboardIndividualSensorDetails = (data, successCallback, errorCallBack) => _fetchService('sensorTagIdData', 'POST', data, successCallback, errorCallBack);

export const DeviceIdAlerts = (data, successCallback, errorCallBack) => _fetchService('alertData', 'POST', data, successCallback, errorCallBack);

export const SensorIdAlertUpdate = (data, successCallback, errorCallBack) => _fetchService('alertDataUpdate', 'POST', data, successCallback, errorCallBack);

//-------------- Reports API-------------------------------//

export const FetchBumpTestReportDetails = (data, successCallback, errorCallBack) => _fetchService('reportBumpTest', 'POST', data, successCallback, errorCallBack);

export const FetchAlarmReportDetails = (data, successCallback, errorCallBack) => _fetchService('alarmReport', 'POST', data, successCallback, errorCallBack);



