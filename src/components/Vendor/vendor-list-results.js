import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import VendorModel from './VendorModelComponent';
import { VendorListToolbar } from './VendorListToolbar';
import { FetchVendorService, VendorDeleteService } from '../../services/LoginPageService';
import NotificationBar from '../notification/ServiceNotificationBar';
import { useUserAccess } from '../../context/UserAccessProvider';

export function VendorListResults() {
  const columns = [
    {
      field: 'vendorName',
      headerName: 'Vendor Name',
      width: 170
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 290,
    },

    {
      field: 'address',
      headerName: 'Address',
      sortable: true,
      width: 190,
    },
    {
      field: 'contactPerson',
      headerName: 'Contact Person',
      sortable: true,
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
          <EditData selectedRow={params.row}/>,<DeleteData selectedRow={params.row} />
        ];
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);
  const [editVendor, setEditVendor] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [isLoading, setGridLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(false);
  const moduleAccess = useUserAccess()('vendor');
    
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: ''
  });

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setVendorList(dataObject.data);
  };
      
  const handleException = (errorObject) => {
    console.log(JSON.stringify(errorObject));
  };

  useEffect(() => {
    FetchVendorService(handleSuccess, handleException);
  }, [refreshData]);

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
        <EditIcon style={{ cursor: 'pointer' }}
          onClick={(event) => {
            event.stopPropagation();
            setIsAddButton(false);
            setEditVendor(props.selectedRow);
            setOpen(true);
          }} />);
  };
  
  const DeleteData = (props) => {
    return moduleAccess.delete && <DeleteIcon onClick={()=>{
      console.log(props.selectedRow.id);
      VendorDeleteService(props.selectedRow, deletehandleSuccess, deletehandleException);
    }}/>;
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
      <VendorListToolbar
        setIsAddButton ={setIsAddButton}
        setEditVendor ={setEditVendor}
        setOpen ={setOpen}
        userAccess={moduleAccess}
      />
      <DataGrid
        rows={vendorList}
        columns={columns}
        pageSize={5}
        loading={isLoading}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
      <VendorModel
        isAddButton={isAddButton}
        vendorData={editVendor}
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
