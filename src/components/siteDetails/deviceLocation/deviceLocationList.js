import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
  DeleteDeviceLocationService, FetchCategoryService, FetchDeviceLocationService, FetchLocationService, LocationDeleteService,
} from '../../../services/LoginPageService';
import DeviceLocationModal from './DeviceLocationModalComponent';
import { DeviceLocationListToolbar } from './deviceLocation-list-toolbars';

export function DeviceLocationListResults() {
  const columns = [
    {
      field: 'assetTag',
      headerName: 'Asset Name',
      width: 250,
    },
    {
      field: 'deviceIcon',
      headerName: 'Device Type',
      width: 150,
    },
    {
      field: 'categoryName',
      headerName: 'Device category',
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

      getActions: (params) => [
        <EditData selectedRow={params.row} />,
        <DeleteData selectedRow={params.row} />,
      ],
    },
  ];

  const [open, setOpen] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);
  const [editState, setEditState] = useState([]);
  const [dataList, setDataList] = useState([]);
  // const [deviceList, setDeviceList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setGridLoading] = useState(true);

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDataList(dataObject.data);
  };

  const handleException = (errorObject) => {
  };

  const deletehandleSuccess = (dataObject) => {
  };

  const deletehandleException = (errorObject) => {
  };

  const categoryhandleSuccess = (dataObject) => {
    setCategoryList(dataObject.data);
  };

  const categoryhandleException = (errorObject) => {
  };
  useEffect(() => {
    FetchDeviceLocationService(handleSuccess, handleException);
    FetchCategoryService(categoryhandleSuccess, categoryhandleException);
  }, []);

  function EditData(props) {
    return (
      <EditIcon onClick={() => {
        setIsAddButton(false);
        setEditState(props.selectedRow);
        setOpen(true);
      }}
      />
    );
  }

  function DeleteData(props) {
    return (
      <DeleteIcon onClick={() => {
        DeleteDeviceLocationService(deletehandleSuccess, deletehandleException, props.selectedRow);
      }}
      />
    );
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DeviceLocationListToolbar
        setOpen={setOpen}
        setIsAddButton={setIsAddButton}
        setEditCustomer={setEditState}
      />
      <DataGrid
        rows={dataList}
        columns={columns}
        pageSize={5}
        loading={isLoading}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        style={{ maxHeight: `${70}%` }}
      />
      <DeviceLocationModal
        isAddButton={isAddButton}
        locationData={editState}
        open={open}
        setOpen={setOpen}
        categoryList={categoryList}
      />
    </div>
  );
}
