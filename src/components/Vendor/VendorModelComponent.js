import {
  Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import { VendorAddService, VendorEditService } from '../../services/LoginPageService';
import { AddVendorValidate } from '../../validatation/locationValidation';
import NotificationBar from '../notification/ServiceNotificationBar';

function VendorModel({
  open, setOpen, isAddButton, vendorData, setRefreshData,
}) {
  const [id, setId] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [address, setAddress] = useState('');
  const [contactPerson, setContactPerson] = useState('');

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const [errorObject, setErrorObject] = useState({});

  useEffect(() => {
    setOpen(open);
    loadData();
  }, [vendorData]);

  const loadData = () => {
    setId(vendorData.id || '');
    setVendorName(vendorData.vendorName || '');
    setPhoneNumber(vendorData.phone || '');
    setEmailId(vendorData.email || '');
    setAddress(vendorData.address || '');
    setContactPerson(vendorData.contactPerson || '');
  };

  const validateForNullValue = (value, type) => {
    AddVendorValidate(value, type, setErrorObject);
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
  };

  const handleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // -- API call -- //
    if (isAddButton) {
      await VendorAddService({
        vendorName, phoneNumber, emailId, address, contactPerson,
      }, handleSuccess, handleException);
    } else {
      await VendorEditService({
        id, vendorName, phoneNumber, emailId, address, contactPerson,
      }, handleSuccess, handleException);
    }
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
      fullWidth
      maxWidth="sm"
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '100%' } }}
      open={open}
    >

      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {isAddButton ? 'Add Vendor' : 'Edit Vendor'}
        </DialogTitle>

        <DialogContent>

          <TextField
            value={vendorName}
            margin="dense"
            id="outlined-basic"
            label="Vendor Name"
            variant="outlined"
            fullWidth
            required
            onBlur={() => validateForNullValue(vendorName, 'vendorName')}
            onChange={(e) => { setVendorName(e.target.value); }}
            autoComplete="off"
            error={errorObject?.vendorName?.errorStatus}
            helperText={errorObject?.vendorName?.helperText}

          />

          <TextField
            value={phoneNumber}
            margin="dense"
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            required
            onBlur={() => validateForNullValue(phoneNumber, 'phoneNumber')}
            onChange={(e) => { setPhoneNumber(e.target.value); }}
            autoComplete="off"
            fullWidth
            error={errorObject?.phoneNumber?.errorStatus}
            helperText={errorObject?.phoneNumber?.helperText}

          />

          <TextField
            value={emailId}
            margin="dense"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            required
            onBlur={() => validateForNullValue(emailId, 'emailId')}
            onChange={(e) => { setEmailId(e.target.value); }}
            autoComplete="off"
            error={errorObject?.emailId?.errorStatus}
            helperText={errorObject?.emailId?.helperText}
          />

          <TextField
            value={address}
            margin="dense"
            id="outlined-multiline-flexible"
            label="Address"
            multiline
            maxRows={4}
            fullWidth
            onBlur={() => validateForNullValue(address, 'address')}
            onChange={(e) => { setAddress(e.target.value); }}
            autoComplete="off"
            error={errorObject?.address?.errorStatus}
            helperText={errorObject?.address?.helperText}
          />

          <TextField
            value={contactPerson}
            margin="dense"
            id="outlined-basic"
            label="Contact Person"
            variant="outlined"
            fullWidth
            onBlur={() => validateForNullValue(contactPerson, 'contactPerson')}
            onChange={(e) => { setContactPerson(e.target.value); }}
            autoComplete="off"
            error={errorObject?.contactPerson?.errorStatus}
            helperText={errorObject?.contactPerson?.helperText}

          />
        </DialogContent>
        <DialogActions sx={{ margin: '10px' }}>

          <Button
            size="large"
            variant="outlined"
            autoFocus
            onClick={(e) => {
              setOpen(false);
              setErrorObject({});
              loadData();
            }}
          >
            Cancel
          </Button>

          <Button
            disabled={
              errorObject?.vendorName?.errorStatus
                     || errorObject?.companyCode?.errorStatus
                     || errorObject?.phoneNumber?.errorStatus
                     || errorObject?.emailId?.errorStatus
                     || errorObject?.address?.errorStatus
                     || errorObject?.contactPerson?.errorStatus
            }
            size="large"
            variant="contained"
            type="submit"
          >
            {' '}
            {isAddButton ? 'Add' : 'Update'}
          </Button>

        </DialogActions>
      </form>
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </Dialog>
  );
}

export default VendorModel;
