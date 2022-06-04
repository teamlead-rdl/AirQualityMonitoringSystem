import { Breadcrumbs, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { FetchFacilitiyService } from '../../../../services/LoginPageService';

function FacilityGridComponent({
  locationDetails, setLocationDetails, setProgressState, setLocationCoordinationList, breadCrumbLabels, setBreadCrumbLabels,
}) {
  const facilityColumns = [
    {
      field: 'facilityName',
      headerName: 'Facility Name',
      width: 170,
      type: 'actions',
      getActions: (params) => [
        <LinkTo selectedRow={params.row} />,
      ],
    },
    {
      field: 'latitude',
      headerName: 'Latitude',
      width: 170,
    },
    {
      field: 'longitude',
      headerName: 'Longitude',
      width: 170,
    },
    {
      field: 'totalBuildings',
      headerName: 'Total buildings',
      width: 230,
    },
  ];

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    FetchFacilitiyService({
      location_id: locationDetails.location_id,
      branch_id: locationDetails.branch_id,
    }, handleSuccess, handleException);
  }, [locationDetails]);

  const handleSuccess = (dataObject) => {
    setDataList(dataObject.data);
    const newArray = dataObject.data ? dataObject.data.map((item) => {
      const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
      return {
        id: item.id,
        name: item.facilityName,
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
            return { ...oldValue, facility_id: selectedRow.id };
          });
          setBreadCrumbLabels((oldvalue) => {
            return { ...oldvalue, facilityLabel: selectedRow.facilityName };
          });
          setProgressState(3);
        }}
      >
        {selectedRow.facilityName}
      </h3>
    );
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <h3>
          Location
        </h3>
        <h3>
          {breadCrumbLabels.stateLabel}
        </h3>
        <Typography
          underline="hover"
          color="inherit"
        >
          {breadCrumbLabels.branchLabel}
        </Typography>
      </Breadcrumbs>
      <DataGrid
        rows={dataList}
        columns={facilityColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ maxHeight: `${80}%` }}
      />
    </div>
  );
}

export default FacilityGridComponent;
