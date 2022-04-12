/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Button,
  DialogContent,
  IconButton,
  InputAdornment,
  InputLabel, Select,
  Typography,
  FormControl,
  TextField,
  MenuItem,
  Grid,

} from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { Box } from '@mui/system';

import { CategoryFetchService, DeviceAddService } from '../../services/LoginPageService';
import DeviceLocationModal from './deviceLocation/DeviceLocationModalComponent';
import NotificationBar from '../notification/ServiceNotificationBar';
import { AddCategoryValidate } from '../../validatation/formValidation';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const DeviceAdd = ({ locationDetails, labMap, deviceData }) => {
  const [id, setId] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [deviceCategory, setDeviceCategory] = useState('');
  const [deviceImage, setDeviceImage] = useState({});
  const [deviceTag, setDeviceTag] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [firmwareVersion, setFirmwareVersion] = useState('');
  const [pollingPriority, setPollingPriority] = useState('');
  const [nonPollingPriority, setNonPollingPriority] = useState('');
  const [floorCords, setFloorCords] = useState('');
  const [category_id, setCategory_id] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [errorObject, setErrorObject] = useState({});
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: ''
  });

  const validateForNullValue = (value, type) => {
    AddCategoryValidate(value, type, setErrorObject);
  };

  const handleSuccess = (dataObject) => {
    // console.log(JSON.stringify(dataObject));
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message
    });

    setTimeout(() => {
      handleClose();
      resetForm();
    }, 5000);
  };

  const handleException = (errorObject, errorMessage) => {
    console.log(JSON.stringify(errorObject));
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage
    });
    
    
  };

  useEffect(() => {
    loadCategory();
  }, [deviceData]);

  const categoryHandleSuccess = (dataObject) => {
    setCategoryList(dataObject.data);
  };

  const loadCategory = () => {
    CategoryFetchService(categoryHandleSuccess, handleException);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await DeviceAddService({
      deviceName,
      category_id,
      deviceImage,
      deviceTag,
      firmwareVersion,
      macAddress,
      pollingPriority,
      nonPollingPriority,
      floorCords,
      ...locationDetails
    }, handleSuccess, handleException);
  };

  const resetForm = () => {
    setFirmwareVersion('');
    setPollingPriority('');
    setNonPollingPriority('');
    setDeviceName('');
    setMacAddress('');
    setDeviceTag('');
    setDeviceImage({});
    setFloorCords('');
    setCategory_id('');
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: ''
    });
  };
  return (
    <>
      <form className="p-0 w-full" onSubmit={handleSubmit}>
        <DialogContent sx={{ px: 0, p: 0 }}>
          <Grid container 
            spacing={1}
          >
            <Grid sx={{ mt:1 }}
              item
              xs={12} sm={6} md={6} lg={6} xl={6} >
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth margin="normal" sx={{marginTop:0}}>
                  <InputLabel id="demo-simple-select-label">
                    Device Category
                  </InputLabel>
                  <Select
                    sx={{ minWidth: 250 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category_id}
                    required
                    label="Device Category"
                    onChange={(e) => {
                      setCategory_id(e.target.value);
                    }}
                    error={errorObject?.deviceCategory?.errorStatus}
                    helperText={errorObject?.deviceCategory?.helperText}
                  >
                    {categoryList.map((data, index) => {
                      return (
                        <MenuItem key={'category'+index} value={data.id}>{data.categoryName}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid sx={{ mt: 1, padding: 0 }}
              item
              xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                sx={{marginTop:0}}
                value={deviceName}
                onBlur={() => validateForNullValue(deviceName, 'deviceName')}
                onChange={(e) => {
                  setDeviceName(e.target.value);
                }}
                margin="normal"
                required
                id="outlined-required"
                label="Name of the device"
                fullWidth
                error={errorObject?.deviceName?.errorStatus}
                helperText={errorObject?.deviceName?.helperText}
                autoComplete="off"
              />
            </Grid>
            <Grid sx={{ mt: 0, padding: 0 }}
              item
              xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                sx={{marginTop:0}}
                value={deviceTag}
                onBlur={() => validateForNullValue(deviceTag, 'deviceTag')}
                onChange={(e) => {
                  setDeviceTag(e.target.value);
                }}
                margin="normal"
                autoComplete="off"
                required
                id="outlined-required"
                label="Device Tag"
                fullWidth
                error={errorObject?.deviceTag?.errorStatus}
                helperText={errorObject?.deviceTag?.helperText}
              />
            </Grid>
            <Grid sx={{ mt: 0, padding: 0 }}
              item
              xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                sx={{marginTop:0}}
                value={macAddress}
                onBlur={() => validateForNullValue(macAddress, 'macAddress')}
                onChange={(e) => {
                  setMacAddress(e.target.value);
                }}
                margin="normal"
                required
                id="outlined-required"
                label="Mac Address"
                autoComplete="off"
                fullWidth
                error={errorObject?.macAddress?.errorStatus}
                helperText={errorObject?.macAddress?.helperText}
              />
            </Grid>
            <Grid sx={{ mt: 0, padding: 0 }}
              item
              xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                sx={{marginTop:0}}
                value={firmwareVersion}
                onBlur={() => validateForNullValue(firmwareVersion, 'firmwareVersion')}
                onChange={(e) => {
                  setFirmwareVersion(e.target.value);
                }}
                margin="normal"
                required
                id="outlined-required"
                label="Firmware version"
                autoComplete="off"
                fullWidth
                error={errorObject?.firmwareVersion?.errorStatus}
                helperText={errorObject?.firmwareVersion?.helperText}
              />
            </Grid>
            <Grid sx={{ mt: 0, padding: 0 }}
              item
              xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                sx={{marginTop:0}}
                margin="normal"
                fullWidth
                label="Photo of Device"
                autoComplete='off'
                required
                onBlur={() => { validateForNullValue(deviceImage, 'deviceImage'); }}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setDeviceImage(e.target.files[0]);

                    const reader = new FileReader();
                    reader.onload = () => {
                      if (reader.readyState === 2) {
                        setDeviceImage(reader.result);
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
                error={errorObject?.deviceImage?.errorStatus}
                helperText={errorObject?.deviceImage?.helperText}
              />
            </Grid>
            <Grid sx={{ mt: 0, padding: 0 }}
              item
              xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                sx={{marginTop:0}}
                value={pollingPriority}
                type='time'
                onBlur={() => validateForNullValue(pollingPriority, 'pollingPriority')}
                onChange={(e) => {
                  setPollingPriority(e.target.value);
                }}
                InputLabelProps={{
                  shrink:true
                }}
                margin="normal"
                required
                id="outlined-required"
                label="Polling Priority Value"
                autoComplete="off"
                fullWidth
                error={errorObject?.pollingPriority?.errorStatus}
                helperText={errorObject?.pollingPriority?.helperText}
              />
            </Grid>
            <Grid sx={{ mt: 0, padding: 0 }}
              item
              xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                sx={{marginTop:0}}
                value={nonPollingPriority}
                type='time'
                onBlur={() => validateForNullValue(nonPollingPriority, 'nonPollingPriority')}
                onChange={(e) => {
                  setNonPollingPriority(e.target.value);
                }}
                InputLabelProps={{
                  shrink:true
                }}
                margin="normal"
                required
                id="outlined-required"
                label="Polling Non-Priority Value"
                autoComplete="off"
                fullWidth
                error={errorObject?.nonPollingPriority?.errorStatus}
                helperText={errorObject?.nonPollingPriority?.helperText}
              />
            </Grid>
            <Grid container justify="flex-end">
              <div className="float-right">
                
              </div>
            </Grid>
          </Grid>
          <Grid sx={{ mt: 0, padding: 0 }}
            item
            xs={12} sm={12} md={12} lg={12} xl={12}
            style={{textAlignLast: 'right'}}
          >
            <div >
              <Button
                sx={{ m: 2}}
                onClick={(e) => {
                  setOpenModel(true);
                }}
              >
                Locate Device
              </Button>
            </div>
          </Grid>
          <Grid sx={{ mt: 0, padding: 0 }}
            item
            xs={12} sm={12} md={12} lg={12} xl={12}
          >
            <div className="mt-0 ml-2 float-right">
              <Button
                sx={{ m: 2}}
                onClick={(e) => {
                  setErrorObject({});
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={
                  errorObject?.deviceCategory?.errorStatus ||
                  errorObject?.deviceName?.errorStatus ||
                  errorObject?.deviceTag?.errorStatus ||
                  errorObject?.macAddress?.errorStatus ||
                  errorObject?.firmwareVersion?.errorStatus||
                  errorObject?.pollingPriority?.errorStatus ||
                  errorObject?.nonPollingPriority?.errorStatus 
                }
                sx={{ m: 2 }}
                size="large"
                variant="contained"
                type="submit"
              >
                ADD
              </Button>
            </div>
          </Grid>
        </DialogContent>

      </form>
      <DeviceLocationModal
        // isAddButton={isAddButton}
        // locationData={editState}
        // categoryList={categoryList}
        open={openModel}
        setOpen={setOpenModel}
        src={labMap}
        floorCords={floorCords}
        setFloorCords={setFloorCords}
      />
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type} 
      />
    </>
  );
};

export default DeviceAdd;