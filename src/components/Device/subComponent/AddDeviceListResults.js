import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import DeviceModel from './DeviceModelComponent';
import { DeviceDeleteService, DeviceFetchService, CategoryFetchService, SensorDeployFetchService} from '../../../services/LoginPageService';
import SensorsIcon from '@mui/icons-material/Sensors';
import SensorModel from './SensorModelComponent';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import DeviceConfigSetupModal from '../deviceConfiguration/subcomponent/DeviceConfigSetupModalComponent';
import NotificationBar from '../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../context/UserAccessProvider';

const AddDeviceListResults = (props) => {
  const columns = [
    {
      field: 'deviceName',
      headerName: 'Device Name',
      width: 150,
    },
    {
      field: 'deviceCategory',
      headerName: 'Device Category',
      width: 220,
    },   
    {
      field: 'deviceTag',
      headerName: 'Device Tag',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
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
      getActions: (params) => {
        return [
          <EditData selectedRow={params.row}/>,
          <DeleteData selectedRow={params.row} />,
          <SensorsData selectedRow={params.row}/>,
          <AppSettingsAltIconData selectedRow={params.row} />
        ];
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);
  const [editDevice, setEditDevice] = useState([]);
  const [deviceList, setDeviceList] = useState([]);
  const [categoryList, setCategoryList] = useState('');
  const [isLoading, setGridLoading] = useState(true);
  const { location_id, branch_id, facility_id, building_id, floor_id, lab_id } = props.locationDetails;
  const [sensorOpen, setSensorOpen] = useState(false);
  const [configSetupOpen, setConfigSetupOpen] = useState(false);
  const [editConfigSetup, setEditConfigSetup] = useState([]);

  const [analogSensorList, setAnalogSensorList] = useState([]); 
  const [digitalSensorList, setDigitalSensorList] = useState([]); 
  const [modbusSensorList, setModbusSensorList] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const moduleAccess = useUserAccess()('devicelocation');
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: ''
  });

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDeviceList(dataObject.data);
  };
  
  const handleException = (errorObject) => {
    console.log(JSON.stringify(errorObject));
  };

  useEffect(() => {
    DeviceFetchService({ ...props.locationDetails },handleSuccess, handleException);
    loadCategory();  
  }, [refreshData]);


  const categoryHandleSuccess = (dataObject) => {
    setCategoryList(dataObject.data);  
    console.log(categoryList);  
  };
  const loadCategory = () => {
    CategoryFetchService(categoryHandleSuccess,handleException);
  };

  const EditData = (props) => {
    return ( moduleAccess.edit &&
      <EditIcon style={{ cursor: 'pointer' }}
        onClick={(event) => {
          event.stopPropagation();
          setIsAddButton(false);
          setEditDevice(props.selectedRow);
          setOpen(true);
        }} />);
  };

  const DeleteData = (props) => {
    return moduleAccess.delete && <DeleteIcon onClick={()=>{
      console.log(props.selectedRow.id);
      DeviceDeleteService(props.selectedRow,  deletehandleSuccess, deletehandleException);
    }}/>;
  };
  const SensorsData = (props) => {
    return (
      <SensorsIcon style={{ cursor: 'pointer' }}
        onClick={(event) => {
          event.stopPropagation();
          setEditDevice(props.selectedRow);
          fetchSensorList(props.selectedRow.id);
        }} />);
  };
  const fetchSensorList = (device_id) =>{
    SensorDeployFetchService({...props.locationDetails, device_id}, fetchSenosorListSuccess, fetchSenosorListException);
  };
  
  const fetchSenosorListSuccess = (dataObject) => {
    // console.log(dataObject.Analog);
    setAnalogSensorList(dataObject.Analog.data || []);
    setDigitalSensorList(dataObject.Digital.data || []);
    setModbusSensorList(dataObject.Modbas.data || []);
    setSensorOpen(true);
  };
  
  const fetchSenosorListException = (dataObject, errorObject) => {
  };

  const AppSettingsAltIconData = (props) => {
    return (moduleAccess.edit &&
      <AppSettingsAltIcon style={{ cursor: 'pointer' }}
        onClick={(event) => {
          event.stopPropagation();
          setEditDevice(props.selectedRow);          
          setConfigSetupOpen(true);
        }} />);
  };

  const deletehandleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message
    });

    setRefreshData((oldvalue)=>{
      return !oldvalue;
    });
    
    setTimeout(() => {
      handleClose();
    }, 5000);
  };
  
  const deletehandleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage
    });
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: ''
    });
  };
  return (
    <div style={{ height: 300, width: '100%', padding:0 }}>
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
        categoryData = {categoryList}
        locationDetails= {props.locationDetails}
        labMap={props.labMap}
        setRefreshData={setRefreshData}
      />
      <SensorModel  
        analogSensorList={analogSensorList} 
        digitalSensorList={digitalSensorList} 
        modbusSensorList={modbusSensorList}
        deviceData={editDevice}
        locationDetails= {props.locationDetails}
        device_id={editDevice.id}
        open={sensorOpen}
        setOpen={setSensorOpen}
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
};

export default AddDeviceListResults;