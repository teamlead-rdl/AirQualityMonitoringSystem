import {
  Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField,
  Autocomplete,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { AddVendorValidate } from '../../../../validation/locationValidation';
import {
  ConfigSetupFetchService, DeviceConfigSetupAddService, DeviceConfigSetupFetchService,
} from '../../../../services/LoginPageService';
import NotificationBar from '../../../notification/ServiceNotificationBar';

function DeviceConfigSetupModal({
  open, setOpen, isAddButton, deviceData,
}) {
  const [device_id, setDevice_id] = useState('');
  // AccessPoint inputs
  const [accessPointName, setAccessPointName] = useState('');
  const [ssId, setSsId] = useState('');
  const [accessPointPassword, setAccessPointPassword] = useState('');

  // FTP inputs
  const [ftpAccountName, setFtpAccountName] = useState('');
  const [userName, setUserName] = useState('');
  const [ftpPassword, setFtpPassword] = useState('');
  const [port, setPort] = useState('');
  const [serverUrl, setServerUrl] = useState('');
  const [folderPath, setFolderPath] = useState('');

  // Serviceprovider inputs
  const [serviceProvider, setServiceProvider] = useState('');
  const [apn, setApn] = useState('');

  const [configSetupList, setConfigSetupList] = useState([]);
  const [accessType, setAccessType] = useState('');
  /* eslint-disable-next-line */
  const [errorObject, setErrorObject] = useState({});

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    setOpen(open);
    loadData();
  }, [deviceData]);

  const loadData = () => {
    setDevice_id(deviceData.id);
    // setAccessPointName(deviceData.accessPointName);
    fetchService(deviceData.id);
  };

  const fetchService = (id) => {
    ConfigSetupFetchService(configSetupHandleSuccess, configSetupHandleException);
    DeviceConfigSetupFetchService({ id }, handleDeviceConfigSetupFetchSuccess, handleDeviceConfigSetupFetchException);
  };

  const handleDeviceConfigSetupFetchSuccess = (dataObject) => {
    if (dataObject.data.length === 0) {
      setAccessPointName('');
      setSsId('');
      setAccessPointPassword('');
      setFtpAccountName('');
      setUserName('');
      setFtpPassword('');
      setPort('');
      setServerUrl('');
      setFolderPath('');
      setServiceProvider('');
      setApn('');
    } else {
      setAccessPointName(dataObject.data[0].accessPointName || '');
      setSsId(dataObject.data[0].ssId || '');
      setAccessPointPassword(dataObject.data[0].accessPointPassword || '');
      setFtpAccountName(dataObject.data[0].ftpAccountName || '');
      setUserName(dataObject.data[0].userName || '');
      setFtpPassword(dataObject.data[0].ftpPassword || '');
      setPort(dataObject.data[0].port || '');
      setServerUrl(dataObject.data[0].serverUrl || '');
      setFolderPath(dataObject.data[0].folderPath || '');
      setServiceProvider(dataObject.data[0].serviceProvider || '');
      setApn(dataObject.data[0].apn || '');
    }
  };
  const handleDeviceConfigSetupFetchException = () => {
  };
  /* eslint-disable-next-line */
  const validateForNullValue = (value, type) => {
    AddVendorValidate(value, type, setErrorObject);
  };

  const configSetupHandleSuccess = (dataObject) => {
    setConfigSetupList(dataObject.data);
  };

  const configSetupHandleException = () => {
  };

  const handleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setTimeout(() => {
      handleClose();
      setOpen(false);
    }, 5000);
  };

  const Reset = (data) => {
    if (data === 'Custom') {
      setAccessPointName('');
      setSsId('');
      setAccessPointPassword('');
      setFtpAccountName('');
      setUserName('');
      setFtpPassword('');
      setPort('');
      setServerUrl('');
      setFolderPath('');
      setServiceProvider('');
      setApn('');
    }
  };

  const handleException = () => {
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    DeviceConfigSetupAddService({
      device_id,
      accessPointName,
      ssId,
      accessPointPassword,
      ftpAccountName,
      userName,
      ftpPassword,
      port,
      serverUrl,
      folderPath,
      serviceProvider,
      apn,
    }, handleSuccess, handleException);
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
      maxWidth="md"
      sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: '100%' } }}
      open={open}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {isAddButton ? 'Add ConfigSetup' : 'Edit ConfigSetup'}
        </DialogTitle>

        <DialogContent>
          <div className="flex items-center justify-between gap-3">
            <Grid container spacing={1} sx={{ mt: 0 }}>
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={4}
              >
                <FormControl fullWidth sx={{ mt: 1, padding: 0 }}>
                  <InputLabel id="demo-simple-select-label">Access Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={accessType}
                    label="Access Type"
                    onChange={(e) => {
                      setAccessType(e.target.value);
                      Reset(e.target.value);
                    }}
                  >
                    <MenuItem value="accessPoint">Access Point</MenuItem>
                    <MenuItem value="FTP">FTP</MenuItem>
                    <MenuItem value="serviceProvider">Service Provider</MenuItem>
                    <MenuItem value="Custom">Custom</MenuItem>

                  </Select>
                </FormControl>
              </Grid>
              <Grid
                sx={{ mt: 1, padding: 0 }}
                item
                xs={12}
                sm={6}
                md={8}
                lg={8}
                xl={8}
              >
                <Autocomplete
                  id="asynchronous-demo"
                  sx={{}}
                  value={null}
                  disabled={accessType === 'Custom'}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  /* eslint-disable-next-line */
                  getOptionLabel={(option) => {
                    if (accessType === 'accessPoint') {
                      return option.accessPointName;
                    }
                    if (accessType === 'FTP') {
                      return option.ftpAccountName;
                    }
                    if (accessType === 'serviceProvider') {
                      return option.serviceProvider;
                    }
                    if (accessType === 'Custom') {
                      return '';
                    }
                  }}
                  options={configSetupList}
                  onChange={(e, data) => {
                    setAccessPointName(data.accessPointName);
                    setSsId(data.ssId);
                    setAccessPointPassword(data.accessPointPassword);
                    setFtpAccountName(data.ftpAccountName);
                    setUserName(data.userName);
                    setFtpPassword(data.ftpPassword);
                    setPort(data.port);
                    setServerUrl(data.serverUrl);
                    setFolderPath(data.folderPath);
                    setServiceProvider(data.serviceProvider);
                    setApn(data.apn);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Criteria"
                      onKeyUp={() => {
                        // setTimeout(()=>{
                        //   SensorFetchService(sensorCategoryId, sensorHandleSuccess,handleException);
                        // },500);
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </div>
          <Typography variant="subtitle1" component="h6">
            Access Point
          </Typography>
          <div className="flex items-center justify-between gap-3">
            <TextField
              value={accessPointName}
              margin="dense"
              id="outlined-basic"
              label="Access Point Name"
              variant="outlined"
              fullWidth
              required
              // onBlur={() =>validateForNullValue(accessPointName, 'accessPointName')}
              onChange={(e) => { setAccessPointName(e.target.value); }}
              autoComplete="off"
              // error={errorObject?.accessPointName?.errorStatus}
              // helperText={errorObject?.accessPointName?.helperText}
            />

            <TextField
              value={ssId}
              margin="dense"
              id="outlined-basic"
              label="SSID"
              variant="outlined"
              fullWidth
              required
              // onBlur={() =>validateForNullValue(ssId, 'ssId')}
              onChange={(e) => { setSsId(e.target.value); }}
              autoComplete="off"
            />

            <TextField
              value={accessPointPassword}
              margin="dense"
              id="outlined-basic"
              label="password"
              type="password"
              variant="outlined"
              fullWidth
              required
              // onBlur={() =>validateForNullValue(accessPointPassword, 'accessPointPassword')}
              onChange={(e) => { setAccessPointPassword(e.target.value); }}
              autoComplete="off"
            />
          </div>
          <Typography variant="subtitle1" component="h6">
            FTP
          </Typography>
          <div className="flex items-center justify-between gap-3">
            <TextField
              value={ftpAccountName}
              margin="dense"
              id="outlined-basic"
              label="Account Name"
              variant="outlined"
              fullWidth
              required
              // onBlur={() =>validateForNullValue(ftpAccountName, 'ftpAccountName')}
              onChange={(e) => { setFtpAccountName(e.target.value); }}
              autoComplete="off"
              // error={errorObject?.ftpAccountName?.errorStatus}
              // helperText={errorObject?.ftpAccountName?.helperText}
            />

            <TextField
              value={userName}
              margin="dense"
              id="outlined-basic"
              label="User name"
              variant="outlined"
              required
              //  onBlur={() =>validateForNullValue(userName, 'userName')}
              onChange={(e) => { setUserName(e.target.value); }}
              autoComplete="off"
              fullWidth
              //  error={errorObject?.userName?.errorStatus}
              //  helperText={errorObject?.userName?.helperText}
            />

            <TextField
              value={ftpPassword}
              margin="dense"
              id="outlined-basic"
              type="password"
              label="password"
              variant="outlined"
              fullWidth
              required
              //  onBlur={() =>validateForNullValue(ftpPassword, 'ftpPassword')}
              onChange={(e) => { setFtpPassword(e.target.value); }}
              autoComplete="off"
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <TextField
              value={port}
              margin="dense"
              id="outlined-basic"
              label="Port"
              variant="outlined"
              fullWidth
              required
              //  onBlur={() =>validateForNullValue(port, 'port')}
              onChange={(e) => { setPort(e.target.value); }}
              autoComplete="off"
            />
            <TextField
              value={serverUrl}
              margin="dense"
              id="outlined-multiline-flexible"
              label="Server Url"
              multiline
              maxRows={4}
              fullWidth
              // onBlur={() =>validateForNullValue(serverUrl, 'serverUrl')}
              onChange={(e) => { setServerUrl(e.target.value); }}
              autoComplete="off"
              // error={errorObject?.serverUrl?.errorStatus}
              // helperText={errorObject?.serverUrl?.helperText}
            />
            <TextField
              value={folderPath}
              margin="dense"
              id="outlined-basic"
              label="Folder Path"
              variant="outlined"
              fullWidth
              //  onBlur={() =>validateForNullValue(folderPath, 'folderPath')}
              onChange={(e) => { setFolderPath(e.target.value); }}
              autoComplete="off"
            />
          </div>
          <Typography variant="subtitle1" component="h6">
            APN
          </Typography>
          <div className="flex items-center justify-between gap-3">
            <TextField
              value={serviceProvider}
              margin="dense"
              id="outlined-basic"
              label="Service Provider"
              variant="outlined"
              fullWidth
              // onBlur={() =>validateForNullValue(serviceProvider, 'serviceProvider')}
              onChange={(e) => { setServiceProvider(e.target.value); }}
              autoComplete="off"
            />
            <TextField
              value={apn}
              margin="dense"
              id="outlined-basic"
              label="APN"
              variant="outlined"
              fullWidth
              //  onBlur={() =>validateForNullValue(apn, 'apn')}
              onChange={(e) => { setApn(e.target.value); }}
              autoComplete="off"
            />
          </div>
        </DialogContent>
        <DialogActions sx={{ margin: '10px' }}>
          <Button
            autoFocus
            onClick={() => {
              setOpen(false);
              setErrorObject({});
              loadData();
            }}
          >
            Cancel
          </Button>
          <Button
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

export default DeviceConfigSetupModal;
