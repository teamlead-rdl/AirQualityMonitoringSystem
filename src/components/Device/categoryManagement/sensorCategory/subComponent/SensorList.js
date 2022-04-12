import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { CategoryFetchService, CategoryDeleteService, SensorCategoryFetchService, SensorCategoryDeleteService } from '../../../../../services/LoginPageService';
import { SensorCategorytoolbar } from './SensorCategorytoolbar';
import SensorCategoryModal from './SensorCategoryModal';
import NotificationBar from '../../../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../../../context/UserAccessProvider';

export function SensorList() {
  const columns = [
    {
      field: 'sensorName',
      headerName: 'Sensor Category',
      width: 200
    },
    {
      field: 'sensorDescriptions',
      headerName: 'Description',
      width: 300,
    },       
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <EditData selectedRow={params.row}/>,<DeleteData selectedRow={params.row} />
        ];
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);
  const [editCategory, setEditCategory] = useState([]);
  const [CategoryList, setCategoryList] = useState([]);   
  const [isLoading, setGridLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(false);
  const moduleAccess = useUserAccess()('device');

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: ''
  });

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setCategoryList(dataObject.data);
  };

  const handleException = (errorObject) => {
    console.log(JSON.stringify(errorObject));
  }; 
    
  useEffect(() => {
    SensorCategoryFetchService(handleSuccess, handleException);
  }, [refreshData]);
    
  const EditData = (props) => {
    return ( moduleAccess.edit && 
        <EditIcon style={{ cursor: 'pointer' }}
          onClick={(event) => {
            event.stopPropagation();
            setIsAddButton(false);
            setEditCategory(props.selectedRow);
            setOpen(true);
          }} />);
  };
  
  const DeleteData = (props) => {
    return moduleAccess.delete && <DeleteIcon 
      style={{ cursor: 'pointer' }}
      onClick={()=>{
        SensorCategoryDeleteService( props.selectedRow, deletehandleSuccess, deletehandleException );          
      }
      }/>;
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
    <div style={{ height: 400, width: '100%', padding:0 }}>
      <SensorCategorytoolbar
        setIsAddButton ={setIsAddButton}
        setEditCategory ={setEditCategory}
        setOpen ={setOpen}
        userAccess={moduleAccess}
      />
      <DataGrid
        rows={CategoryList}
        columns={columns}
        pageSize={5}
        loading={isLoading}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
      <SensorCategoryModal
        isAddButton={isAddButton}
        categoryData={editCategory}
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
