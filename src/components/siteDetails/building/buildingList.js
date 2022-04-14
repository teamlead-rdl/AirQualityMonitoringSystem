import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { PlayArrow, Edit, DeleteOutlined } from '@mui/icons-material';
import { BuildingDeleteService, BuildingFetchService } from '../../../services/LoginPageService';
import { BuildingListToolbar } from './building-list-toolbars';
import BuildingModal from './BuildingModalComponent';
import { Link, useLocation } from 'react-router-dom';
import NotificationBar from '../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../context/UserAccessProvider';
import { Breadcrumbs, Typography } from '@mui/material';

export function BuildingListResults(props) {
  
  const dataColumns = [
    {
      field: 'buildingName',
      headerName: 'Building Name',
      width: 170,
      type: 'actions',
      getActions: (params) => {
        return [
          <LinkTo selectedRow={params.row} />
        ];
      }
    },

    {
      field: 'buildingTotalFloors',
      headerName: 'Total Floors',
      width: 230,
    },
    {
      field: 'buildingTag',
      headerName: 'Building Tag',
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
  const [isLoading, setGridLoading] = useState(false);
  const routeStateObject = useLocation();
  const { location_id, branch_id, facility_id } = routeStateObject.state;
  const [refreshData, setRefreshData] = useState(false);
  const moduleAccess = useUserAccess()('location');

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: ''
  });

  useEffect(() => {
    setGridLoading(true);
    BuildingFetchService({
      location_id,
      branch_id,
      facility_id,
    }, handleSuccess, handleException);
  },[refreshData]);

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDataList(dataObject.data);
    const newArray = dataObject.data?dataObject.data.map((item) => {
      let coordinates = item.coordinates?item.coordinates.replaceAll('"', "").split(','): [];

      return{
        'id': item.id,
        'name': item.facilityName,
        'position': {
          'lat': parseFloat(coordinates[0]),
          'lng': parseFloat(coordinates[1])
        }
      }
    })
      :
      [];
      props.setLocationCoordinationList(newArray);
  }
  
  const handleException = (errorObject) => {
  }

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
  }
  
  const deletehandleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage
  });
  }

  const LinkTo = (props) => {
    return (<Link
      to={`${props.selectedRow.buildingName}`}
      state={{
        location_id,
        branch_id,
        facility_id,
        building_id: props.selectedRow.id,
        buildingImg: props.selectedRow.buildingImg
      }}>
      {props.selectedRow.buildingName}
    </Link>)
  }

  const EditData = (props) => {
    return (
      moduleAccess.edit && 
      <Edit onClick={() => {
        setIsAddButton(false);
        setEditData(props.selectedRow);
        setOpen(true);
      }} />)
  }

  const DeleteData = (props) => {
    return moduleAccess.delete && <DeleteOutlined 
    onClick={()=> 
      BuildingDeleteService(props.selectedRow, deletehandleSuccess, deletehandleException)}
    />
  }

  const handleClose = () => {
    setNotification({
        status: false,
        type: '',
        message: ''
    });
  }
  var pathList = routeStateObject.pathname.split('/').filter(x => x);
  var pathname = pathList.map((data, index)=>{
    let path = data.replace("%20", " ");
    return(path)
  })

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <Link underline="hover" color="inherit" to="/Location">
          Location
        </Link>
        <Link
          underline="hover"
          color="inherit"
          to={"/Location/"+pathname[1]}
          state={{
            location_id
          }}
          >
          {pathname[1]}
        </Link>
        <Link
          underline="hover"
          color="inherit"
          to={"/Location/"+pathname[1]+"/"+pathname[2]}
          state={{
            location_id,
            branch_id
          }}
          >
          {pathname[2]}
        </Link>
        <Typography
          underline="hover"
          color="inherit"
          >
          {pathname[3]}
        </Typography>
      </Breadcrumbs>
      <BuildingListToolbar 
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
       
       <BuildingModal
          isAddButton={isAddButton}
          editData={editData}
          open={open}
          setOpen={setOpen}
          locationId = {location_id}
          branchId = {branch_id}
          facilityId = {facility_id}
          setRefreshData={setRefreshData}
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
