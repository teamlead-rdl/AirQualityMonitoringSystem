import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SensorsIcon from '@mui/icons-material/Sensors';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import {
  MenuItem, Select, Box, CircularProgress, Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button,
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
      width: 100,
      cellClassName: 'actions',
      disableClickEventBubbling: true,
      getActions: (params) => [
        <ChangeStatus selectedRow={params.row} />,
      ],
    },
  ];
  const [progressStatus, setProgressStatus] = useState(3);
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
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDeviceList(dataObject.data);
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
    return (moduleAccess.edit
      && (
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
        }}
      />
    );
  }
  const fetchSensorList = (device_id) => {
    SensorDeployFetchService({ ...props.locationDetails, device_id }, fetchSenosorListSuccess, fetchSenosorListException);
  };

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
      <Box
        sx={{
          height: 400,
          width: 1,
          '& .super-app-theme--calibration': {
            bgcolor: (theme) => getBackgroundColor('#FAE8FA', theme.palette.mode),
            '&:hover': {
              bgcolor: (theme) => getHoverBackgroundColor('#FAE8FA', theme.palette.mode),
            },
            ':hover': { backgroundColor: '#FAE8FA' },
          },
          '& .super-app-theme--firmwareUpgradation': {
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
            bgcolor: (theme) => getBackgroundColor('#FFFCE3', theme.palette.mode),
            '&:hover': {
              bgcolor: (theme) => getHoverBackgroundColor('#FFFCE3', theme.palette.mode),
            },
          },
          '& .super-app-theme--config': {
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
