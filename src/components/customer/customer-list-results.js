import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CustomerModal from './CustomerModalComponent';
import { CustomerListToolbar } from './customer-list-toolbar';
import { CustomerDeleteService, FetchCustomerService } from './../../services/LoginPageService';
import NotificationBar from '../notification/ServiceNotificationBar';
import ConfirmPassword from '../../components/user/passwordConfirmComponent'
export function CustomerListResults() {
  const columns = [
    {
      field: 'customerName',
      headerName: 'Customer Name',
      width: 170,
    },
    {
      field: 'customerId',
      headerName: 'Company Code',
      width: 110
    },
    {
      field: 'email',
      headerName: 'Email Id',
      width: 230,
    },
    {
      field: 'phoneNo',
      headerName: 'Phone',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    },
    {
      field: 'address',
      headerName: 'Address',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    },
    {
      field: 'customerLogo',
      headerName: 'Company Logo',
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
      disableClickEventBubbling: true,
      getActions: (params) => {
        return [
          <EditData selectedRow={params.row}/>,<DeleteData selectedRow={params.row} />
        ];
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);
  const [editCustomer, setEditCustomer] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [isLoading, setGridLoading] = useState(true);
  const [id, setId] = useState('');
  const [password, setConfirmPassword] = useState('')
  const [btnReset, setBtnReset] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: ''
  });

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setCustomerList(dataObject.data);
  }
  
  const handleException = (errorObject) => {
    console.log(JSON.stringify(errorObject));
  }

  useEffect(() => {
    FetchCustomerService(handleSuccess, handleException)
  }, [refreshData]);

  const passwordSubmit = async (e) => {
    e.preventDefault();
    CustomerDeleteService({ password, id}, passwordValidationSuccess, passwordValidationException);
    setBtnReset(false);
  }

  const passwordValidationSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message
    });
    setRefreshData((oldvalue)=>{
        return !oldvalue;
    });
  }

  const passwordValidationException = (errorObject, errorMessage) => {
    console.log(JSON.stringify(errorObject));
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage
    });
  };

  const EditData = (props) => {
    return (
      <EditIcon style={{ cursor: "pointer" }}
        onClick={(event) => {
          event.stopPropagation();
          setIsAddButton(false);
          setEditCustomer(props.selectedRow);
          setOpen(true);
      }} />)
  }

  const DeleteData = (props) => {
    console.log(props.selectedRow);
    return <DeleteIcon onClick={()=>{
      setId(props.selectedRow.id);
      setBtnReset(true);
    }}
    style={{cursor: 'pointer'}}/>
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
      <CustomerListToolbar 
        setIsAddButton={setIsAddButton}
        setEditCustomer={setEditCustomer}
        setOpen={setOpen}
      />
      <DataGrid
        rows={customerList}
        columns={columns}
        pageSize={5}
        loading={isLoading}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
      <ConfirmPassword 
        open={btnReset}
        passwordSubmit={passwordSubmit} 
        setConfirmPassword={setConfirmPassword} 
        setBtnReset={setBtnReset}
      />
      <CustomerModal
        isAddButton={isAddButton}
        customerData={editCustomer}
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
