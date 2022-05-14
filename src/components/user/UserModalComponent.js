import {
  Autocomplete, Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, Switch, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  FetchBranchService, FetchFacilitiyService, FetchLocationService, UnblockUserService, UserAddService, UserUpdateService,
} from '../../services/LoginPageService';
import ApplicationStore from '../../utils/localStorageUtil';
import { AddUserValidate } from '../../validation/formValidation';
import NotificationBar from '../notification/ServiceNotificationBar';
import ConfirmPassword from './passwordConfirmComponent';

function UserModal({
  open, setOpen, isAddButton, userData, setRefreshData,
}) {
  const { userDetails } = ApplicationStore().getStorage('userDetails');
  const isSuperAdmin = userDetails ? userDetails.userRole === 'superAdmin' : true;

  const [id, setId] = useState('');
  const [empId, setEmployeeId] = useState('');
  const [email, setEmailId] = useState('');
  const [phoneNo, setPhone] = useState('');
  const [empRole, setRole] = useState(isSuperAdmin ? 'superAdmin' : 'User');
  const [empName, setFullName] = useState('');
  const [empNotification, setEmpNotification] = useState(true);
  const [companyCode, setCompanyCode] = useState('');
  const [location_id, setLocationId] = useState('');
  const [branch_id, setBranchId] = useState('');
  const [facility_id, setFacilityId] = useState('');

  const [locationList, setLocationList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [facilityList, setFacilityList] = useState([]);
  const [locationOpen, setLocationOpen] = useState('');
  const [branchOpen, setBranchOpen] = useState('');
  const [facilityOpen, setFacilityOpen] = useState('');

  const [password, setConfirmPassword] = useState('');
  const [btnReset, setBtnReset] = useState(false);
  const [errorObject, setErrorObject] = useState({});

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    if (userData) {
      setOpen(open);
      loaddata();
    }
  }, [userData]);

  const loaddata = () => {
    setId(userData?.id || '');
    setEmployeeId(userData?.employeeId || '');
    setEmailId(userData?.email || '');
    setPhone(userData?.mobileno || '');
    if (isSuperAdmin) {
      setRole(userData?.user_role || 'superAdmin');
    } else {
      setRole(userData?.user_role || 'User');
    }
    setEmpNotification(userData?.empNotification || true);
    setFullName(userData?.name || '');
    setCompanyCode(userData?.companyCode || '');
    setLocationId(userData.location_id || '');
    setBranchId(userData.branch_id || '');
    setFacilityId(userData.facility_id || '');
  };

  const validateForNullValue = (value, type) => {
    AddUserValidate(value, type, setErrorObject);
  };

  const handleSuccess = (resErrorObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: resErrorObject.message,
    });
    setRefreshData((oldvalue) => !oldvalue);
    setTimeout(() => {
      handleClose();
      setOpen(false);
      setErrorObject({});
    }, 3000);
  };

  const handleException = (resErrorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isAddButton) {
      await UserAddService({
        location_id, branch_id, facility_id, empId, email, phoneNo, empRole, empName, empNotification,
      }, handleSuccess, handleException);
    } else {
      await UserUpdateService({
        location_id, branch_id, facility_id, empId, email, phoneNo, empRole, empName, empNotification, id,
      }, handleSuccess, handleException);
    }
  };

  const passwordSubmit = async (e) => {
    e.preventDefault();
    UnblockUserService(
      { email, password, id },
      passwordValidationSuccess,
      passwordValidationException,
    );
    setBtnReset(false);
  };
  const passwordValidationSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setTimeout(() => {
      handleClose();
    }, 5000);
  };

  const passwordValidationException = (resErrorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
    setTimeout(() => {
      handleClose();
    }, 5000);
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  const locationHandleSuccess = (dataObject) => {
    setLocationList(dataObject.data);
  };

  const locationHandleException = () => {};

  const branchHandleSuccess = (dataObject) => {
    setBranchList(dataObject.data);
  };

  const branchHandleException = () => {};

  const facilityHandleSuccess = (dataObject) => {
    setFacilityList(dataObject.data);
  };

  const facilityHandleException = () => {};

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { minWidth: '80%' } }}
      maxWidth="sm"
      open={open}
    >
      <DialogTitle>
        {isAddButton ? 'Add User' : 'Edit User'}
      </DialogTitle>
      <DialogContent>
        <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md  -space-y-px">
            {isSuperAdmin ? ''
              : (
                <Grid container spacing={1} sx={{ mt: 0, mb: 2 }}>
                  <Grid
                    sx={{ mt: 0, padding: 0 }}
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    xl={4}
                  >
                    <div className="rounded-md -space-y-px">
                      <Autocomplete
                        id="asynchronous-demo"
                        sx={{}}
                        open={locationOpen}
                        onOpen={() => {
                          setLocationOpen(true);
                        }}
                        onClose={() => {
                          setLocationOpen(false);
                        }}
                        // isOptionEqualToValue={(option, value) => option.id === value.id}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => {
                          return option.stateName;
                        }}
                        options={locationList}
                        // loading={loading}
                        onChange={(e, data) => {
                          setLocationId(data.id);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Location Name"
                            onKeyUp={() => {
                              setTimeout(() => {
                                FetchLocationService(locationHandleSuccess, locationHandleException);
                              }, 500);
                            }}
                          />
                        )}
                      />
                    </div>
                  </Grid>
                  <Grid
                    sx={{ mt: 0, padding: 0 }}
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    xl={4}
                  >
                    <div className="rounded-md -space-y-px">
                      <Autocomplete
                        id="asynchronous-demo"
                        sx={{}}
                        open={branchOpen}
                        onOpen={() => {
                          setBranchOpen(true);
                        }}
                        onClose={() => {
                          setBranchOpen(false);
                        }}
                        // isOptionEqualToValue={(option, value) => option.id === value.id}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => {
                          return option.branchName;
                        }}
                        options={branchList}
                        // loading={loading}
                        onChange={(e, data) => {
                          setBranchId(data.id);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Branch Name"
                            onKeyUp={() => {
                              setTimeout(() => {
                                FetchBranchService({ location_id }, branchHandleSuccess, branchHandleException);
                              }, 500);
                            }}
                          />
                        )}
                      />
                    </div>
                  </Grid>
                  <Grid
                    sx={{ mt: 0, padding: 0 }}
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    xl={4}
                  >
                    <div className="rounded-md -space-y-px">
                      <Autocomplete
                        id="asynchronous-demo"
                        sx={{}}
                        open={facilityOpen}
                        onOpen={() => {
                          setFacilityOpen(true);
                        }}
                        onClose={() => {
                          setFacilityOpen(false);
                        }}
                        // isOptionEqualToValue={(option, value) => option.id === value.id}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => {
                          return option.facilityName;
                        }}
                        options={facilityList}
                        // loading={loading}
                        onChange={(e, data) => {
                          setFacilityId(data.id);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Facility Name"
                            onKeyUp={() => {
                              setTimeout(() => {
                                FetchFacilitiyService(
                                  { location_id, branch_id },
                                  facilityHandleSuccess,
                                  facilityHandleException,
                                );
                              }, 500);
                            }}
                          />
                        )}
                      />
                    </div>
                  </Grid>
                </Grid>
              ) }
            <div className="rounded-md -space-y-px mb-2">
              <TextField
                sx={{ mb: 2 }}
                label="Employee Id"
                type="text"
                value={empId}
                variant="outlined"
                placeholder="Employee Id"
                className="mb-2 appearance-none rounded-none
                relative block w-full px-3 py-2 border border-gray-300
                placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none
                focus:ring-red-500 focus:border-red-500  sm:text-sm"
                required
                onBlur={() => validateForNullValue(empId, 'employeeId')}
                onChange={(e) => { setEmployeeId(e.target.value); }}
                autoComplete="off"
                error={errorObject?.employeeId?.errorStatus}
                helperText={errorObject?.employeeId?.helperText}
              />
            </div>
            <div className="rounded-md -space-y-px">
              <div className="mb-2">
                <TextField
                  sx={{ mb: 2 }}
                  label="Email Id"
                  type="email"
                  value={email}
                  variant="outlined"
                  placeholder="Email Id"
                  className="mb-2 appearance-none rounded-none relative
                  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                  text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500
                  focus:border-red-500  sm:text-sm"
                  required
                  onBlur={() => { validateForNullValue(email, 'email'); }}
                  onChange={(e) => { setEmailId(e.target.value); }}
                  autoComplete="off"
                  error={errorObject?.emailId?.errorStatus}
                  helperText={errorObject?.emailId?.helperText}
                />
              </div>
            </div>
            <div className="rounded-md -space-y-px">
              <div className="mb-2">
                <TextField
                  sx={{ mb: 2 }}
                  label="Phone"
                  type="number"
                  value={phoneNo}
                  variant="outlined"
                  placeholder="Phone number"
                  className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2
                  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                  required
                  onBlur={() => validateForNullValue(phoneNo, 'phone')}
                  onChange={(e) => { setPhone(e.target.value); }}
                  autoComplete="off"
                  error={errorObject?.phone?.errorStatus}
                  helperText={errorObject?.phone?.helperText}
                />
              </div>
            </div>
            <div className="rounded-md -space-y-px">
              <div className="mb-2">
                <TextField
                  sx={{ mb: 2 }}
                  label="Full Name"
                  type="text"
                  value={empName}
                  variant="outlined"
                  placeholder="Full Name"
                  className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2
                  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                  required
                  onBlur={() => validateForNullValue(empName, 'fullName')}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="off"
                  error={errorObject?.fullName?.errorStatus}
                  helperText={errorObject?.fullName?.helperText}
                />
              </div>
            </div>
            <div className="rounded-md -space-y-px">
              <div className="mb-2">
                <FormControl sx={{ mb: 2 }} fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  {isSuperAdmin
                    ? (
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={empRole}
                        label="Role"
                        onChange={(e) => {
                          setRole(e.target.value);
                        }}
                        disabled
                      >
                        <MenuItem value="superAdmin">Super Admin</MenuItem>
                      </Select>
                    )
                    : (
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={empRole}
                        label="Role"
                        onChange={(e) => {
                          setRole(e.target.value);
                        }}
                      >
                        <MenuItem value="User">User</MenuItem>
                        <MenuItem value="Manager">Manager</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                      </Select>
                    )}
                </FormControl>
              </div>
            </div>
            <div className="">
              <div className="">
              <FormGroup sx={{display : 'block'}}>
                <FormControlLabel control={<Switch checked={empNotification !=0} onChange={(e)=>{
                  setEmpNotification(e.target.checked);
                }} color="warning"/>} label="Enable Notification" />
              </FormGroup>
              </div>
            </div>
            <div className="rounded-md -space-y-px float-right">
              {isAddButton ? ''
                : (
                  <Button
                    onClick={() => {
                      setBtnReset(true);
                    }}
                  >
                    Reset Password
                  </Button>
                )}
              <Button
                type="submit"
                disabled={
                  errorObject?.employeeId?.errorStatus
                  || errorObject?.emailId?.errorStatus
                  || errorObject?.phone?.errorStatus
                  || errorObject?.role?.errorStatus
                  || errorObject?.fullName?.errorStatus
                }
              >
                {isAddButton ? 'Add' : 'Update'}
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  setErrorObject({});
                  loaddata();
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
      <ConfirmPassword
        open={btnReset}
        passwordSubmit={passwordSubmit}
        setConfirmPassword={setConfirmPassword}
        setBtnReset={setBtnReset}
      />
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </Dialog>
  );
}

export default UserModal;
