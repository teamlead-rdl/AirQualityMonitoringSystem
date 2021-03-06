import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import ConfigSetupModal from './ConfigSetupModalComponent';
import { ConfigSetupListToolbar } from './ConfigSetupListToolbar';
import { ConfigSetupFetchService, ConfigSetupDeleteService } from '../../../../services/LoginPageService';
import NotificationBar from '../../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../../context/UserAccessProvider';
import DeleteConfirmationDailog from '../../../../utils/confirmDeletion';

export function ConfigSetupListResults() {
  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      width: 80,
    },
    {
      field: 'accessPointName',
      headerName: 'Access Point Name',
      width: 170,
    },
    {
      field: 'ftpAccountName',
      headerName: 'FTP Account Name',
      width: 170,
    },
    {
      field: 'port',
      headerName: 'Port',
      width: 170,
    },
    {
      field: 'serverUrl',
      headerName: 'Server Url',
      width: 170,
    },
    {
      field: 'apn',
      headerName: 'APN',
      width: 170,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => [
        <EditData selectedRow={params.row} />,
        <DeleteData selectedRow={params.row} />,
      ],
    },
  ];

  const [open, setOpen] = useState(false);
  const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [isAddButton, setIsAddButton] = useState(true);
  const [editConfigSetup, setEditConfigSetup] = useState([]);
  const [configSetupList, setConfigSetupList] = useState([]);
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
    setConfigSetupList(dataObject?.data || []);
  };

  const handleException = (errorObject) => {
  };

  function DeleteData(props) {
    return moduleAccess.delete && (
      <DeleteIcon onClick={() => {
        setDeleteId(props.selectedRow.id);
        setDeleteDailogOpen(true);
      }}
      />
    );
  }

  useEffect(() => {
    ConfigSetupFetchService(handleSuccess, handleException);
  }, [refreshData]);

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

  function EditData(props) {
    return (moduleAccess.edit
      && (
        <EditIcon onClick={(event) => {
          event.stopPropagation();
          setIsAddButton(false);
          setEditConfigSetup(props.selectedRow);
          setOpen(true);
        }}
        />
      ));
  }

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <ConfigSetupListToolbar
        setIsAddButton={setIsAddButton}
        setEditConfigSetup={setEditConfigSetup}
        setOpen={setOpen}
        editConfigSetup={editConfigSetup}
        userAccess={moduleAccess}
      />

      <DataGrid
        rows={configSetupList}
        columns={columns}
        pageSize={5}
        loading={isLoading}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
      <ConfigSetupModal
        isAddButton={isAddButton}
        configSetupData={editConfigSetup}
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
      <DeleteConfirmationDailog
        open={deleteDailogOpen}
        setOpen={setDeleteDailogOpen}
        deleteId={deleteId}
        deleteService={ConfigSetupDeleteService}
        handleSuccess={deletehandleSuccess}
        handleException={deletehandleException}
      />
    </div>
  );
}
