import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SensorsIcon from '@mui/icons-material/Sensors';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import DeviceModel from './DeviceModelComponent';
import {
  DeviceDeleteService, DeviceFetchService, CategoryFetchService, SensorDeployFetchService,
} from '../../../services/LoginPageService';
import SensorModel from './SensorModelComponent';
import DeviceConfigSetupModal from '../deviceConfiguration/subcomponent/DeviceConfigSetupModalComponent';
import NotificationBar from '../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../context/UserAccessProvider';
import { MenuItem, Select } from '@mui/material';
import BumpTestComponentModal from './BumpTestComponentModal';
import { PlayArrow, PlayDisabled, Science, Tune, Upgrade } from '@mui/icons-material';

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
  const [bumpTestOpen, setBumpTestOpen] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);
  const [editDevice, setEditDevice] = useState([]);
  const [deviceList, setDeviceList] = useState([]);
  const [categoryList, setCategoryList] = useState('');
  const [isLoading, setGridLoading] = useState(true);
  // const {
  //   location_id, branch_id, facility_id, building_id, floor_id, lab_id,
  // } = props.locationDetails;
  const [sensorOpen, setSensorOpen] = useState(false);
  const [configSetupOpen, setConfigSetupOpen] = useState(false);
  // const [editConfigSetup, setEditConfigSetup] = useState([]);

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
  function ChangeMode(props) {
    return (moduleAccess.edit
      && (
          <Select
            sx={{
              width:180,
              "&.Mui-root .MuiOutlinedInput-root": {
                border: "0px solid #484850",
                borderRadius: "5px 5px 0 0"
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "0px solid #484850",
                borderRadius: "5px 5px 0 0"
              },
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.selectedRow.deviceMode}
            label="Mode"
            fullWidth
            onChange={(e)=>{
              switch(e.target.value){
                case "calibration" : 
                  setProgressStatus(3);
                  setSensorOpen(true);
                  break;
                case "bumpTest" :
                  setBumpTestOpen(true);
                  break;
                default : break;
              }
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
  function ChangeStatus(props) {
    switch(props.selectedRow.deviceMode){
      case "calibration" : 
        return <Upgrade/>
      case "firmwareUpgradation" : 
        return <Tune/>
      case "disabled" : 
        return <PlayDisabled/>
      case "bumpTest" :
        return <Science/>
      default : 
        return <PlayArrow/>
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
        DeviceDeleteService(props.selectedRow, deletehandleSuccess, deletehandleException);
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
    }, 5000);
  };

  const deletehandleException = (errorObject, errorMessage) => {
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

  return (
    <div style={{ height: 300, width: '100%', padding: 0 }}>
      <DataGrid
        rows={deviceList}
        columns={columns}
        pageSize={5}
        loading={isLoading}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
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
      />
      <BumpTestComponentModal
        isAddButton={isAddButton}      
        open={bumpTestOpen}
        setOpen={setBumpTestOpen}
        setRefreshData={setRefreshData}
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
    </div>
  );
}

export default AddDeviceListResults;
