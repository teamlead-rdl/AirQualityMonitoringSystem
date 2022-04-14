import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { FetchLocationService, LocationDeleteService } from '../../../services/LoginPageService';
import { LocationListToolbar } from './location-list-toolbars';
import LocationModal from './LocationModalComponent';
import { Link } from 'react-router-dom';
import NotificationBar from '../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../context/UserAccessProvider';

export function LocationListResults({setLocationCoordinationList}) {

  
  const [open, setOpen] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);
  const [editState, setEditState] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [isLoading, setGridLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(false);
  const moduleAccess = useUserAccess()('location');
  
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: ''
  });
  
  const columns = [
    {
      field: 'stateName',
      headerName: 'Location Name',
      width: 270,
      type: 'actions',
      getActions: (params) => {
        return [
          <LinkTo selectedRow={params.row} />
        ];
      }
    },
    {
      field: 'totalBuildings',
      headerName: 'Total Branches',
      width: 150,
    },
    {
      field: 'totalAssets',
      headerName: 'Total Assets',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 150,
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
  useEffect(() => {
    setGridLoading(true);
    FetchLocationService(handleSuccess, handleException);
  }, [refreshData]);

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDataList(dataObject.data);
    const newArray = dataObject.data?dataObject.data.map((item) => {
      let coordinates = item.coordinates?item.coordinates.replaceAll('"', "").split(','): [];
      console.log(coordinates);

      return{
        'id': item.id,
        'name': item.stateName,
        'position': {
          'lat': parseFloat(coordinates[0]),
          'lng': parseFloat(coordinates[1])
        }
      }
    })
      :
      [];
    setLocationCoordinationList(newArray);
    console.log(newArray);
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
      to={`${props.selectedRow.stateName}`}
      state={{ location_id: props.selectedRow.id}}>
      {props.selectedRow.stateName}
    </Link>)
  }

  const EditData = (props) => {
    return (
      moduleAccess.edit && 
      <EditIcon onClick={() => {
        setIsAddButton(false);
        setEditState(props.selectedRow);
        setOpen(true);
      }} />)
  }

  const DeleteData = (props) => {
    return moduleAccess.delete && <DeleteIcon onClick={() => LocationDeleteService(props.selectedRow, deletehandleSuccess, deletehandleException)} />
  }

  const handleClose = () => {
    setNotification({
        status: false,
        type: '',
        message: ''
    });
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <LocationListToolbar
        setOpen={setOpen}
        setIsAddButton={setIsAddButton}
        setEditCustomer={setEditState}
        userAccess={moduleAccess}
      />
      <DataGrid
        rows={dataList}
        columns={columns}
        pageSize={5}
        loading={isLoading}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        style={{ maxHeight: 70 + '%' }}
      />
      <LocationModal
        isAddButton={isAddButton}
        locationData={editState}
        open={open}
        setOpen={setOpen}
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