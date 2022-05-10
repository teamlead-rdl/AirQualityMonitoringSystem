import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Grid, DialogTitle, List, Box, Dialog, Button, DialogContent,
  ListItem, ListItemButton, ListItemAvatar, ListItemText, Avatar,
} from '@mui/material';
import { Sensors as SensorsIcon } from '@mui/icons-material';
import {
  SensorDeployDeleteService,
  SensorPropertiesUpdateService,
} from '../../../services/LoginPageService';
import NotificationBar from '../../notification/ServiceNotificationBar';
import SensorAdd from '../SensorAdd';
import SensorSettingsButton from './SensorSettingsButton';
import SensorSettingsMenu from './SensorSettingsMenu';

const ListWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function SensorModel({
  open,
  setOpen,
  locationDetails,
  analogSensorList,
  digitalSensorList,
  modbusSensorList,
  setRefreshData,
}) {
  const [progressStatus, setProgressStatus] = useState(1);
  const [editData, setEditData] = useState('');
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [popperOpen, setPopperOpen] = useState(false);
  const [sensorUpdateId, setSensorUpdateId] = useState('');
  useEffect(() => {}, [
    analogSensorList || digitalSensorList || modbusSensorList,
  ]);

  const deleteSensor = (id) => {
    SensorDeployDeleteService(id, handleSuccess, handleException);
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

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  const successSensorUpdate = () => {
    setPopperOpen(false);
  };

  const handleFailure = () => {};

  const updateSensorProperties = (id, sensorProperties) => {
    SensorPropertiesUpdateService({ ...id, ...sensorProperties }, successSensorUpdate, handleFailure);
  };

  const setSensorIdForOptions = (sensorId) => {
    setPopperOpen(true);
    setSensorUpdateId(sensorId);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      sx={{ '& .MuiDialog-paper': { width: '100%' } }}
      open={open}
    >
      {progressStatus === 1 && (
        <>
          <DialogTitle>Sensors for device</DialogTitle>
          <DialogContent>
            <SensorSettingsMenu
              anchorEl={anchorEl}
              popperOpen={popperOpen}
              setPopperOpen={setPopperOpen}
              sensorProperties={{
                id: sensorUpdateId,
                sensorStatus: true,
                sensorNotificationStatus: true,
              }}
              deleteSensor={deleteSensor}
              updateService={updateSensorProperties}
            />
            <Box sx={{ flexGrow: 1, width: '100%', height: 300 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <div style={{ marginLeft: 20, textAlign: 'center' }}>
                    Analog
                  </div>
                  <ListWrapper style={{ maxHeight: 300, overflow: 'auto' }}>
                    <List dense={false}>
                      {analogSensorList.length > 0 ? (
                        analogSensorList.map((data) => {
                          return (
                            <ListItem component="li" disablePadding>
                              <ListItemButton sx={{ height: 56 }}>
                                <ListItemAvatar>
                                  <Avatar>
                                    <SensorsIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={data.sensorTag}
                                  secondary={data.sensorNameUnit}
                                  onClick={() => {
                                    setEditData(data);
                                    setProgressStatus(2);
                                  }}
                                  style={{ cursor: 'pointer' }}
                                />
                                <SensorSettingsButton
                                  setAnchorEl={setAnchorEl}
                                  setPopperOpen={() => setSensorIdForOptions(data.id)}
                                  handleClose={handleClose}
                                />
                              </ListItemButton>
                            </ListItem>
                          );
                        })
                      ) : (
                        <ListItem
                          style={{ display: 'block', textAlignLast: 'center' }}
                        >
                          <ListItemAvatar />
                          <span
                            style={{
                              display: 'block',
                              textAlignLast: 'center',
                            }}
                          >
                            No Analog Sensors
                          </span>
                        </ListItem>
                      )}
                    </List>
                  </ListWrapper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div style={{ marginLeft: 20, textAlign: 'center' }}>
                    Modbus
                  </div>
                  <ListWrapper style={{ maxHeight: 300, overflow: 'auto' }}>
                    <List dense={false}>
                      {modbusSensorList.length > 0 ? (
                        modbusSensorList.map((data) => {
                          return (
                            <ListItem component="li" disablePadding>
                              <ListItemButton sx={{ height: 56 }}>
                                <ListItemAvatar>
                                  <Avatar>
                                    <SensorsIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={data.sensorTag}
                                  secondary={data.sensorNameUnit}
                                  onClick={() => {
                                    setEditData(data);
                                    setProgressStatus(2);
                                  }}
                                  style={{ cursor: 'pointer' }}
                                />
                                <SensorSettingsButton
                                  setAnchorEl={setAnchorEl}
                                  setPopperOpen={() => setSensorIdForOptions(data.id)}
                                  handleClose={handleClose}
                                />
                              </ListItemButton>
                            </ListItem>
                          );
                        })
                      ) : (
                        <ListItem
                          style={{ display: 'block', textAlignLast: 'center' }}
                        >
                          <ListItemAvatar />
                          <span
                            style={{
                              display: 'block',
                              textAlignLast: 'center',
                            }}
                          >
                            No Modbus Sensors
                          </span>
                        </ListItem>
                      )}
                    </List>
                  </ListWrapper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div style={{ marginLeft: 20, textAlign: 'center' }}>
                    Digital
                  </div>
                  <ListWrapper>
                    <List dense={false}>
                      {digitalSensorList.length > 0 ? (
                        digitalSensorList.map((data) => {
                          return (
                            <ListItem component="li" disablePadding>
                              <ListItemButton sx={{ height: 56 }}>
                                <ListItemAvatar>
                                  <Avatar>
                                    <SensorsIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={data.sensorTag}
                                  secondary={data.sensorNameUnit}
                                  onClick={() => {
                                    setEditData(data);
                                    setProgressStatus(2);
                                  }}
                                  style={{ cursor: 'pointer' }}
                                />
                                <SensorSettingsButton
                                  setAnchorEl={setAnchorEl}
                                  setPopperOpen={() => setSensorIdForOptions(data.id)}
                                  handleClose={handleClose}
                                />
                              </ListItemButton>
                            </ListItem>
                          );
                        })
                      ) : (
                        <ListItem
                          style={{ display: 'block', textAlignLast: 'center' }}
                        >
                          <ListItemAvatar />
                          <span
                            style={{
                              display: 'block',
                              textAlignLast: 'center',
                            }}
                          >
                            No Digital Sensors
                          </span>
                        </ListItem>
                      )}
                    </List>
                  </ListWrapper>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <div className="float-right">
                <div className="rounded-md -space-y-px">
                  <Button
                    sx={{ m: 2 }}
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Box>
          </DialogContent>

          <NotificationBar
            handleClose={handleClose}
            notificationContent={openNotification.message}
            openNotification={openNotification.status}
            type={openNotification.type}
          />
        </>
      )}
      {progressStatus === 2 && (
        <div style={{ textAlign: 'center', padding: 5 }}>
          <SensorAdd
            isUpdate
            editData={editData}
            locationDetails={locationDetails}
            setProgressStatus={setProgressStatus}
          />
        </div>
      )}
    </Dialog>
  );
}

export default SensorModel;
