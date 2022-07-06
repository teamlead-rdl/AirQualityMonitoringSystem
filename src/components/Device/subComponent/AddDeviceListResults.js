import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SensorsIcon from '@mui/icons-material/Sensors';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import {
  MenuItem, Select, Box, CircularProgress, Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button, Grid,
} from '@mui/material';
import {
  GppMaybe, PlayArrow, PlayDisabled, Science, Upgrade,
} from '@mui/icons-material';
import { darken, lighten } from '@mui/material/styles';
import DeviceModel from './DeviceModelComponent';
import {
  DeviceDeleteService, DeviceFetchService, CategoryFetchService, SensorDeployFetchService, ChangeDeviceMode, deviceDeployedSensors,
} from '../../../services/LoginPageService';
import SensorModel from './SensorModelComponent';
import DeviceConfigSetupModal from '../deviceConfiguration/subcomponent/DeviceConfigSetupModalComponent';
import NotificationBar from '../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../context/UserAccessProvider';
import BumpTestComponentModal from './BumpTestComponentModal';
import DeleteConfirmationDailog from '../../../utils/confirmDeletion';
import ImageMarkerList from './imageMarkerList';

function AddDeviceListResults(props) {
  const columns = [
    {
      field: 'deviceName',
      headerName: 'Device Name',
      width: 150,
    },
    {
      field: 'deviceCategory',
      headerName: 'Device Category',
      width: 120,
    },
    {
      field: 'deviceTag',
      headerName: 'Device Tag',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 150,
    },
    {
      field: 'deviceMode',
      type: 'actions',
      headerName: 'Mode',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 180,
      cellClassName: 'actions',
      disableClickEventBubbling: true,
      getActions: (params) => [
        <ChangeMode selectedRow={params.row} />,
      ],
    },
    {
      field: 'firmwareVersion',
      headerName: 'Firm Ware',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      disableClickEventBubbling: true,
      getActions: (params) => [
        <EditData selectedRow={params.row} />,
        <DeleteData selectedRow={params.row} />,
        <SensorsData selectedRow={params.row} />,
        <AppSettingsAltIconData selectedRow={params.row} />,
      ],
    },
    {
      field: 'status',
      type: 'actions',
      headerName: 'Status',
      width: 70,
      cellClassName: 'actions',
      disableClickEventBubbling: true,
      getActions: (params) => [
        <ChangeStatus selectedRow={params.row} />,
      ],
    },
  ];
  const [progressStatus, setProgressStatus] = useState(3);
  const [device_id, setDeviceId] = useState('0');
  const [sensorRefresh, setSensorRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [deployedSensorTagList, setDeployedSensorTagList] = useState([]);
  const [bumpTestOpen, setBumpTestOpen] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);
  const [editDevice, setEditDevice] = useState([]);
  const [deviceList, setDeviceList] = useState([]);
  const [categoryList, setCategoryList] = useState('');
  const [isLoading, setGridLoading] = useState(true);
  const [sensorOpen, setSensorOpen] = useState(false);
  const [configSetupOpen, setConfigSetupOpen] = useState(false);
  const [modeChange, setModeChange] = useState(false);
  const [analogSensorList, setAnalogSensorList] = useState([]);
  const [digitalSensorList, setDigitalSensorList] = useState([]);
  const [modbusSensorList, setModbusSensorList] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const moduleAccess = useUserAccess()('devicelocation');
  const [deviceCoordsList, setDeviceCoordsList] = useState([]);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDeviceList(dataObject.data);
    let deviceCoordinationsList = dataObject.data.map((data, index)=>{
      let coordination = data.floorCords;
      let arrayList = coordination?.split(',');
      return  arrayList && {top: arrayList[0], left: arrayList[1]}
    });
    let filteredArray = deviceCoordinationsList.filter(x => x !=null);
    console.log(filteredArray);
    setDeviceCoordsList(filteredArray || []);
  };

  const handleException = () => {
  };

  useEffect(() => {
    DeviceFetchService({ ...props.locationDetails }, handleSuccess, handleException);
    loadCategory();
  }, [refreshData]);

  const categoryHandleSuccess = (dataObject) => {
    setCategoryList(dataObject.data);
  };
  const loadCategory = () => {
    CategoryFetchService(categoryHandleSuccess, handleException);
  };

  /* eslint-disable-next-line */
  function ChangeModeAPI({id}, deviceMode){
    ChangeDeviceMode({ id, deviceMode }, modeChangeHandleSuccess, modeChangeHandleException);
  }

  /* eslint-disable-next-line */
  function ChangeMode(props) {
    return ((
        <Select
          sx={{
            width: 180,
            '&.Mui-root .MuiOutlinedInput-root': {
              border: '0px solid #484850',
              borderRadius: '5px 5px 0 0',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: '0px solid #484850',
              borderRadius: '5px 5px 0 0',
            },
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.selectedRow.deviceMode}
          disabled = {!moduleAccess.edit && true}
          label="Mode"
          fullWidth
          onChange={(e) => {
            // setModeChange(true);
            ChangeModeAPI(props.selectedRow, e.target.value);
          }}
        >
          <MenuItem value="enabled">Enable</MenuItem>
          <MenuItem value="disabled">Disable</MenuItem>
          <MenuItem value="bumpTest">Bump Test</MenuItem>
          <MenuItem value="calibration">Calibration</MenuItem>
          <MenuItem value="firmwareUpgradation">Firmware Upgradation</MenuItem>
          <MenuItem value="config">Configuration</MenuItem>
        </Select>
      ));
  }

  /* eslint-disable-next-line */
  const modeChangeHandleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });

    setRefreshData((oldvalue) => !oldvalue);

    setTimeout(() => {
      handleClose();
      switch (dataObject.deviceMode) {
      case 'calibration':
        calibrateDeployedSensorsList(dataObject.deviceId);
        break;
      case 'bumpTest':
        bumptestDeployedSensorsList(dataObject.deviceId);
        break;
      default: break;
      }
    }, 3000);
  };

  const calibrateDeployedSensorsList = (id) => {
    deviceDeployedSensors(id, deviceDeployedSensorsListSuccess, deviceDeployedSensorsListException);
  };

  const bumptestDeployedSensorsList = (id) => {
    deviceDeployedSensors(id, bumptestSensorsListSuccess, bumptestSensorsListException);
  };

  const deviceDeployedSensorsListSuccess = (dataObject) => {
    setDeployedSensorTagList(dataObject);
    setProgressStatus(3);
    setSensorOpen(true);
  };
  /* eslint-disable-next-line */
  const deviceDeployedSensorsListException = (dataObject, errorObject) => {
  };

  const bumptestSensorsListSuccess = (dataObject) => {
    setDeployedSensorTagList(dataObject);
    setBumpTestOpen(true);
  };
  /* eslint-disable-next-line */
  const bumptestSensorsListException = (dataObject, errorObject) => {
  };
  /* eslint-disable-next-line */
  const modeChangeHandleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  };
  /* eslint-disable-next-line */
  function ChangeStatus(props) {
    switch (props.selectedRow.deviceMode) {
    case 'calibration':
      return <Upgrade />;
    case 'firmwareUpgradation':
      return (
        <Box sx={{ width: '50%' }}>
          <CircularProgress color="secondary" style={{ width: 20, height: 20 }} />
        </Box>
      );
    case 'disabled':
      return <PlayDisabled />;
    case 'bumpTest':
      return <Science />;
    default:
      return <PlayArrow />;
    }
  }

  /* eslint-disable-next-line */
  function EditData(props) {
    return (moduleAccess.edit
      && (
        <EditIcon
          style={{ cursor: 'pointer' }}
          onClick={(event) => {
            event.stopPropagation();
            setIsAddButton(false);
            setEditDevice(props.selectedRow);
            setOpen(true);
          }}
        />
      ));
  }
  /* eslint-disable-next-line */
  function DeleteData(props) {
    return moduleAccess.delete && (
      <DeleteIcon onClick={() => {
        setDeleteId(props.selectedRow.id);
        setDeleteDailogOpen(true);
      }}
      />
    );
  }
  /* eslint-disable-next-line */
  function SensorsData(props) {
    return (
      <SensorsIcon
        style={{ cursor: 'pointer' }}
        onClick={(event) => {
          event.stopPropagation();
          setEditDevice(props.selectedRow);
          fetchSensorList(props.selectedRow.id);
          setDeviceId(props.selectedRow.id);
        }}
      />
    );
  }
  const fetchSensorList = (device_id) => {
    SensorDeployFetchService({ ...props.locationDetails, device_id }, fetchSenosorListSuccess, fetchSenosorListException);
  };

  useEffect(()=>{
    if(device_id !== '0'){
      fetchSensorList(device_id);
    }
  }, [sensorRefresh]);
  
  const fetchSenosorListSuccess = (dataObject) => {
    setAnalogSensorList(dataObject.Analog.data || []);
    setDigitalSensorList(dataObject.Digital.data || []);
    setModbusSensorList(dataObject.Modbas.data || []);
    setProgressStatus(1);
    setSensorOpen(true);
  };

  const fetchSenosorListException = () => {
  };
  /* eslint-disable-next-line */
  function AppSettingsAltIconData(props) {
    return (moduleAccess.edit
      && (
        <AppSettingsAltIcon
          style={{ cursor: 'pointer' }}
          onClick={(event) => {
            event.stopPropagation();
            setEditDevice(props.selectedRow);
            setConfigSetupOpen(true);
          }}
        />
      ));
  }

  const deletehandleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });

    setRefreshData((oldvalue) => !oldvalue);
    setTimeout(() => {
      handleClose();
      setDeleteDailogOpen(false);
    }, 3000);
  };

  const deletehandleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  const getBackgroundColor = (color, mode) => (mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6));

  const getHoverBackgroundColor = (color, mode) => (mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5));

  return (
    <div style={{ height: 300, width: '100%', padding: 0 }}>
      <Grid container spacing={1}>
        <Grid item 
          xs={12}
          sm={8}
          md={8}
          lg={8}
          xl={8}
        >
          <Box
          sx={{
            height: 400,
            '& .super-app-theme--calibration': {
              color: 'maroon',
              bgcolor: (theme) => getBackgroundColor('#FAE8FA', theme.palette.mode),
              '&:hover': {
                bgcolor: (theme) => getHoverBackgroundColor('#FAE8FA', theme.palette.mode),
              },
              ':hover': { backgroundColor: '#FAE8FA' },
            },
            '& .super-app-theme--firmwareUpgradation': {
              color: 'purple',
              bgcolor: (theme) => getBackgroundColor('#9fa8da', theme.palette.mode),
              '&:hover': {
                bgcolor: (theme) => getHoverBackgroundColor(
                  '#9fa8da',
                  theme.palette.mode,
                ),
              },
            },
            '& .super-app-theme--disabled': {
              bgcolor: (theme) => getBackgroundColor('#ffcdd2', theme.palette.mode),
              '&:hover': {
                bgcolor: (theme) => getHoverBackgroundColor(
                  '#ffcdd2',
                  theme.palette.mode,
                ),
              },
            },
            '& .super-app-theme--enabled': {
              bgcolor: (theme) => getBackgroundColor('#A5D6A7', theme.palette.mode),
              '&:hover': {
                bgcolor: (theme) => getHoverBackgroundColor(
                  '#A5D6A7',
                  theme.palette.mode,
                ),
              },
            },
            '& .super-app-theme--bumpTest': {
              color: 'darkgoldenrod',
              bgcolor: (theme) => getBackgroundColor('#FFFCE3', theme.palette.mode),
              '&:hover': {
                bgcolor: (theme) => getHoverBackgroundColor('#FFFCE3', theme.palette.mode),
              },
            },
            '& .super-app-theme--config': {
              color: 'green',
              bgcolor: (theme) => getBackgroundColor('#F2FFF2', theme.palette.mode),
              '&:hover': {
                bgcolor: (theme) => getHoverBackgroundColor('#F2FFF2', theme.palette.mode),
              },
            },
          }}
          >
            <DataGrid
              rows={deviceList}
              columns={columns}
              pageSize={5}
              loading={isLoading}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              getRowClassName={(params) => `super-app-theme--${params.row.deviceMode}`}
            />
          </Box>
        </Grid>
        <Grid item
          xs={12}
          sm={4}
          md={4}
          lg={4}
          xl={4}
        >
          <Box
            component={Grid}
            item
            display={{
              // xs: 'none', sm: 'block', md: 'block', lg: 'block', lx: 'block',
            }}
            sx={{ width: '100%',
              height: '97%' }}
          >
            <div style={{
              width: `${99}%`, height: `${100}%`, borderColor: 'black', border: `${2}px` + ' solid' + ' black',
            }}
            >
              {/* <img
                src={'http://varmatrix.com/Aqms/blog/public/'+props.labMap}
                style={{ width: `${100}%`, height: `${100}%` }}
              /> */}
              <ImageMarkerList
                labImage={'http://varmatrix.com/Aqms/blog/public/'+props.labMap}
                deviceCoordsList={deviceCoordsList}
              />
            </div>
          </Box>
        </Grid>
      </Grid>
      <DeviceModel
        isAddButton={isAddButton}
        deviceData={editDevice}
        open={open}
        setOpen={setOpen}
        categoryData={categoryList}
        locationDetails={props.locationDetails}
        labMap={props.labMap}
        setRefreshData={setRefreshData}
      />
      <SensorModel
        setSensorRefresh={setSensorRefresh}
        analogSensorList={analogSensorList}
        digitalSensorList={digitalSensorList}
        modbusSensorList={modbusSensorList}
        deviceData={editDevice}
        locationDetails={props.locationDetails}
        device_id={editDevice.id}
        open={sensorOpen}
        setOpen={setSensorOpen}
        setRefreshData={setRefreshData}
        progressStatus={progressStatus}
        setProgressStatus={setProgressStatus}
        deployedSensorTagList={deployedSensorTagList}
      />
      <BumpTestComponentModal
        isAddButton={isAddButton}
        open={bumpTestOpen}
        setOpen={setBumpTestOpen}
        setRefreshData={setRefreshData}
        deployedSensorTagList={deployedSensorTagList}
      />
      <DeviceConfigSetupModal
        isAddButton={isAddButton}
        deviceData={editDevice}
        open={configSetupOpen}
        setOpen={setConfigSetupOpen}
      />
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
      <Dialog
        fullWidth
        maxWidth="sm"
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '100%' } }}
        open={modeChange}
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          <GppMaybe color="warning" style={{ fontSize: 95 }} />
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <Typography
            sx={{ m: 1 }}
            variant="h5"
            component="span"
          >
            Do you really want to change the mode?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ margin: '10px' }}>
          <div style={{ textAlign: 'center' }}>
            <Button onClick={() => {
              setModeChange(false);
            }}
            >
              Confirm
            </Button>
            <Button
              onClick={() => { setModeChange(false); }}
            >
              Cancel
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <DeleteConfirmationDailog
        open={deleteDailogOpen}
        setOpen={setDeleteDailogOpen}
        deleteId={deleteId}
        deleteService={DeviceDeleteService}
        handleSuccess={deletehandleSuccess}
        handleException={deletehandleException}
      />
    </div>
  );
}

export default AddDeviceListResults;
