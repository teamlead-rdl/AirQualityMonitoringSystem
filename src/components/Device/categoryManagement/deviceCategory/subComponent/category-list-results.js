import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CategoryModel from './CategoryModelComponent';
import { CategoryListToolbar } from './CategoryListToolbar';
import { CategoryFetchService, CategoryDeleteService } from '../../../../../services/LoginPageService';
import NotificationBar from '../../../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../../../context/UserAccessProvider';

export function CategoryListResults() {
  const columns = [
    {
      field: 'categoryName',
      headerName: 'Category Name',
      width: 200,
    },
    {
      field: 'categoryDescription',
      headerName: 'Category Description',
      width: 300,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => [
        <EditData selectedRow={params.row} />, <DeleteData selectedRow={params.row} />,
      ],
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
    message: '',
  });

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setCategoryList(dataObject.data);
  };

  const handleException = (errorObject) => {
  };

  useEffect(() => {
    CategoryFetchService(handleSuccess, handleException);
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

  function DeleteData(props) {
    return moduleAccess.delete && (
      <DeleteIcon
        style={{ cursor: 'pointer' }}
        onClick={() => {
          CategoryDeleteService(props.selectedRow, deletehandleSuccess, deletehandleException);
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
    }, 5000);
  };

  const deletehandleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
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
      <CategoryListToolbar
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
        checkboxSelection
        disableSelectionOnClick
      />
      <CategoryModel
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
