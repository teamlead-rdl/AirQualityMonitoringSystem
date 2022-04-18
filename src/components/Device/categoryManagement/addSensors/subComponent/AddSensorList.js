import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { CategoryFetchService, CategoryDeleteService, SensorCategoryFetchService, SensorCategoryDeleteService, SensorFetchService, SensorListFetchService, SensorDeleteService } from '../../../../../services/LoginPageService';
import { AddSensorCategoryToolbar } from './AddSensorCategoryToolbar';
import AddSensorModal from './AddSensorModal';
import NotificationBar from '../../../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../../../context/UserAccessProvider';
import { NotificationsActive } from '@mui/icons-material';
import ConfigAlarm from './ConfigAlarm';

export function AddSensorList() {
    const columns = [
      {
        field: 'sensorName',
        headerName: 'Sensor Category',
        width: 200
      },
      {
        field: 'sensorOutput',
        headerName: 'Sensor Output',
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
            <EditData selectedRow={params.row}/>,
            <SetAlarm selectedRow={params.row}/>,
            <DeleteData selectedRow={params.row} />
          ];
        },
      },
    ];

    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
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
    }

    const handleException = (errorObject) => {
        console.log(JSON.stringify(errorObject));
    } 
    
    useEffect(() => {
      SensorListFetchService(handleSuccess, handleException)
    }, [refreshData]);
    
    const EditData = (props) => {
      return (moduleAccess.edit && 
        <EditIcon style={{ cursor: "pointer" }}
          onClick={(event) => {
            event.stopPropagation();
            setIsAddButton(false);
            setEditCategory(props.selectedRow);
            setOpen(true);
        }} />)
    }

    const SetAlarm = (props) => {
      return (moduleAccess.edit && 
        <NotificationsActive style={{ cursor: "pointer" }}
          onClick={(event) => {
            event.stopPropagation();
            // setEditCategory(props.selectedRow);
            setAlertOpen(true);
        }} />)
    }
  
    const DeleteData = (props) => {
      return moduleAccess.delete && <DeleteIcon 
          style={{ cursor: "pointer" }}
          onClick={()=>{
            SensorDeleteService( props.selectedRow, deletehandleSuccess, deletehandleException );          
        }
      }/>
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

    const handleClose = () => {
      setNotification({
          status: false,
          type: '',
          message: ''
      });
    }
    return (
      <div style={{ height: 400, width: '100%', padding:0 }}>
        <AddSensorCategoryToolbar
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
          <AddSensorModal
            isAddButton={isAddButton}
            categoryData={editCategory}
            open={open}
            setOpen={setOpen}
            CategoryList={CategoryList}
            setRefreshData={setRefreshData}
          />
          <ConfigAlarm
            open={alertOpen}
          />
          <NotificationBar
            handleClose={handleClose}
            notificationContent={openNotification.message}
            openNotification={openNotification.status}
            type={openNotification.type} 
          />
      </div>    
    )
}
