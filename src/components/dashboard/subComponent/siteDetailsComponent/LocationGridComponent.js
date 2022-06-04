import { Breadcrumbs } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { FetchLocationService } from '../../../../services/LoginPageService';
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
function LocationGridComponent({
  locationDetails, setLocationDetails, setProgressState, setBreadCrumbLabels,
}) {
  const [dataList, setDataList] = useState([]);

  const columns = [
    {
      field: 'stateName',
      headerName: 'Location Name',
      width: 270,
      type: 'actions',
      getActions: (params) => [
        <LinkTo selectedRow={params.row} />,
      ],
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
  ];
  useEffect(() => {
    FetchLocationService(handleSuccess, handleException);
  }, []);

  function LinkTo({ selectedRow }) {
    return (
      <h3 onClick={() => {
        setLocationDetails((oldValue) => {
          return { ...oldValue, location_id: selectedRow.id };
        });

        setBreadCrumbLabels((oldvalue) => {
          return { ...oldvalue, stateLabel: selectedRow.stateName };
        });

        setProgressState(1);
      }}
      >
        {selectedRow.stateName}
      </h3>
    );
  }
  const handleSuccess = (dataObject) => {
    setDataList(dataObject.data);
  };

  const handleException = (errorObject) => {
  };
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <h3>
          Location
        </h3>
      </Breadcrumbs>
      <DataGrid
        rows={dataList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ maxHeight: `${93}%` }}
      />
    </div>
  );
}

export default LocationGridComponent;
