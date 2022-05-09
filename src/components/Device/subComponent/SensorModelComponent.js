import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SensorsIcon from '@mui/icons-material/Sensors';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  CalibrationAddService,
  DeployedSensorsDetailsList,
  SensorDeployDeleteService,
} from '../../../services/LoginPageService';
import NotificationBar from '../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../context/UserAccessProvider';
import SensorAdd from '../SensorAdd';
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteConfirmationDailog from '../../../utils/confirmDeletion';
// CalibrationAddService
function generate(element) {
  return [0, 1, 2].map((value) => React.cloneElement(element, {
    key: value,
  }));
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function SensorModel({
  open,
  setOpen,
  deviceData,
  locationDetails,
  device_id,
  analogSensorList,
  digitalSensorList,
  modbusSensorList,
  setRefreshData,
  progressStatus,
  setProgressStatus,
  deployedSensorTagList
}) {
  const moduleAccess = useUserAccess()('devicelocation');
  
  const [editData, setEditData] = useState('');
  const [isUpdate, setIsUpdate] = useState(true);
  const [sensorTag, setSensorTag] = useState('');
  const [name, setName] = useState(''); 
  const [model, setModel] = useState('');
  const [testResult, setTestResult] = useState('');
  const [nextDueDate, setNextDueDate] = useState('');
  const [lastDueDate, setLastDueDate] = useState('');
  const [calibrationList, setCalibrationlist] = useState([]);

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
  }, [analogSensorList || digitalSensorList || modbusSensorList]);

  const [dense, setDense] = React.useState(false);

  const columns = [
    {
      field: 'calibrationDate',
      headerName: 'Date',
      width: 200,
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'model',
      headerName: 'Model',
      width: 150,
      editable: true,
    },
    {
      field: 'testResult',
      headerName: 'Test Result',
      width: 200,
      editable: true,
    },
    {
      field: 'nextDueDate',
      headerName: 'Next Due Date',
      width: 200,
      editable: true,
    }
  ];

  const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    CalibrationAddService({sensorTag, name, model, testResult, nextDueDate}, calibrationHandleSuccess, calibrationHandleException);
  };

  const calibrationHandleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setRefreshData((oldvalue) => !oldvalue);
    setTimeout(() => {
      handleClose();
      setSensorTag('');
      setName('');
      setModel('');
      setTestResult('');
      setNextDueDate('');
      setLastDueDate('');
      setCalibrationlist([]);
    }, 2000);
  };

  const calibrationHandleException = (dataObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
    setTimeout(() => {
      handleClose();
    }, 3000);
  };
  const deleteSensor = (data) => {
    setDeleteId(data.id);
    setDeleteDailogOpen(true);
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
      setDeleteDailogOpen(false);
      setOpen(false);
    }, 3000);
  };

  const handleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  const fetchCalibrationDetails = (sensorTag) => {
    DeployedSensorsDetailsList({sensorTag}, calibrationdetailsHandleSuccess, calibrationDetailsHandleException)
  }
  const calibrationdetailsHandleSuccess = (dataObject) => {
    setName(dataObject.sensorNameUnit)
    setLastDueDate(dataObject.lastDueDate);
    setCalibrationlist(dataObject.data);
  };

  const calibrationDetailsHandleException = (errorObject, errorMessage) => {
  };

  const handleCancel = () => {
    setRefreshData((oldvalue) => !oldvalue);
    setProgressStatus(0);
    setOpen(false);
    setSensorTag('');
    setName('');
    setModel('');
    setTestResult('');
    setNextDueDate('');
    setLastDueDate('');
    setCalibrationlist([]);
  }
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
      maxWidth="lg"
      sx={{ '& .MuiDialog-paper': { width: '100%' } }}
      open={open}
    >
      {progressStatus === 1 && (
        <>
          <DialogTitle>Sensors for device</DialogTitle>
          <DialogContent>
            <Box sx={{ flexGrow: 1, width: '100%', height: 300 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <div style={{ marginLeft: 20, textAlign: 'center' }}>
                    Analog
                  </div>
                  <Demo>
                    <List dense={dense}>
                      {analogSensorList.length > 0
                        ? analogSensorList.map((data) => {
                          return (
                            <ListItem
                              secondaryAction={moduleAccess.delete
                                                && (
                                                  <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => { deleteSensor(data); }}
                                                  >
                                                    <DeleteIcon />
                                                  </IconButton>
                                                )}
                            >
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
                            </ListItem>
                          );
                        })
                        : (
                          <ListItem
                            style={{ display: 'block', textAlignLast: 'center' }}
                          >
                            <ListItemAvatar />
                            <span style={{ display: 'block', textAlignLast: 'center' }}>No Analog Sensors</span>
                          </ListItem>
                        )}
                    </List>
                  </Demo>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div style={{ marginLeft: 20, textAlign: 'center' }}>
                    Modbus
                  </div>
                  <Demo style={{ maxHeight: 300, overflow: 'auto' }}>
                    <List dense={dense}>
                      {modbusSensorList.length > 0
                        ? modbusSensorList.map((data, index) => {
                          return (
                            <ListItem
                              secondaryAction={moduleAccess.delete
                                                && (
                                                  <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => { deleteSensor(data); }}
                                                  >
                                                    <DeleteIcon />
                                                  </IconButton>
                                                )}
                            >
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
                            </ListItem>
                          );
                        })
                        : (
                          <ListItem
                            style={{ display: 'block', textAlignLast: 'center' }}
                          >
                            <ListItemAvatar />
                            <span style={{ display: 'block', textAlignLast: 'center' }}>No Modbus Sensors</span>
                          </ListItem>
                        )}
                    </List>
                  </Demo>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div style={{ marginLeft: 20, textAlign: 'center' }}>
                    Digital
                  </div>
                  <Demo>
                    <List dense={dense}>
                      {digitalSensorList.length > 0
                        ? digitalSensorList.map((data, index) => {
                          return (
                            <ListItem
                              secondaryAction={moduleAccess.delete
                                                && (
                                                  <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => { deleteSensor(data); }}
                                                  >
                                                    <DeleteIcon />
                                                  </IconButton>
                                                )}
                            >
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
                            </ListItem>
                          );
                        })
                        : (
                          <ListItem
                            style={{ display: 'block', textAlignLast: 'center' }}
                          >
                            <ListItemAvatar />
                            <span style={{ display: 'block', textAlignLast: 'center' }}>No Digital Sensors</span>
                          </ListItem>
                        )}
                    </List>
                  </Demo>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <div className="float-right">
                <div className="rounded-md -space-y-px">
                  <Button
                    sx={{ m: 2 }}
                    onClick={(e) => {
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Box>
          </DialogContent>
        </>
      )}
      {progressStatus === 2 && (
        <div style={{ textAlign: 'center', padding: 5 }}>
          <SensorAdd isUpdate={isUpdate} editData={editData} locationDetails={locationDetails} setProgressStatus={setProgressStatus}/>
        </div>
      )}
      {progressStatus === 3 && (
        <Grid container spacing={1} sx={{p:3}}>
          <Typography sx={{ m: 0, marginTop: 1 }} variant="h5">
            Calibration
          </Typography>
          <Grid container spacing={1}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid container spacing={1} sx={{ mt:3, ml:2 }}>
                  <Grid 
                    sx={{mt: 0, padding: 0}}
                    item 
                    xs={12}
                    sm={4}
                    md={4}
                    lg={4}
                    xl={4}
                  >
                    <div className="rounded-md -space-y-px">
                      <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                        <InputLabel id="demo-simple-select-label">
                          Sensor Tag
                        </InputLabel>
                        <Select
                          // sx={{ minWidth: 250 }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={sensorTag}
                          required
                          // disabled={editData && true}
                          label="Sensor Tag"
                          onChange={(e) => {
                            setSensorTag(e.target.value);
                            fetchCalibrationDetails(e.target.value);
                          }}
                          // error={errorObject?.deviceCategory?.errorStatus}
                          // helperText={errorObject?.deviceCategory?.helperText}
                        >
                          {deployedSensorTagList.map((data) => {
                            return (
                              <MenuItem value={data.sensorTag}>{data.sensorTag}</MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={4}
                    lg={4}
                  >
                    <div className="rounded-md -space-y-px">
                      <TextField
                        sx={{ marginTop: 0 }}
                        value={name}
                        disabled
                        // onBlur={() => validateForNullValue(sensorTag, 'sensorTag')}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        margin="normal"
                        required
                        id="outlined-required"
                        label="Name"
                        fullWidth
                        // error={errorObject?.sensorTag?.errorStatus}
                        // helperText={errorObject?.sensorTag?.helperText}
                        autoComplete="off"
                      />
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={4}
                    lg={4}
                  >
                    <div className="rounded-md -space-y-px">
                      <TextField
                        sx={{ marginTop: 0 }}
                        value={model}
                        // onBlur={() => validateForNullValue(sensorTag, 'sensorTag')}
                        onChange={(e) => {
                          setModel(e.target.value);
                        }}
                        margin="normal"
                        required
                        id="outlined-required"
                        label="Model"
                        fullWidth
                        // error={errorObject?.sensorTag?.errorStatus}
                        // helperText={errorObject?.sensorTag?.helperText}
                        autoComplete="off"
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ ml:2 }} >
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={4}
                    lg={4}
                  >
                    <div className="rounded-md -space-y-px">
                      <TextField
                        sx={{ marginTop: 0 }}
                        value={testResult}
                        // onBlur={() => validateForNullValue(sensorTag, 'sensorTag')}
                        onChange={(e) => {
                          setTestResult(e.target.value);
                        }}
                        margin="normal"
                        required
                        id="outlined-required"
                        label="Test Result"
                        fullWidth
                        // error={errorObject?.sensorTag?.errorStatus}
                        // helperText={errorObject?.sensorTag?.helperText}
                        autoComplete="off"
                      />
                    </div>
                  </Grid>
                  <Grid 
                    item
                    xs={12}
                    sm={4}
                    md={4}
                    lg={4}
                    xl={4}
                  >
                    <div className="rounded-md -space-y-px">
                      <TextField
                        sx={{ marginTop: 0 }}
                        value={lastDueDate}
                        // onBlur={() => validateForNullValue(sensorTag, 'sensorTag')}
                        onChange={(e) => {
                          // setSensorTag(e.target.value);
                        }}
                        margin="normal"
                        disabled
                        id="outlined-required"
                        label="Calibration Due Date"
                        fullWidth
                        type="date"
                        // error={errorObject?.sensorTag?.errorStatus}
                        // helperText={errorObject?.sensorTag?.helperText}
                        autoComplete="off"
                        InputLabelProps={{shrink: true}}
                      />
                    </div>
                  </Grid>
                  <Grid 
                    item
                    xs={12}
                    sm={4}
                    md={4}
                    lg={4}
                    xl={4}
                  >
                    <div className="rounded-md -space-y-px">
                      <TextField
                        sx={{ marginTop: 0 }}
                        value={nextDueDate}
                        // onBlur={() => validateForNullValue(sensorTag, 'sensorTag')}
                        onChange={(e) => {
                          setNextDueDate(e.target.value);
                        }}
                        margin="normal"
                        required
                        id="outlined-required"
                        label="Next Calibration Date"
                        fullWidth
                        type="date"
                        // error={errorObject?.sensorTag?.errorStatus}
                        // helperText={errorObject?.sensorTag?.helperText}
                        autoComplete="off"
                        InputLabelProps={{shrink: true}}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={1} 
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  sx={{marginTop:1}}
                >
                  <Grid item 
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <div className="float-right">
                      <Button type="submit" >
                        Submit
                      </Button>
                      <Button
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid container spacing={1} sx={{ml:0}}>
            <Typography sx={{ m: 0, marginTop: 2 }} variant="h5">
              Calibration Details
            </Typography>
            <Grid 
              sx={{height: 250, width: '100%', paddingLeft: 0}}
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <DataGrid
                rows={calibrationList}
                columns={columns}
                pageSize={5}
                // loading={isLoading}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </Grid>
          </Grid>
        </Grid>
      )}
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
      <DeleteConfirmationDailog
        open={deleteDailogOpen}
        setOpen={setDeleteDailogOpen}
        deleteId={deleteId}
        deleteService={SensorDeployDeleteService}
        handleSuccess={handleSuccess}
        handleException={handleException}
      />
    </Dialog>
  );
}

export default SensorModel;
