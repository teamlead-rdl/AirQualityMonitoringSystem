import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, DeleteOutlined } from '@mui/icons-material';
import { LabDeleteService, LabfetchService } from '../../../services/LoginPageService';
import { LabListToolbar } from './lab-list-toolbars';
import LabModal from './LabModalComponent';
import { Link, useLocation } from 'react-router-dom';
import NotificationBar from '../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../context/UserAccessProvider';

export function LabListResults({img}) {

  const dataColumns = [
    {
      field: 'labDepName',
      headerName: 'Lab Name',
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
          <EditData selectedRow={params.row} />,
          <DeleteData selectedRow={params.row} />,
        ];
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);
  const [editData, setEditData] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [isLoading, setGridLoading] = useState(false);
  const routeStateObject = useLocation();
  const { location_id, branch_id, facility_id, building_id, floor_id } = routeStateObject.state;
  const [refreshData, setRefreshData] = useState(false);
  const moduleAccess = useUserAccess()('location');

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: ''
  });

  useEffect(() => {
    setGridLoading(true);
    LabfetchService({
      location_id,
      branch_id,
      facility_id,
      building_id,
      floor_id
    }, handleSuccess, handleException);
  }, [refreshData]);

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
      onClick={() => LabDeleteService(props.selectedRow, deletehandleSuccess, deletehandleException)}
    />;
  };
  const LinkTo = (props) => {
    return (<Link
      to={`${props.selectedRow.labDepName}`}
      state={{
        location_id,
        branch_id,
        facility_id,
        building_id,
        floor_id,
        lab_id: props.selectedRow.id,
        lab_map: props.selectedRow.labDepMap 
      }}>

      {props.selectedRow.labDepName}
    </Link>);
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
      <LabListToolbar
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
        style={{ maxHeight: 80 + '%' }}
      />
      <LabModal
        isAddButton={isAddButton}
        editData={editData}
        open={open}
        setOpen={setOpen}
        locationId = {location_id}
        branchId = {branch_id}
        facilityId = {facility_id}
        buildingId = {building_id}
        floorId = {floor_id}
        setRefreshData={setRefreshData}
        img = {img}
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
