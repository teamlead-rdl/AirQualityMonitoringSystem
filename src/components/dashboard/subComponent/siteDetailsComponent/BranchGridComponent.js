import { Breadcrumbs, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { FetchBranchService } from '../../../../services/LoginPageService';

function BranchGridComponent({
  locationDetails, setLocationDetails, setProgressState, setLocationCoordinationList, breadCrumbLabels, setBreadCrumbLabels,
}) {
  const [dataList, setDataList] = useState([]);
  const branchColumns = [
    {
      field: 'branchName',
      headerName: 'Branch Name',
      width: 270,
      type: 'actions',
      getActions: (params) => [
        <LinkTo selectedRow={params.row} />,
      ],
    },
    {
      field: 'totalFacilities',
      headerName: 'Total Facilities',
      width: 170,
    },
    {
      field: 'totalAssets',
      headerName: 'Total Assets',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    },
  ];
  useEffect(() => {
    FetchBranchService({
      location_id: locationDetails.location_id,
    }, handleSuccess, handleException);
  }, [locationDetails]);

  const handleSuccess = (dataObject) => {
    setDataList(dataObject.data);
    setProgressState(1);
    const newArray = dataObject.data ? dataObject.data.map((item) => {
      const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
      return {
        id: item.id,
        name: item.branchName,
        position: {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        },
      };
    })
      : [];
    setLocationCoordinationList(newArray);
  };

  /* eslint-disable-next-line */
  const handleException = (errorObject) => {
  };

  function LinkTo({ selectedRow }) {
    return (
      /* eslint-disable-next-line */
      <h3
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setLocationDetails((oldValue) => {
            return { ...oldValue, branch_id: selectedRow.id };
          });
          setBreadCrumbLabels((oldvalue) => {
            return { ...oldvalue, branchLabel: selectedRow.branchName };
          });
          setProgressState(2);
        }}
      >
        {selectedRow.branchName}
      </h3>
    );
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        { /* eslint-disable-next-line */}
        <h3 onClick={() => setProgressState(0)}>
          Location
        </h3>
        <Typography
          underline="hover"
          color="inherit"
        >
          {breadCrumbLabels.stateLabel}
        </Typography>
      </Breadcrumbs>
      <DataGrid
        rows={dataList}
        columns={branchColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ maxHeight: `${80}%` }}
      />
    </div>
  );
}

export default BranchGridComponent;
