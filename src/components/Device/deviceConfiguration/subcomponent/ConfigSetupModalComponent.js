import {
  Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { ConfigSetupAddService, ConfigSetupEditService } from '../../../../services/LoginPageService';
import { AddVendorValidate } from '../../../../validation/locationValidation';
import NotificationBar from '../../../notification/ServiceNotificationBar';

function ConfigSetupModal({
  open, setOpen, isAddButton, configSetupData, setRefreshData,
}) {
  const [id, setId] = useState('');

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

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const [errorObject, setErrorObject] = useState({});

  useEffect(() => {
    setOpen(open);
    loadData();
  }, [configSetupData]);

  const loadData = () => {
    setId(configSetupData.id || '');

    setAccessPointName(configSetupData.accessPointName || '');
    setSsId(configSetupData.ssId || '');
    setAccessPointPassword(configSetupData.accessPointPassword || '');

    setFtpAccountName(configSetupData.ftpAccountName || '');
    setUserName(configSetupData.userName || '');
    setFtpPassword(configSetupData.ftpPassword || '');
    setPort(configSetupData.port || '');
    setServerUrl(configSetupData.serverUrl || '');
    setFolderPath(configSetupData.folderPath || '');

    setServiceProvider(configSetupData.serviceProvider || '');
    setApn(configSetupData.apn || '');
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
      await ConfigSetupAddService({
        accessPointName, ssId, accessPointPassword, ftpAccountName, userName, ftpPassword, port, serverUrl, folderPath, serviceProvider, apn,
      }, handleSuccess, handleException);
    } else {
      await ConfigSetupEditService({
        id, accessPointName, ssId, accessPointPassword, ftpAccountName, userName, ftpPassword, port, serverUrl, folderPath, serviceProvider, apn,
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
          {isAddButton ? 'Add ConfigSetup' : 'Edit ConfigSetup'}
        </DialogTitle>

        <DialogContent>
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
              
              // onBlur={() =>validateForNullValue(ftpAccountName, 'ftpAccountName')}
              onChange={(e) => { setFtpAccountName(e.target.value); }}
              autoComplete="off"
            />
            <TextField
              value={userName}
              margin="dense"
              id="outlined-basic"
              label="User name"
              variant="outlined"
              
              //  onBlur={() =>validateForNullValue(userName, 'userName')}
              onChange={(e) => { setUserName(e.target.value); }}
              autoComplete="off"
              fullWidth
            />
            <TextField
              value={ftpPassword}
              margin="dense"
              id="outlined-basic"
              type="password"
              label="password"
              variant="outlined"
              fullWidth
              
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
            size="large"
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
            // disabled={errorObject?.vendorName?.errorStatus || errorObject?.companyCode?.errorStatus || errorObject?.phoneNumber?.errorStatus || errorObject?.emailId?.errorStatus || errorObject?.address?.errorStatus|| errorObject?.contactPerson?.errorStatus}
            size="large"
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

export default ConfigSetupModal;
