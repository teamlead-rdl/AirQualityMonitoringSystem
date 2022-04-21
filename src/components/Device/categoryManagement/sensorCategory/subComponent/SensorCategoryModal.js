import {
  Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import { AddCategoryValidate } from '../../../../../validatation/formValidation';
import {
  CategoryAddService, CategoryEditService, SensorCategoryAddService, SensorCategoryEditService,
} from '../../../../../services/LoginPageService';
import NotificationBar from '../../../../notification/ServiceNotificationBar';

function SensorCategoryModal({
  open, setOpen, isAddButton, categoryData, setRefreshData,
}) {
  const [id, setId] = useState('');
  const [sensorName, setCategoryName] = useState('');
  const [sensorDescriptions, setCategoryDescription] = useState('');
  const [errorObject, setErrorObject] = useState({});

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });
  useEffect(() => {
    setOpen(open);
    loadData();
  }, [categoryData]);

  const loadData = () => {
    setId(categoryData.id || '');
    setCategoryName(categoryData.sensorName || '');
    setCategoryDescription(categoryData.sensorDescriptions || '');
  };

  const validateForNullValue = (value, type) => {
    AddCategoryValidate(value, type, setErrorObject);
  };

  const handleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setRefreshData((oldvalue) => !oldvalue);
    setTimeout(() => {
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
    if (isAddButton) {
      await SensorCategoryAddService({ sensorName, sensorDescriptions }, handleSuccess, handleException);
    } else {
      await SensorCategoryEditService({ id, sensorName, sensorDescriptions }, handleSuccess, handleException);
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
          {isAddButton ? 'Add Catagory' : 'Edit Category'}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="outlined-required"
            label="Category Name"
            defaultValue=""
            fullWidth
            value={sensorName}
            required
            onBlur={() => validateForNullValue(sensorName, 'categoryName')}
            onChange={(e) => { setCategoryName(e.target.value); }}
            autoComplete="off"
            error={errorObject?.categoryName?.errorStatus}
            helperText={errorObject?.categoryName?.helperText}
          />
          <TextField
            id="dense"
            label="Category Descriptions"
            multiline
            margin="dense"
            maxRows={4}
            fullWidth
            value={sensorDescriptions}
            required
            onBlur={() => validateForNullValue(sensorDescriptions, 'categoryDescription')}
            onChange={(e) => { setCategoryDescription(e.target.value); }}
            autoComplete="off"
            error={errorObject?.categoryDescription?.errorStatus}
            helperText={errorObject?.categoryDescription?.helperText}
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
            disabled={errorObject?.categoryName?.errorStatus || errorObject?.categoryDescription?.errorStatus}
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

export default SensorCategoryModal;
