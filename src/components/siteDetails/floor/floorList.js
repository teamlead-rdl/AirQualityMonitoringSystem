import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { PlayArrow, Edit, DeleteOutlined } from '@mui/icons-material';
import { FloorDeleteService, FloorfetchService } from '../../../services/LoginPageService';
import { FloorListToolbar } from './floor-list-toolbars';
import FloorModal from './FloorModalComponent';
import NotificationBar from '../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../context/UserAccessProvider';

export function FloorListResults({img}) {
  
  const dataColumns = [
    {
      field: 'floorName',
      headerName: 'Floor Name',
      width: 170,
      type: 'actions',
      getActions: (params) => {
        return [
          <LinkTo selectedRow={params.row} />
        ];
      }
    },
    {
      field: 'totalLabs',
      headerName: 'Total Labs',
      width: 230,
    },
    {
      field: 'totalAssets',
      headerName: 'Total Assets',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <EditData selectedRow={params.row}/>,
          <DeleteData selectedRow={params.row} />
        ];
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);
  const [editData, setEditData] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [isLoading, setGridLoading] = useState(true);
  const routeStateObject = useLocation();
  const { location_id, branch_id, facility_id, building_id } = routeStateObject.state;
  const [refreshData, setRefreshData] = useState(false);
  const moduleAccess = useUserAccess()('location');

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: ''
  });

  useEffect(() => {
    setGridLoading(true);
    FloorfetchService({
      location_id,
      branch_id,
      facility_id,
      building_id,
    }, handleSuccess, handleException);
  },[refreshData]);

  const LinkTo = (props) => {
    return (<Link
      to={`${props.selectedRow.floorName}`}
      state={{
        location_id,
        branch_id,
        facility_id,
        building_id,
        floor_id: props.selectedRow.id,
        floorMap: props.selectedRow.floorMap
      }}>
      {props.selectedRow.floorName}
    </Link>);
  };

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDataList(dataObject.data);
  };
  
  const handleException = (errorObject) => {
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

  const EditData = (props) => {
    return (
      moduleAccess.edit && 
      <Edit onClick={() => {
        setIsAddButton(false);
        setEditData(props.selectedRow);
        setOpen(true);
      }} />);
  };

  const DeleteData = (props) => {
    return moduleAccess.delete && <DeleteOutlined 
      onClick={()=> 
        FloorDeleteService(props.selectedRow, deletehandleSuccess, deletehandleException)} 
    />;
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: ''
    });
  };
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <FloorListToolbar 
        setOpen={setOpen}
        setIsAddButton={setIsAddButton}
        setEditData={setEditData}
        userAccess={moduleAccess}
      /> 
      <DataGrid
        rows={dataList}
        columns={dataColumns}
        pageSize={5}
        loading={isLoading}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        style={{maxHeight:80+'%'}}
      />
      <FloorModal
        isAddButton={isAddButton}
        editData={editData}
        open={open}
        setOpen={setOpen}
        locationId = {location_id}
        branchId = {branch_id}
        facilityId = {facility_id}
        buildingId = {building_id}
        setRefreshData={setRefreshData}
        src = {img}
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
