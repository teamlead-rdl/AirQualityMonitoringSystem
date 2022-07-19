import {
  Button, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { CompanyLogInterval } from '../../services/LoginPageService';
import ApplicationStore from '../../utils/localStorageUtil';
/* eslint-disable no-shadow */

function LogIntervalSetting({
  open, setOpen, setNotification, handleClose, intervalDetails,
}) {
  const [alertLogInterval, setAlertLogInterval] = useState(intervalDetails?.alertLogInterval || '15');
  const [deviceLogInterval, setDeviceLogInterval] = useState(intervalDetails?.deviceLogInterval || '15');
  const [sensorLogInterval, setSensorLogInterval] = useState(intervalDetails?.sensorLogInterval || '15');
  const [periodicBackupInterval, setPeriodicBackupInterval] = useState(intervalDetails?.periodicBackupInterval || '12');
  const [dataRetentionPeriodInterval, setDataRetentionPeriodInterval] = useState(intervalDetails?.dataRetentionPeriodInterval || '12');
  const [expireDateReminder, setExpireDateReminder] = useState(intervalDetails?.expireDateReminder || '2');

  const handleSubmit = (e) => {
    e.preventDefault();
    CompanyLogInterval({
      alertLogInterval, deviceLogInterval, sensorLogInterval, periodicBackupInterval, dataRetentionPeriodInterval, expireDateReminder,
    }, handleLogSuccess, handleLogException);
  };

  const handleLogException = () => { };

  const handleLogSuccess = (dataObject) => {
    const userDetails = ApplicationStore().getStorage('userDetails');
    ApplicationStore().setStorage('userDetails', {
      ...userDetails,
      intervalDetails: {
        alertLogInterval, deviceLogInterval, sensorLogInterval, periodicBackupInterval, dataRetentionPeriodInterval, expireDateReminder,
      },
    });
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    handleClose();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    const { intervalDetails } = ApplicationStore().getStorage('userDetails');
    setAlertLogInterval(intervalDetails.alertLogInterval || '15');
    setDeviceLogInterval(intervalDetails.deviceLogInterval || '15');
    setSensorLogInterval(intervalDetails.sensorLogInterval || '15');
    setPeriodicBackupInterval(intervalDetails.periodicBackupInterval || '12');
    setDataRetentionPeriodInterval(intervalDetails.dataRetentionPeriodInterval || '12');
    setExpireDateReminder(intervalDetails.expireDateReminder || '2');
  };
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      sx={{ '& .MuiDialog-paper': { width: '95%', maxHeight: '95%' } }}
      open={open}
    >
      <DialogTitle>Polling Interval</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid container>
              <Grid
                item
                sx={{
                  width: '50%', textAlign: 'center', alignSelf: 'center', paddingTop: 2,
                }}
              >
                <Typography>
                  Alert Refresh Interval :
                </Typography>
              </Grid>
              <Grid item sx={{ width: '50%', paddingTop: 2 }}>
                <TextField
                  type="number"
                  fullWidth
                  md={12}
                  label="Seconds"
                  required
                  autoComplete="off"
                  value={alertLogInterval}
                  onChange={(e) => {
                    setAlertLogInterval(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                sx={{
                  width: '50%', textAlign: 'center', alignSelf: 'center', paddingTop: 2,
                }}
              >
                <Typography>
                  Sensor Refresh Interval :
                </Typography>
              </Grid>
              <Grid item sx={{ width: '50%', paddingTop: 2 }}>
                <TextField
                  type="number"
                  fullWidth
                  md={12}
                  label="Seconds"
                  required
                  autoComplete="off"
                  value={sensorLogInterval}
                  onChange={(e) => {
                    setSensorLogInterval(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                sx={{
                  width: '50%', textAlign: 'center', alignSelf: 'center', paddingTop: 2,
                }}
              >
                <Typography>
                  Device Refresh Interval :
                </Typography>
              </Grid>
              <Grid item sx={{ width: '50%', paddingTop: 2 }}>
                <TextField
                  type="number"
                  fullWidth
                  md={12}
                  label="Seconds"
                  required
                  autoComplete="off"
                  value={deviceLogInterval}
                  onChange={(e) => {
                    setDeviceLogInterval(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                sx={{
                  width: '50%', textAlign: 'center', alignSelf: 'center', paddingTop: 2,
                }}
              >
                <Typography>
                  Backup :
                </Typography>
              </Grid>
              <Grid item sx={{ width: '50%', paddingTop: 2 }}>
                <TextField
                  type="number"
                  fullWidth
                  md={12}
                  label="Days"
                  required
                  autoComplete="off"
                  value={periodicBackupInterval}
                  onChange={(e) => {
                    setPeriodicBackupInterval(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                sx={{
                  width: '50%', textAlign: 'center', alignSelf: 'center', paddingTop: 2,
                }}
              >
                <Typography>
                  Data Retention Period :
                </Typography>
              </Grid>
              <Grid item sx={{ width: '50%', paddingTop: 2 }}>
                <TextField
                  type="number"
                  fullWidth
                  md={12}
                  label="Days"
                  required
                  autoComplete="off"
                  value={dataRetentionPeriodInterval}
                  onChange={(e) => {
                    setDataRetentionPeriodInterval(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                sx={{
                  width: '50%', textAlign: 'center', alignSelf: 'center', paddingTop: 2,
                }}
              >
                <Typography>
                  Expire Date Reminder :
                </Typography>
              </Grid>
              <Grid item sx={{ width: '50%', paddingTop: 2 }}>
                <TextField
                  type="number"
                  fullWidth
                  md={12}
                  label="Days"
                  required
                  autoComplete="off"
                  value={expireDateReminder}
                  onChange={(e) => {
                    setExpireDateReminder(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              fullWidth
              style={{
                flexFlow: 'row-reverse',
              }}
            >
              <Button type="submit">
                Update
              </Button>
              <Button onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default LogIntervalSetting;
