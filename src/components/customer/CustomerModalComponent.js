import {
  Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CustomerAddService, CustomerEditService, UnblockUserService } from '../../services/LoginPageService';
import { AddCustomerValidate } from '../../validation/formValidation';
import NotificationBar from '../notification/ServiceNotificationBar';
import previewImage from '../../images/chooseFile.png';

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
  const [customerTheme, setCustomerTheme] = useState('#000000');
  const [previewBuilding, setPreviewBuilding] = useState('');
  const [password, setConfirmPassword] = useState('');
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
    setCustomerTheme(customerData.customerTheme || '#000000');
    setPreviewBuilding(customerData.customerLogo ? `http://varmatrix.com/Aqms/blog/public/${customerData.customerLogo}` : previewImage);
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

  const handleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
    setTimeout(() => {
      handleClose();
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAddButton) {
      await CustomerAddService({
        customerName, email, phoneNo, address, customerId, customerLogo, customerTheme,
      }, handleSuccess, handleException);
    } else {
      await CustomerEditService({
        id, customerName, email, phoneNo, address, customerId, customerLogo, customerTheme,
      }, handleSuccess, handleException);
    }
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

  const passwordValidationException = (errorObject, errorMessage) => {
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
      sx={{ '& .MuiDialog-paper': { minWidth: '80%' } }}
      maxWidth="sm"
      open={open}
    >
      <DialogTitle>
        {isAddButton ? 'Add Customer' : 'Edit Customer'}
      </DialogTitle>

      <DialogContent>
        <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md  -space-y-px ">
            <div className="rounded-md -space-y-px mb-2">
              <TextField
                sx={{ mb: 1 }}
                label="Customer Name"
                type="text"
                value={customerName}
                variant="outlined"
                placeholder="Employee Id"
                className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                required
                onBlur={() => validateForNullValue(customerName, 'fullName')}
                onChange={(e) => { setCustomerName(e.target.value); }}
                autoComplete="off"
                error={errorObject?.fullName?.errorStatus}
                helperText={errorObject?.fullName?.helperText}
              />
            </div>
            <div className="rounded-md -space-y-px">
              <div className="mb-2">
                <TextField
                  sx={{ mb: 1 }}
                  label="Email Id"
                  type="email"
                  value={email}
                  variant="outlined"
                  placeholder="Email Id"
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
            <div className="rounded-md -space-y-px">
              <div className="mb-2">
                <TextField
                  sx={{ mb: 1 }}
                  label="Phone number"
                  type="number"
                  value={phoneNo}
                  variant="outlined"
                  placeholder="Phone number"
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
            <div className="rounded-md -space-y-px">
              <div className="mb-2">
                <TextField
                  sx={{ mb: 1 }}
                  label="Address"
                  type="text"
                  value={address}
                  variant="outlined"
                  placeholder="Full Name"
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
            <div className="rounded-md -space-y-px">
              <div className="mb-2">
                <TextField
                  sx={{ mb: 1 }}
                  label="Customer Id"
                  type="text"
                  value={customerId}
                  variant="outlined"
                  placeholder="Full Name"
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
                          // setCustomerLogo(e.target.files[0]);
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
                    <div className="rounded-md -space-y-px mb-2" style={{ border: '2px black solid' }}>
                      <img src={previewBuilding || previewImage} style={{ width: '-webkit-fill-available', height: `${50}%` }} />
                    </div>
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-2 lg:col-span-2">
                  <div className="mb-2 block">
                    <TextField
                      inputProps={{
                      }}
                      sx={{ mb: 1 }}
                      fullWidth
                      label="Theme Color"
                      type="color"
                      value={customerTheme}
                      required
                      onBlur={() => validateForNullValue(customerTheme, 'customerTheme')}
                      onChange={(e) => setCustomerTheme(e.target.value)}
                      error={errorObject?.customerTheme?.errorStatus}
                      helperText={errorObject?.customerTheme?.helperText}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* ------ */}
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
                ) }
              <Button
                type="submit"
                disabled={errorObject?.fullName?.errorStatus || errorObject?.emailID?.errorStatus || errorObject?.phone?.errorStatus || errorObject?.address?.errorStatus || errorObject?.customerID?.errorStatus || errorObject?.customerTheme?.errorStatus || errorObject?.customerLogo?.errorStatus}
              >
                {isAddButton ? 'Add' : 'Update'}
              </Button>
              <Button
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
