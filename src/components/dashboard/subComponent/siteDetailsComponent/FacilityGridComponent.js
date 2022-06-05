import { Breadcrumbs, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { FetchFacilitiyService } from '../../../../services/LoginPageService';
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
function FacilityGridComponent({
  locationDetails, setLocationDetails, setProgressState, breadCrumbLabels, setBreadCrumbLabels, setLocationCoordinationList,
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

  const handleException = (errorObject) => {
  };

  function LinkTo({ selectedRow }) {
    return (
      <h3 onClick={() => {
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
    <div style={{ height: '100%', width: '100%' }}>
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
        style={{ maxHeight: `${93}%` }}
      />
    </div>
  );
}

export default FacilityGridComponent;
