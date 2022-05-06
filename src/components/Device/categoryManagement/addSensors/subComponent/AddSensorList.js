import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { SensorListFetchService, SensorDeleteService } from '../../../../../services/LoginPageService';
import { AddSensorCategoryToolbar } from './AddSensorCategoryToolbar';
import AddSensorModal from './AddSensorModal';
import NotificationBar from '../../../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../../../context/UserAccessProvider';
import DeleteConfirmationDailog from '../../../../../utils/confirmDeletion';
// import ConfigAlarm from './ConfigAlarm';

export function AddSensorList() {
  const columns = [
    {
      field: 'sensorName',
      headerName: 'Sensor Category',
      width: 200,
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
          <EditData selectedRow={params.row} />,
          // <SetAlarm selectedRow={params.row}/>,
          <DeleteData selectedRow={params.row} />,
        ];
      },
    },
  ];

  const [open, setOpen] = useState(false);
  // const [alertOpen, setAlertOpen] = useState(false);
  const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [isAddButton, setIsAddButton] = useState(true);
  const [editCategory, setEditCategory] = useState([]);
  const [CategoryList, setCategoryList] = useState([]);
  const [isLoading, setGridLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(false);
  const moduleAccess = useUserAccess()('device');

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setCategoryList(dataObject.data);
  };

  const handleException = () => {
  };

  useEffect(() => {
    SensorListFetchService(handleSuccess, handleException);
  }, [refreshData]);

  function EditData(props) {
    return (moduleAccess.edit
        && (
          <EditIcon
            style={{ cursor: 'pointer' }}
            onClick={(event) => {
              event.stopPropagation();
              setIsAddButton(false);
              setEditCategory(props.selectedRow);
              setOpen(true);
            }}
          />
        ));
  }

  // function SetAlarm(props) {
  //   return (moduleAccess.edit
  //       && (
  //         <NotificationsActive
  //           style={{ cursor: 'pointer' }}
  //           onClick={(event) => {
  //             event.stopPropagation();
  //             setEditCategory(props.selectedRow);
  //             setAlertOpen(true);
  //           }}
  //         />
  //       ));
  // }

  function DeleteData(props) {
    return moduleAccess.delete && (
      <DeleteIcon
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setDeleteId(props.selectedRow.id);
          setDeleteDailogOpen(true);
        }}
      />
    );
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
  return (
    <div style={{ height: 400, width: '100%', padding: 0 }}>
      <AddSensorCategoryToolbar
        setIsAddButton={setIsAddButton}
        setEditCategory={setEditCategory}
        setOpen={setOpen}
        userAccess={moduleAccess}
      />
      <DataGrid
        rows={CategoryList}
        columns={columns}
        pageSize={5}
        loading={isLoading}
        rowsPerPageOptions={[5]}
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
      {/* <ConfigAlarm
            open={alertOpen}
            setOpen={setAlertOpen}
            editData={editCategory}
          /> */}
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
      <DeleteConfirmationDailog
        open={deleteDailogOpen}
        setOpen={setDeleteDailogOpen}
        deleteId={deleteId}
        deleteService={SensorDeleteService}
        handleSuccess={deletehandleSuccess}
        handleException={deletehandleException}
      />
    </div>
  );
}
