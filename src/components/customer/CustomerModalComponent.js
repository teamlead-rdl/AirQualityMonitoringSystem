import {
  Button, Box, Dialog, DialogContent, DialogTitle, TextField, Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CustomerAddService, CustomerEditService, UnblockUserService } from '../../services/LoginPageService';
import { AddCustomerValidate } from '../../validation/formValidation';
import NotificationBar from '../notification/ServiceNotificationBar';
import previewImage from '../../images/previewImageSmall.png';

function CustomerModal({
  open, setOpen, isAddButton, customerData, setRefreshData,
}) {
  const [id, setId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [customerId, setCustomerID] = useState('');
  const [customerLogo, setCustomerLogo] = useState('');
  const [previewBuilding, setPreviewBuilding] = useState('');
  const [password, setConfirmPassword] = useState('');
  const [alertLogInterval, setAlertLogInterval] = useState('');
  const [deviceLogInterval, setDeviceLogInterval] = useState('');
  const [sensorLogInterval, setSensorLogInterval] = useState('');
  const [btnReset, setBtnReset] = useState(false);
  const [errorObject, setErrorObject] = useState({});
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    setOpen(open);
    loadData();
  }, [customerData]);

  const loadData = () => {
    setId(customerData.id || '');
    setCustomerName(customerData.customerName || '');
    setEmail(customerData.email || '');
    setPhone(customerData.phoneNo || '');
    setAddress(customerData.address || '');
    setCustomerID(customerData.customerId || '');
    setAlertLogInterval(customerData.alertLogInterval || '');
    setDeviceLogInterval(customerData.setDeviceLogInterval || '');
    setSensorLogInterval(customerData.setSensorLogInterval || '');
    setPreviewBuilding(customerData.customerLogo ? `http://varmatrix.com/Aqms/blog/public/${customerData.customerLogo}` : previewImage);

    setCustomerLogo('');
  };
  const validateForNullValue = (value, type) => {
    AddCustomerValidate(value, type, setErrorObject);
  };

  const handleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setRefreshData((oldvalue) => !oldvalue);
    setTimeout(() => {
      handleClose();
      setOpen(false);
    }, 5000);
    return dataObject;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAddButton) {
      CustomerAddService({
        customerName, email, phoneNo, address, customerId, customerLogo, alertLogInterval, deviceLogInterval, sensorLogInterval,
      }, handleSuccess, handleException);
    } else {
      CustomerEditService({
        id, customerName, email, phoneNo, address, customerId, customerLogo, alertLogInterval, deviceLogInterval, sensorLogInterval,
      }, handleSuccess, handleException);
    }
  };

  const handleException = (errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
    setTimeout(() => {
      handleClose();
    }, 5000);
  };

  const passwordSubmit = async (e) => {
    e.preventDefault();
    UnblockUserService({ email, password, id }, passwordValidationSuccess, passwordValidationException);
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

  const passwordValidationException = (errorMessage) => {
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

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '100%' } }}
      maxWidth="sm"
      open={open}
    >
      <DialogTitle>
        {isAddButton ? 'Add Customer' : 'Edit Customer'}
      </DialogTitle>

      <DialogContent>
        <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md  -space-y-px ">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div className="rounded-md -space-y-px mb-2">
                  <TextField
                    sx={{ mb: 1 }}
                    label="Customer Name"
                    type="text"
                    value={customerName}
                    variant="outlined"
                    placeholder="Customer Name"
                    /* eslint-disable-next-line */
                    className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                    required
                    onBlur={() => validateForNullValue(customerName, 'fullName')}
                    onChange={(e) => { setCustomerName(e.target.value); }}
                    autoComplete="off"
                    error={errorObject?.fullName?.errorStatus}
                    helperText={errorObject?.fullName?.helperText}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="rounded-md -space-y-px">
                  <div className="mb-2">
                    <TextField
                      sx={{ mb: 1 }}
                      label="Email Id"
                      type="email"
                      value={email}
                      variant="outlined"
                      placeholder="Email Id"
                      /* eslint-disable-next-line */
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                      required
                      onBlur={() => { validateForNullValue(email, 'email'); }}
                      onChange={(e) => { setEmail(e.target.value); }}
                      autoComplete="off"
                      error={errorObject?.emailID?.errorStatus}
                      helperText={errorObject?.emailID?.helperText}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="rounded-md -space-y-px">
                  <div className="mb-2">
                    <TextField
                      sx={{ mb: 1 }}
                      label="Phone number"
                      type="number"
                      value={phoneNo}
                      variant="outlined"
                      placeholder="Phone number"
                      /* eslint-disable-next-line */
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                      required
                      onBlur={() => validateForNullValue(phoneNo, 'phone')}
                      onChange={(e) => { setPhone(e.target.value); }}
                      autoComplete="off"
                      error={errorObject?.phone?.errorStatus}
                      helperText={errorObject?.phone?.helperText}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="rounded-md -space-y-px">
                  <div className="mb-2">
                    <TextField
                      sx={{ mb: 1 }}
                      label="Address"
                      type="text"
                      value={address}
                      variant="outlined"
                      placeholder="Address"
                      /* eslint-disable-next-line */
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                      required
                      onBlur={() => validateForNullValue(address, 'address')}
                      onChange={(e) => setAddress(e.target.value)}
                      autoComplete="off"
                      error={errorObject?.address?.errorStatus}
                      helperText={errorObject?.address?.helperText}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="rounded-md -space-y-px">
                  <div className="mb-2">
                    <TextField
                      sx={{ mb: 1 }}
                      label="Customer Id"
                      type="text"
                      value={customerId}
                      variant="outlined"
                      placeholder="Customer Id"
                      /* eslint-disable-next-line */
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                      required
                      onBlur={() => validateForNullValue(customerId, 'customerID')}
                      onChange={(e) => setCustomerID(e.target.value)}
                      autoComplete="off"
                      error={errorObject?.customerID?.errorStatus}
                      helperText={errorObject?.customerID?.helperText}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="rounded-md -space-y-px">
                  <div className="mb-2">
                    <TextField
                      sx={{ mb: 1 }}
                      label="Alert Log Interval"
                      type="number"
                      value={alertLogInterval}
                      variant="outlined"
                      placeholder="Alert Log Interval"
                      /* eslint-disable-next-line */
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                      required
                      onBlur={() => validateForNullValue(alertLogInterval, 'alertLogInterval')}
                      onChange={(e) => setAlertLogInterval(e.target.value)}
                      autoComplete="off"
                      error={errorObject?.alertLogInterval?.errorStatus}
                      helperText={errorObject?.alertLogInterval?.helperText}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="rounded-md -space-y-px">
                  <div className="mb-2">
                    <TextField
                      sx={{ mb: 1 }}
                      label="Device Log Interval"
                      type="number"
                      value={deviceLogInterval}
                      variant="outlined"
                      placeholder="Device Log Interval"
                      /* eslint-disable-next-line */
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                      required
                      onBlur={() => validateForNullValue(deviceLogInterval, 'deviceLogInterval')}
                      onChange={(e) => setDeviceLogInterval(e.target.value)}
                      autoComplete="off"
                      error={errorObject?.deviceLogInterval?.errorStatus}
                      helperText={errorObject?.deviceLogInterval?.helperText}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="rounded-md -space-y-px">
                  <div className="mb-2">
                    <TextField
                      sx={{ mb: 1 }}
                      label="Sensor Log Interval"
                      type="number"
                      value={sensorLogInterval}
                      variant="outlined"
                      placeholder="Device Log Interval"
                      /* eslint-disable-next-line */
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                      required
                      onBlur={() => validateForNullValue(sensorLogInterval, 'sensorLogInterval')}
                      onChange={(e) => setSensorLogInterval(e.target.value)}
                      autoComplete="off"
                      error={errorObject?.sensorLogInterval?.errorStatus}
                      helperText={errorObject?.sensorLogInterval?.helperText}
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
            <div className="py-5 bg-white">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-8 lg:col-span-8">
                  <div className="mb-2 block">
                    <TextField
                      fullWidth
                      label="Company Logo"
                      onBlur={() => {
                        validateForNullValue(customerLogo, 'customerLogo');
                      }}
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (reader.readyState === 2) {
                              setCustomerLogo(reader.result);
                              setPreviewBuilding(reader.result);
                            }
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                      InputLabelProps={{ shrink: true }}
                      type="file"
                      inputProps={{
                        accept: 'image/png',
                      }}
                      error={errorObject?.customerLogo?.errorStatus}
                      helperText={errorObject?.customerLogo?.helperText}
                    />
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-2 lg:col-span-2">
                  <div className="mb-2 block">
                    <Box
                      component="img"
                      sx={{
                        height: 100,
                        width: 250,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 150, md: 150 },
                      }}
                      alt="The Customer Buidling Image"
                      src={previewBuilding || previewImage}
                    />

                  </div>
                </div>
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
                /* eslint-disable-next-line */
                // disabled={errorObject?.fullName?.errorStatus || errorObject?.emailID?.errorStatus || errorObject?.phone?.errorStatus || errorObject?.address?.errorStatus || errorObject?.customerID?.errorStatus || errorObject?.customerTheme?.errorStatus || errorObject?.customerLogo?.errorStatus}
              >
                {isAddButton ? 'Add' : 'Update'}
              </Button>
              <Button
              /* eslint-disable-next-line */
                onClick={(e) => {
                  setOpen(false);
                  setErrorObject({});
                  loadData();
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
      <Dialog
        maxWidth="sm"
        open={btnReset}
      >
        <DialogTitle>
          Confirm your password
        </DialogTitle>
        <DialogContent>
          <form onSubmit={passwordSubmit}>
            <div className="col-span-6 sm:col-span-2 lg:col-span-2 ">
              <div className="inline">
                <TextField
                  placeholder="Enter your password"
                  type="password"
                  required
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mt-3 ml-2 float-right">
              <Button
                onClick={() => {
                  setBtnReset(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </Dialog>
  );
}

export default CustomerModal;
